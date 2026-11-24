import {Link, useSearchParams} from "react-router";
import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import {useAppSelector} from "../../store/hooks.ts";
import {selectOrders} from "../../store/ordersSlice.ts";
import {selectProducts} from "../../store/productsSlice.ts";
import {formatPrice} from "../../lib/productList/format.ts";
import type {PaymentMethod, ShippingMethod} from "../../types/Order.ts";

const SHIPPING_LABELS: Record<ShippingMethod, string> = {
    standard: "Giao tiêu chuẩn, nhận hàng sau 2 đến 4 ngày",
    express: "Giao nhanh, nhận hàng sau 1 đến 2 ngày",
};

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
    cod: "Thanh toán khi nhận hàng (COD)",
    bank: "Chuyển khoản ngân hàng",
    card: "Thẻ ATM, Visa hoặc Mastercard",
    wallet: "Ví điện tử",
};

function formatOrderTime(isoString: string): string {
    try {
        const d = new Date(isoString);
        const hh = String(d.getHours()).padStart(2, "0");
        const mm = String(d.getMinutes()).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const mo = String(d.getMonth() + 1).padStart(2, "0");
        return `${dd}/${mo}/${d.getFullYear()}, ${hh}:${mm}`;
    } catch {
        return "Hôm nay";
    }
}

export default function OrderSuccessPage() {
    const [searchParams] = useSearchParams();
    const codeParam = searchParams.get("code");
    const orders = useAppSelector(selectOrders);
    const products = useAppSelector(selectProducts);

    const order = orders.find((o) => o.code === codeParam) ?? orders[0];

    if (!order) {
        return (
            <>
                <PageHeader />
                <main id="noiDung">
                    <div className="container" style={{textAlign: "center", padding: "3rem 1rem"}}>
                        <h1 className="checkoutTitle">Không tìm thấy thông tin đơn hàng</h1>
                        <p style={{margin: "1rem 0 1.5rem"}}>Đơn hàng không tồn tại hoặc chưa được tạo.</p>
                        <Link to="/" className="btn btnPrimary">Về trang chủ</Link>
                    </div>
                </main>
                <PageFooter />
            </>
        );
    }

    const fullAddress = order.customer
        ? [order.customer.address, order.customer.ward, order.customer.district, order.customer.province]
            .filter(Boolean)
            .join(", ")
        : "Địa chỉ đã lưu trong tài khoản";

    const computedSubtotal =
        order.subtotal ??
        order.items.reduce((sum, item) => {
            const p = products.find((prod) => prod.id === item.productId);
            return sum + (item.price ?? p?.price ?? 0) * item.quantity;
        }, 0);

    const computedDiscount = order.discount ?? 0;
    const computedShipping = order.shippingFee ?? 0;
    const computedTotal = order.total ?? Math.max(0, computedSubtotal - computedDiscount + computedShipping);

    return (
        <>
            <PageHeader />
            <main id="noiDung">
                <div className="container">
                    <nav className="breadcrumb" aria-label="Đường dẫn">
                        <ol>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li><Link to="/checkout">Thanh toán</Link></li>
                            <li aria-current="page">Đặt hàng thành công</li>
                        </ol>
                    </nav>

                    <div className="checkoutHead">
                        <h1 className="checkoutTitle">Đặt hàng thành công</h1>
                        <ol className="steps" aria-label="Các bước đặt hàng">
                            <li className="step isDone">
                                <svg className="icon iconSm" aria-hidden="true">
                                    <use href="#iCheck" />
                                </svg>
                                Giỏ hàng
                            </li>
                            <li className="step isDone">
                                <svg className="icon iconSm" aria-hidden="true">
                                    <use href="#iCheck" />
                                </svg>
                                Thông tin và thanh toán
                            </li>
                            <li className="step isCurrent" aria-current="step">Hoàn tất</li>
                        </ol>
                    </div>

                    <section className="successBanner" aria-labelledby="successHeading">
                        <span className="successMark">
                            <svg className="icon iconLg" aria-hidden="true">
                                <use href="#iCheck" />
                            </svg>
                        </span>
                        <div>
                            <h2 id="successHeading" className="successHeading">
                                Cảm ơn bạn, đơn hàng đã được ghi nhận
                            </h2>
                            <p className="successText">
                                Valigo đã gửi email xác nhận đến{" "}
                                <strong>{order.customer?.email || "email của bạn"}</strong>. Nhân viên sẽ gọi xác
                                nhận đơn trong vòng 30 phút (giờ hành chính).
                            </p>
                        </div>
                        <div className="orderCode">
                            <span className="orderCodeLabel">Mã đơn hàng</span>
                            <strong className="orderCodeValue">{order.code}</strong>
                        </div>
                    </section>

                    <div className="checkoutLayout">
                        <div className="successMain">
                            <section className="formSection" aria-labelledby="infoTitle">
                                <h2 id="infoTitle" className="formTitle">Thông tin giao hàng</h2>
                                <dl className="infoGrid">
                                    <div className="infoItem">
                                        <dt>Người nhận</dt>
                                        <dd>{order.customer?.fullName || "Khách hàng Valigo"}</dd>
                                        {order.customer?.phone && <dd>{order.customer.phone}</dd>}
                                    </div>
                                    <div className="infoItem">
                                        <dt>Địa chỉ</dt>
                                        <dd>{fullAddress}</dd>
                                    </div>
                                    <div className="infoItem">
                                        <dt>Vận chuyển</dt>
                                        <dd>{SHIPPING_LABELS[order.shippingMethod ?? "standard"]}</dd>
                                    </div>
                                    <div className="infoItem">
                                        <dt>Thanh toán</dt>
                                        <dd>{PAYMENT_LABELS[order.paymentMethod ?? "cod"]}</dd>
                                    </div>
                                </dl>
                            </section>

                            <section className="formSection" aria-labelledby="nextTitle">
                                <h2 id="nextTitle" className="formTitle">Các bước tiếp theo</h2>
                                <ol className="timeline">
                                    <li className="timelineItem isDone">
                                        <strong>Đã nhận đơn hàng</strong>
                                        <span>{formatOrderTime(order.placedAt)}</span>
                                    </li>
                                    <li className="timelineItem">
                                        <strong>Xác nhận qua điện thoại</strong>
                                        <span>Nhân viên liên hệ để xác nhận địa chỉ và sản phẩm</span>
                                    </li>
                                    <li className="timelineItem">
                                        <strong>Đóng gói và bàn giao vận chuyển</strong>
                                        <span>Dự kiến trong 24 giờ sau khi xác nhận</span>
                                    </li>
                                    <li className="timelineItem">
                                        <strong>Giao hàng</strong>
                                        <span>Nhận hàng sau 2 đến 4 ngày, kiểm tra hàng rồi thanh toán</span>
                                    </li>
                                </ol>
                            </section>

                            <div className="successActions">
                                <Link to="/" className="btn btnPrimary">Tiếp tục mua sắm</Link>
                                <Link to={`/order-detail?code=${encodeURIComponent(order.code)}`} className="btn btnGhost">
                                    Xem chi tiết đơn hàng
                                </Link>
                                <Link to="/order-tracking" className="btn btnGhost">
                                    Kiểm tra đơn hàng
                                </Link>
                            </div>
                        </div>

                        <aside className="orderSummary" aria-labelledby="orderTitle">
                            <div className="summaryHead">
                                <h2 id="orderTitle" className="summaryTitle">Tóm tắt đơn hàng</h2>
                            </div>

                            <ul className="summaryItems">
                                {order.items.map((item, idx) => {
                                    const product = products.find((p) => p.id === item.productId);
                                    const name = item.name ?? product?.name ?? `Sản phẩm #${item.productId}`;
                                    const unitPrice = item.price ?? product?.price ?? 0;
                                    const imgSrc = item.img ?? product?.images?.[0];
                                    const colorHex =
                                        item.colorHex ??
                                        product?.colors?.find((c) => c.name === item.color)?.hex ??
                                        product?.colors?.[0]?.hex ??
                                        "#B9C3CD";
                                    const variantText = [
                                        item.color,
                                        item.size ? `size ${item.size}` : "",
                                        `số lượng ${item.quantity}`,
                                    ]
                                        .filter(Boolean)
                                        .join(", ");

                                    return (
                                        <li key={`${item.productId}-${idx}`} className="summaryItem">
                                            <span className="summaryThumb">
                                                {imgSrc?.startsWith("#") ? (
                                                    <svg className="summaryImage" viewBox="0 0 200 240" aria-hidden="true">
                                                        <use href={imgSrc} style={{["--bodyColor" as string]: colorHex}} />
                                                    </svg>
                                                ) : (
                                                    <img src={imgSrc} alt={name} className="summaryImage" />
                                                )}
                                            </span>
                                            <span>
                                                <strong className="summaryName">{name}</strong>
                                                <span className="summaryVariant">{variantText}</span>
                                            </span>
                                            <span className="summaryPrice">
                                                {formatPrice(unitPrice * item.quantity)}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>

                            <dl className="summaryRows">
                                <div className="summaryRow">
                                    <dt>Tạm tính</dt>
                                    <dd>{formatPrice(computedSubtotal)}</dd>
                                </div>
                                {computedDiscount > 0 && (
                                    <div className="summaryRow isDiscount">
                                        <dt>Giảm giá {order.voucherCode ? `(${order.voucherCode})` : ""}</dt>
                                        <dd>-{formatPrice(computedDiscount)}</dd>
                                    </div>
                                )}
                                <div className="summaryRow">
                                    <dt>Phí vận chuyển</dt>
                                    <dd>{computedShipping === 0 ? "Miễn phí" : formatPrice(computedShipping)}</dd>
                                </div>
                            </dl>

                            <p className="summaryTotal">
                                <span>Tổng thanh toán</span>
                                <strong>{formatPrice(computedTotal)}</strong>
                            </p>

                            <ul className="summaryPerks">
                                <li>
                                    <svg className="icon iconSm" aria-hidden="true">
                                        <use href="#iHeadset" />
                                    </svg>
                                    Cần hỗ trợ? Gọi hotline 1900 0000
                                </li>
                                <li>
                                    <svg className="icon iconSm" aria-hidden="true">
                                        <use href="#iRefresh" />
                                    </svg>
                                    Đổi trả trong 7 ngày nếu lỗi nhà sản xuất
                                </li>
                            </ul>
                        </aside>
                    </div>
                </div>
            </main>
            <PageFooter />
        </>
    );
}