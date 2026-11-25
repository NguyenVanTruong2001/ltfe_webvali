import {useEffect, useState} from "react";
import {Link, useNavigate, useSearchParams} from "react-router";
import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {cancelOrderAsync, selectOrderByCode, selectOrdersLoading} from "../../store/ordersSlice.ts";
import {ordersApi} from "../../services/ordersApi.ts";
import {formatPrice} from "../../lib/productList/format.ts";
import type {Order, OrderStatus, PaymentMethod, ShippingMethod} from "../../types/Order.ts";

const STATUS_LABEL: Record<OrderStatus, string> = {
    pending: "Chờ xác nhận",
    shipping: "Đang vận chuyển",
    delivered: "Đã giao",
    cancelled: "Đã hủy",
};

const PAYMENT_LABEL: Record<PaymentMethod, string> = {
    cod: "Thanh toán khi nhận hàng (COD)",
    bank: "Chuyển khoản ngân hàng",
    card: "Thẻ ATM, Visa hoặc Mastercard",
    wallet: "Ví điện tử",
};

const SHIPPING_LABEL: Record<ShippingMethod, string> = {
    standard: "Giao tiêu chuẩn (2 - 4 ngày)",
    express: "Giao nhanh (1 - 2 ngày)",
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

function getStepIndex(status: OrderStatus): number {
    return PROGRESS_STEPS.findIndex((s) => s.key === status);
}

export default function OrderDetailPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const code = searchParams.get("code")?.trim() ?? "";
    const orderFromStore = useAppSelector((state) => selectOrderByCode(state, code));
    const isStoreLoading = useAppSelector(selectOrdersLoading);

    const [fetchedOrder, setFetchedOrder] = useState<Order | null>(null);
    const [loadingDirect, setLoadingDirect] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const [cancelError, setCancelError] = useState<string | null>(null);

    const order = orderFromStore ?? fetchedOrder;

    useEffect(() => {
        if (!code || orderFromStore) return;
        let cancelled = false;
        setLoadingDirect(true);
        ordersApi
            .fetchOrderByCode(code)
            .then((res: Order) => {
                if (!cancelled) setFetchedOrder(res);
            })
            .catch(() => {
                if (!cancelled) setFetchedOrder(null);
            })
            .finally(() => {
                if (!cancelled) setLoadingDirect(false);
            });
        return () => {
            cancelled = true;
        };
    }, [code, orderFromStore]);

    async function handleCancelOrder() {
        if (!order || order.status !== "pending" || isCancelling) return;
        if (!window.confirm(`Bạn có chắc muốn hủy đơn hàng ${order.code}?`)) return;

        setIsCancelling(true);
        setCancelError(null);
        try {
            const updated = await dispatch(cancelOrderAsync(order.code)).unwrap();
            setFetchedOrder(updated);
        } catch (err) {
            setCancelError(err instanceof Error ? err.message : "Không thể hủy đơn hàng.");
        } finally {
            setIsCancelling(false);
        }
    }

    const isLoading = isStoreLoading || loadingDirect;
    const currentStepIdx = order ? getStepIndex(order.status) : -1;

    const shippingMethod: ShippingMethod = order?.shippingMethod ?? "standard";
    const paymentMethod: PaymentMethod = order?.paymentMethod ?? "cod";
    const calculatedSubtotal =
        order?.subtotal ??
        order?.items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0) ??
        0;
    const discountAmount = order?.discount ?? 0;
    const shippingFeeAmount = order?.shippingFee ?? 0;
    const totalAmount = order?.total ?? Math.max(0, calculatedSubtotal - discountAmount + shippingFeeAmount);

    return (
        <>
            <PageHeader />
            <main id="noiDung">
                <div className="container">
                    <nav className="breadcrumb" aria-label="Đường dẫn">
                        <ol>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li><Link to="/orders">Lịch sử đơn hàng</Link></li>
                            <li aria-current="page">Chi tiết đơn hàng</li>
                        </ol>
                    </nav>

                    {isLoading ? (
                        <p className="emptyTitle" style={{padding: "3rem 0"}}>Đang tải thông tin đơn hàng...</p>
                    ) : !order ? (
                        <p className="detailMissing">
                            Không tìm thấy đơn hàng {code ? <strong>{code}</strong> : "này"}.
                            <br />
                            <Link to="/orders" className="btn btnPrimary" style={{marginTop: "1rem"}}>
                                Về lịch sử đơn hàng
                            </Link>
                        </p>
                    ) : (
                        <div className="detailBody">
                            <div className="checkoutHead">
                                <div>
                                    <div className="detailTitleRow">
                                        <h1 className="checkoutTitle">Đơn hàng {order.code}</h1>
                                        <span className={`statusBadge is-${order.status}`}>
                                            {STATUS_LABEL[order.status]}
                                        </span>
                                    </div>
                                    <p className="trackMeta">Đặt ngày {formatDateTime(order.placedAt)}</p>
                                </div>
                            </div>

                            {order.status === "cancelled" && (
                                <p className="cancelNote" role="status">
                                    Đơn hàng này đã bị hủy. Nếu cần hỗ trợ đặt lại, vui lòng liên hệ hotline 0900 000 000.
                                </p>
                            )}

                            {cancelError && (
                                <p className="cancelNote" role="alert" style={{color: "#b91c1c"}}>
                                    {cancelError}
                                </p>
                            )}

                            {order.status !== "cancelled" && (
                                <ol className="progress" aria-label="Tiến trình đơn hàng">
                                    {PROGRESS_STEPS.map((step, idx) => {
                                        const isDone = idx < currentStepIdx || order.status === "delivered";
                                        const isCurrent = idx === currentStepIdx && order.status !== "delivered";
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
                                <div className="successMain">
                                    <section className="formSection" aria-labelledby="itemsTitle">
                                        <h2 id="itemsTitle" className="formTitle">Sản phẩm</h2>
                                        <ul className="summaryItems detailItems">
                                            {order.items.map((item, idx) => {
                                                const variant = [item.color, item.size ? `Size ${item.size}` : ""]
                                                    .filter(Boolean)
                                                    .join(" · ");
                                                const lineAmount = (item.price ?? 0) * item.quantity;

                                                return (
                                                    <li key={`${item.productId}-${idx}`} className="summaryItem">
                                                        <span className="summaryThumb">
                                                            {item.img?.startsWith("#") ? (
                                                                <svg className="summaryImage" viewBox="0 0 200 240" aria-hidden="true">
                                                                    <use
                                                                        href={item.img}
                                                                        style={{["--bodyColor" as string]: item.colorHex ?? "#B9C3CD"}}
                                                                    />
                                                                </svg>
                                                            ) : item.img ? (
                                                                <img src={item.img} alt={item.name ?? "Sản phẩm"} className="summaryImage" />
                                                            ) : null}
                                                        </span>
                                                        <span>
                                                            <strong className="summaryName">
                                                                <Link to={`/products/${item.productId}`} className="textLink">
                                                                    {item.name ?? `Sản phẩm #${item.productId}`}
                                                                </Link>
                                                            </strong>
                                                            <span className="summaryVariant">
                                                                {[variant, `số lượng ${item.quantity}`].filter(Boolean).join(", ")}
                                                            </span>
                                                        </span>
                                                        <span className="summaryPrice">{formatPrice(lineAmount)}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </section>

                                    <section className="formSection" aria-labelledby="infoTitle">
                                        <h2 id="infoTitle" className="formTitle">Thông tin giao hàng</h2>
                                        <dl className="infoGrid">
                                            <div>
                                                <dt>Người nhận</dt>
                                                <dd>{order.customer?.fullName ?? "Khách hàng Valigo"}</dd>
                                            </div>
                                            <div>
                                                <dt>Số điện thoại</dt>
                                                <dd>{order.customer?.phone ?? "—"}</dd>
                                            </div>
                                            <div>
                                                <dt>Email</dt>
                                                <dd>{order.customer?.email ?? "—"}</dd>
                                            </div>
                                            <div>
                                                <dt>Phương thức vận chuyển</dt>
                                                <dd>{SHIPPING_LABEL[shippingMethod]}</dd>
                                            </div>
                                            <div className="span2">
                                                <dt>Địa chỉ nhận hàng</dt>
                                                <dd>
                                                    {order.customer
                                                        ? [
                                                            order.customer.address,
                                                            order.customer.ward,
                                                            order.customer.district,
                                                            order.customer.province,
                                                        ]
                                                            .filter(Boolean)
                                                            .join(", ")
                                                        : "—"}
                                                </dd>
                                            </div>
                                            {order.customer?.note && (
                                                <div className="span2">
                                                    <dt>Ghi chú</dt>
                                                    <dd>{order.customer.note}</dd>
                                                </div>
                                            )}
                                        </dl>
                                    </section>

                                    <section aria-labelledby="historyTitle">
                                        <h2 id="historyTitle" className="formTitle">Lịch sử đơn hàng</h2>
                                        <ol className="timeline">
                                            {order.status === "delivered" && (
                                                <li className="timelineItem isDone">
                                                    <strong>Giao hàng thành công</strong>
                                                    <span>Đơn hàng đã được giao đến người nhận</span>
                                                </li>
                                            )}
                                            {(order.status === "shipping" || order.status === "delivered") && (
                                                <li className="timelineItem isDone">
                                                    <strong>Đang vận chuyển</strong>
                                                    <span>Đơn vị vận chuyển đã tiếp nhận kiện hàng</span>
                                                </li>
                                            )}
                                            {order.status === "cancelled" && (
                                                <li className="timelineItem">
                                                    <strong>Đơn hàng đã hủy</strong>
                                                    <span>Yêu cầu hủy đơn đã được ghi nhận</span>
                                                </li>
                                            )}
                                            <li className="timelineItem isDone">
                                                <strong>Đã tiếp nhận đơn hàng</strong>
                                                <span>{formatDateTime(order.placedAt)}</span>
                                            </li>
                                        </ol>
                                    </section>
                                </div>

                                <aside className="orderSummary" aria-labelledby="totalTitle">
                                    <div className="summaryHead">
                                        <h2 id="totalTitle" className="summaryTitle">Thanh toán</h2>
                                    </div>
                                    <dl className="summaryRows">
                                        <div className="summaryRow">
                                            <dt>Hình thức</dt>
                                            <dd>{PAYMENT_LABEL[paymentMethod]}</dd>
                                        </div>
                                        <div className="summaryRow">
                                            <dt>Tạm tính</dt>
                                            <dd>{formatPrice(calculatedSubtotal)}</dd>
                                        </div>
                                        {discountAmount > 0 && (
                                            <div className="summaryRow isDiscount">
                                                <dt>Giảm giá {order.voucherCode ? `(${order.voucherCode})` : ""}</dt>
                                                <dd>-{formatPrice(discountAmount)}</dd>
                                            </div>
                                        )}
                                        <div className="summaryRow">
                                            <dt>Phí vận chuyển</dt>
                                            <dd>{shippingFeeAmount === 0 ? "Miễn phí" : formatPrice(shippingFeeAmount)}</dd>
                                        </div>
                                    </dl>
                                    <p className="summaryTotal">
                                        <span>Tổng cộng</span>
                                        <strong>{formatPrice(totalAmount)}</strong>
                                    </p>

                                    <div className="detailActions">
                                        {order.status === "pending" && (
                                            <button
                                                type="button"
                                                className="btn btnGhost"
                                                disabled={isCancelling}
                                                onClick={handleCancelOrder}
                                            >
                                                {isCancelling ? "Đang hủy..." : "Hủy đơn hàng"}
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            className="btn btnPrimary"
                                            onClick={() => navigate("/products")}
                                        >
                                            Mua lại
                                        </button>
                                        <Link to="/orders" className="btn btnGhost">Quay lại danh sách</Link>
                                    </div>

                                    <ul className="summaryPerks">
                                        <li>
                                            <svg className="icon iconSm" aria-hidden="true">
                                                <use href="#iHeadset" />
                                            </svg>
                                            Cần hỗ trợ? Gọi hotline 0900 000 000
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <PageFooter />
        </>
    );
}