import {useEffect, useState} from "react";
import type {SyntheticEvent} from "react";
import {Link, useSearchParams} from "react-router";
import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import {ordersApi} from "../../services/ordersApi.ts";
import {formatPrice} from "../../lib/productList/format.ts";
import type {Order, OrderStatus, PaymentMethod, ShippingMethod} from "../../types/Order.ts";

const STATUS_LABEL: Record<OrderStatus, string> = {
    pending: "Chờ xác nhận",
    shipping: "Đang vận chuyển",
    delivered: "Đã giao",
    cancelled: "Đã hủy",
};

const PAYMENT_SHORT: Record<PaymentMethod, string> = {
    cod: "COD",
    bank: "Chuyển khoản",
    card: "Thẻ trực tuyến",
    wallet: "Ví điện tử",
};

const SHIPPING_SHORT: Record<ShippingMethod, string> = {
    standard: "Giao tiêu chuẩn",
    express: "Giao nhanh",
};

const PROGRESS_STEPS: {key: string; label: string}[] = [
    {key: "pending", label: "Đã nhận đơn"},
    {key: "shipping", label: "Đang vận chuyển"},
    {key: "delivered", label: "Đã giao"},
];

function formatDateTime(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy} lúc ${hh}:${min}`;
}

function estimateDelivery(iso: string, shippingMethod: ShippingMethod): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    d.setDate(d.getDate() + (shippingMethod === "express" ? 2 : 4));
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
}

export default function OrderTrackingPage() {
    const [searchParams] = useSearchParams();
    const initialCode = searchParams.get("code")?.trim() ?? "";

    const [orderCode, setOrderCode] = useState(initialCode);
    const [trackPhone, setTrackPhone] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [statusMsg, setStatusMsg] = useState<string | null>(null);
    const [foundOrder, setFoundOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (!initialCode) return;
        setOrderCode(initialCode);
    }, [initialCode]);

    async function handleTrack(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const cleanCode = orderCode.trim();
        const cleanPhone = trackPhone.trim().replace(/\s+/g, "");

        if (!cleanCode || !cleanPhone) {
            setStatusMsg("Vui lòng nhập đầy đủ mã đơn hàng và số điện thoại đặt hàng.");
            setFoundOrder(null);
            return;
        }

        setIsSearching(true);
        setStatusMsg(null);
        setFoundOrder(null);

        try {
            const order = await ordersApi.fetchOrderByCode(cleanCode);
            const savedPhone = (order.customer?.phone ?? "").replace(/\s+/g, "");

            if (savedPhone && savedPhone !== cleanPhone) {
                setStatusMsg("Số điện thoại không khớp với mã đơn hàng này. Vui lòng kiểm tra lại.");
                return;
            }

            setFoundOrder(order);
        } catch (err) {
            setStatusMsg(
                err instanceof Error
                    ? err.message
                    : "Không tìm thấy thông tin đơn hàng. Vui lòng kiểm tra lại mã đơn."
            );
        } finally {
            setIsSearching(false);
        }
    }

    const currentStepIdx = foundOrder
        ? PROGRESS_STEPS.findIndex((s) => s.key === foundOrder.status)
        : -1;

    const shippingMethod: ShippingMethod = foundOrder?.shippingMethod ?? "standard";
    const paymentMethod: PaymentMethod = foundOrder?.paymentMethod ?? "cod";
    const totalAmount =
        foundOrder?.total ??
        foundOrder?.items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0) ??
        0;

    return (
        <>
            <PageHeader />
            <main id="noiDung">
                <div className="container">
                    <nav className="breadcrumb" aria-label="Đường dẫn">
                        <ol>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li aria-current="page">Kiểm tra đơn hàng</li>
                        </ol>
                    </nav>

                    <div className="checkoutHead">
                        <h1 className="checkoutTitle">Kiểm tra đơn hàng</h1>
                        <p className="trackIntro">
                            Nhập mã đơn hàng trong email xác nhận và số điện thoại đặt hàng.
                        </p>
                    </div>

                    <form className="trackForm" id="trackForm" onSubmit={handleTrack} noValidate>
                        <div className="formField">
                            <label htmlFor="orderCode">Mã đơn hàng</label>
                            <input
                                id="orderCode"
                                name="orderCode"
                                type="text"
                                autoComplete="off"
                                required
                                placeholder="VLG-241103-0827"
                                value={orderCode}
                                onChange={(e) => setOrderCode(e.target.value)}
                            />
                        </div>
                        <div className="formField">
                            <label htmlFor="trackPhone">Số điện thoại</label>
                            <input
                                id="trackPhone"
                                name="trackPhone"
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel"
                                required
                                placeholder="0900000000"
                                value={trackPhone}
                                onChange={(e) => setTrackPhone(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btnPrimary" disabled={isSearching}>
                            {isSearching ? "Đang tra cứu..." : "Tra cứu"}
                        </button>

                        {statusMsg && (
                            <p id="trackStatus" className="trackStatus" role="status" aria-live="polite">
                                {statusMsg}
                            </p>
                        )}

                        <p className="trackAlt">
                            Đã có tài khoản?{" "}
                            <Link to="/orders" className="textLink">Xem lịch sử đơn hàng</Link>
                        </p>
                    </form>

                    {foundOrder && (
                        <section className="trackResult" id="trackResult" aria-labelledby="resultTitle">
                            <div className="trackResultHead">
                                <div>
                                    <h2 id="resultTitle" className="formTitle">Đơn hàng {foundOrder.code}</h2>
                                    <p className="trackMeta">Đặt ngày {formatDateTime(foundOrder.placedAt)}</p>
                                </div>
                                <span className={`statusBadge is-${foundOrder.status}`}>
                                    {STATUS_LABEL[foundOrder.status]}
                                </span>
                            </div>

                            {foundOrder.status !== "cancelled" && (
                                <ol className="progress" aria-label="Tiến trình đơn hàng">
                                    {PROGRESS_STEPS.map((step, idx) => {
                                        const isDone = idx < currentStepIdx || foundOrder.status === "delivered";
                                        const isCurrent = idx === currentStepIdx && foundOrder.status !== "delivered";
                                        return (
                                            <li
                                                key={step.key}
                                                className={`progressStep${isDone ? " isDone" : ""}${isCurrent ? " isCurrent" : ""}`}
                                                aria-current={isCurrent ? "step" : undefined}
                                            >
                                                {step.label}
                                            </li>
                                        );
                                    })}
                                </ol>
                            )}

                            <div className="checkoutLayout">
                                <div>
                                    <h3 className="trackSubTitle">Lịch sử vận chuyển</h3>
                                    <ol className="timeline">
                                        {foundOrder.status === "delivered" && (
                                            <li className="timelineItem isDone">
                                                <strong>Giao hàng thành công</strong>
                                                <span>Đơn hàng đã giao thành công đến địa chỉ người nhận</span>
                                            </li>
                                        )}
                                        {(foundOrder.status === "shipping" || foundOrder.status === "delivered") && (
                                            <li className="timelineItem isDone">
                                                <strong>Đang giao đến bạn</strong>
                                                <span>
                                                    Bưu cục{" "}
                                                    {foundOrder.customer?.district || foundOrder.customer?.province || "giao nhận"}
                                                </span>
                                            </li>
                                        )}
                                        {foundOrder.status === "cancelled" && (
                                            <li className="timelineItem">
                                                <strong>Đơn hàng đã hủy</strong>
                                                <span>Đơn hàng đã được hủy theo yêu cầu</span>
                                            </li>
                                        )}
                                        <li className="timelineItem isDone">
                                            <strong>Đã tiếp nhận đơn hàng</strong>
                                            <span>{formatDateTime(foundOrder.placedAt)}</span>
                                        </li>
                                    </ol>
                                </div>

                                <aside className="orderSummary" aria-labelledby="trackSummaryTitle">
                                    <div className="summaryHead">
                                        <h3 id="trackSummaryTitle" className="summaryTitle">Chi tiết đơn</h3>
                                        <Link
                                            to={`/order-detail?code=${encodeURIComponent(foundOrder.code)}`}
                                            className="textLink"
                                        >
                                            Xem chi tiết
                                        </Link>
                                    </div>
                                    <dl className="summaryRows">
                                        <div className="summaryRow">
                                            <dt>Người nhận</dt>
                                            <dd>{foundOrder.customer?.fullName ?? "Khách hàng Valigo"}</dd>
                                        </div>
                                        <div className="summaryRow">
                                            <dt>Vận chuyển</dt>
                                            <dd>{SHIPPING_SHORT[shippingMethod]}</dd>
                                        </div>
                                        <div className="summaryRow">
                                            <dt>Thanh toán</dt>
                                            <dd>{PAYMENT_SHORT[paymentMethod]}</dd>
                                        </div>
                                        <div className="summaryRow">
                                            <dt>Dự kiến giao</dt>
                                            <dd>
                                                {foundOrder.status === "cancelled"
                                                    ? "Đã hủy"
                                                    : estimateDelivery(foundOrder.placedAt, shippingMethod)}
                                            </dd>
                                        </div>
                                    </dl>
                                    <p className="summaryTotal">
                                        <span>
                                            {paymentMethod === "cod" ? "Cần thanh toán" : "Tổng cộng"}
                                        </span>
                                        <strong>{formatPrice(totalAmount)}</strong>
                                    </p>
                                    <ul className="summaryPerks">
                                        <li>
                                            <svg className="icon iconSm" aria-hidden="true">
                                                <use href="#iHeadset" />
                                            </svg>
                                            Cần hỗ trợ? Gọi hotline 1900 0000
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                        </section>
                    )}
                </div>
            </main>
            <PageFooter />
        </>
    );
}