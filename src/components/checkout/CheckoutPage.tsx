import {useMemo, useState} from "react";
import type {SyntheticEvent} from "react";
import {Link, useNavigate} from "react-router";
import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import {useCartEntries} from "../../hooks/useCartEntries.ts";
import {useAppDispatch} from "../../store/hooks.ts";
import {createOrderAsync} from "../../store/ordersSlice.ts";
import {removeFromCart} from "../../store/cartSlice.ts";
import {removeVoucher} from "../../store/voucherSlice.ts";
import {formatPrice} from "../../lib/productList/format.ts";
import {isPurchasable, lineTotal, variantLabel} from "../../lib/cart/pricing.ts";
import type {Order, PaymentMethod, ShippingMethod} from "../../types/Order.ts";
import {VIETNAM_LOCATIONS} from "../../lib/checkout/locations.ts";

const EXPRESS_SURCHARGE = 30000;

function generateOrderCode(): string {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const rand = String(Math.floor(1000 + Math.random() * 9000));
    return `VLG-${yy}${mm}${dd}-${rand}`;
}

export default function CheckoutPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {entries, totals, voucherCode} = useCartEntries();

    const purchasableEntries = useMemo(
        () => entries.filter(isPurchasable),
        [entries]
    );

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
    const [agree, setAgree] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const provinceOptions = Object.keys(VIETNAM_LOCATIONS);
    const districtOptions = province ? Object.keys(VIETNAM_LOCATIONS[province] ?? {}) : [];
    const wardOptions =
        province && district ? (VIETNAM_LOCATIONS[province]?.[district] ?? []) : [];

    const expressSurcharge = shippingMethod === "express" ? EXPRESS_SURCHARGE : 0;
    const effectiveShippingFee = Math.max(0, totals.shippingFee - totals.shippingDiscount) + expressSurcharge;
    const finalTotal = Math.max(0, totals.subtotal - totals.discount + effectiveShippingFee);

    function handleProvinceChange(nextProvince: string) {
        setProvince(nextProvince);
        setDistrict("");
        setWard("");
    }

    function handleDistrictChange(nextDistrict: string) {
        setDistrict(nextDistrict);
        setWard("");
    }

    async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        if (purchasableEntries.length === 0 || isSubmitting) return;

        setIsSubmitting(true);
        setSubmitError(null);

        const code = generateOrderCode();
        const newOrder: Order = {
            code,
            placedAt: new Date().toISOString(),
            status: "pending",
            items: purchasableEntries.map((entry) => ({
                productId: entry.line.productId,
                quantity: entry.line.quantity,
                color: entry.line.color,
                size: entry.line.size,
                name: entry.product?.name,
                price: entry.product?.price,
                img: entry.product?.images?.[0],
                colorHex:
                    entry.product?.colors?.find((c) => c.name === entry.line.color)?.hex ??
                    entry.product?.colors?.[0]?.hex,
            })),
            customer: {
                fullName: fullName.trim(),
                phone: phone.trim(),
                email: email.trim(),
                province,
                district,
                ward,
                address: address.trim(),
                note: note.trim() || undefined,
            },
            shippingMethod,
            paymentMethod,
            subtotal: totals.subtotal,
            discount: totals.discount,
            shippingFee: effectiveShippingFee,
            total: finalTotal,
            voucherCode,
        };

        try {
            await dispatch(createOrderAsync(newOrder)).unwrap();

            purchasableEntries.forEach((entry) => {
                dispatch(removeFromCart(entry.line.key));
            });
            dispatch(removeVoucher());

            navigate(`/order-success?code=${encodeURIComponent(code)}`);
        } catch (err) {
            setSubmitError(
                err instanceof Error ? err.message : "Không thể tạo đơn hàng. Vui lòng thử lại."
            );
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <PageHeader />
            <main id="noiDung">
                <div className="container">
                    <nav className="breadcrumb" aria-label="Đường dẫn">
                        <ol>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li><Link to="/cart">Giỏ hàng</Link></li>
                            <li aria-current="page">Thanh toán</li>
                        </ol>
                    </nav>

                    <div className="checkoutHead">
                        <h1 className="checkoutTitle">Thanh toán</h1>
                        <ol className="steps" aria-label="Các bước đặt hàng">
                            <li className="step isDone">
                                <svg className="icon iconSm" aria-hidden="true">
                                    <use href="#iCheck" />
                                </svg>
                                Giỏ hàng
                            </li>
                            <li className="step isCurrent" aria-current="step">Thông tin và thanh toán</li>
                            <li className="step">Hoàn tất</li>
                        </ol>
                    </div>

                    {purchasableEntries.length === 0 ? (
                        <section className="formSection" style={{textAlign: "center", padding: "3rem 1.5rem"}}>
                            <h2 className="formTitle">Chưa có sản phẩm khả dụng để thanh toán</h2>
                            <p style={{marginBottom: "1.5rem"}}>
                                Giỏ hàng của bạn đang trống hoặc các sản phẩm đã chọn hiện tạm hết hàng.
                            </p>
                            <Link to="/products" className="btn btnPrimary">Tiếp tục mua sắm</Link>
                        </section>
                    ) : (
                        <div className="checkoutLayout">
                            <form className="checkoutForm" id="checkoutForm" onSubmit={handleSubmit}>
                                <fieldset className="formSection" disabled={isSubmitting}>
                                    <legend className="formTitle">Thông tin liên hệ</legend>
                                    <div className="fieldGrid">
                                        <div className="formField span2">
                                            <label htmlFor="fullName">Họ và tên</label>
                                            <input
                                                id="fullName"
                                                type="text"
                                                autoComplete="name"
                                                required
                                                placeholder="Nguyễn Văn A"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                            />
                                        </div>
                                        <div className="formField">
                                            <label htmlFor="phone">Số điện thoại</label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                inputMode="tel"
                                                autoComplete="tel"
                                                required
                                                pattern="0[0-9]{9}"
                                                title="Số điện thoại gồm 10 chữ số, bắt đầu bằng 0"
                                                placeholder="0900000000"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                        <div className="formField">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                id="email"
                                                type="email"
                                                inputMode="email"
                                                autoComplete="email"
                                                required
                                                placeholder="ten@email.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className="formSection" disabled={isSubmitting}>
                                    <legend className="formTitle">Địa chỉ giao hàng</legend>
                                    <div className="fieldGrid">
                                        <div className="formField">
                                            <label htmlFor="province">Tỉnh, thành phố</label>
                                            <select
                                                id="province"
                                                autoComplete="off"
                                                required
                                                value={province}
                                                onChange={(e) => handleProvinceChange(e.target.value)}
                                            >
                                                <option value="">Chọn tỉnh, thành phố</option>
                                                {provinceOptions.map((prov) => (
                                                    <option key={prov} value={prov}>{prov}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="formField">
                                            <label htmlFor="district">Quận, huyện</label>
                                            <select
                                                id="district"
                                                autoComplete="off"
                                                required
                                                disabled={!province}
                                                value={district}
                                                onChange={(e) => handleDistrictChange(e.target.value)}
                                            >
                                                <option value="">Chọn quận, huyện</option>
                                                {districtOptions.map((dist) => (
                                                    <option key={dist} value={dist}>{dist}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="formField">
                                            <label htmlFor="ward">Phường, xã</label>
                                            <select
                                                id="ward"
                                                autoComplete="off"
                                                required
                                                disabled={!district}
                                                value={ward}
                                                onChange={(e) => setWard(e.target.value)}
                                            >
                                                <option value="">Chọn phường, xã</option>
                                                {wardOptions.map((w) => (
                                                    <option key={w} value={w}>{w}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="formField">
                                            <label htmlFor="address">Số nhà, tên đường</label>
                                            <input
                                                id="address"
                                                type="text"
                                                autoComplete="street-address"
                                                required
                                                placeholder="123 Đường Mẫu"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                        <div className="formField span2">
                                            <label htmlFor="note">Ghi chú cho đơn hàng (không bắt buộc)</label>
                                            <textarea
                                                id="note"
                                                rows={3}
                                                placeholder="Ví dụ: giao giờ hành chính, gọi trước khi giao"
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className="formSection" disabled={isSubmitting}>
                                    <legend className="formTitle">Phương thức vận chuyển</legend>
                                    <div className="optionList">
                                        <label className="optionCard">
                                            <input
                                                type="radio"
                                                name="shipping"
                                                value="standard"
                                                checked={shippingMethod === "standard"}
                                                onChange={() => setShippingMethod("standard")}
                                            />
                                            <span className="optionBody">
                                                <strong>Giao tiêu chuẩn</strong>
                                                <span className="optionNote">Nhận hàng sau 2 đến 4 ngày</span>
                                            </span>
                                            <span className="optionPrice">
                                                {totals.shippingFee === 0 ? "Miễn phí" : formatPrice(totals.shippingFee)}
                                            </span>
                                        </label>
                                        <label className="optionCard">
                                            <input
                                                type="radio"
                                                name="shipping"
                                                value="express"
                                                checked={shippingMethod === "express"}
                                                onChange={() => setShippingMethod("express")}
                                            />
                                            <span className="optionBody">
                                                <strong>Giao nhanh</strong>
                                                <span className="optionNote">Nhận hàng sau 1 đến 2 ngày</span>
                                            </span>
                                            <span className="optionPrice">+{formatPrice(EXPRESS_SURCHARGE)}</span>
                                        </label>
                                    </div>
                                </fieldset>

                                <fieldset className="formSection" disabled={isSubmitting}>
                                    <legend className="formTitle">Phương thức thanh toán</legend>
                                    <div className="optionList">
                                        <label className="optionCard">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="cod"
                                                checked={paymentMethod === "cod"}
                                                onChange={() => setPaymentMethod("cod")}
                                            />
                                            <span className="optionBody">
                                                <strong>Thanh toán khi nhận hàng (COD)</strong>
                                                <span className="optionNote">Kiểm tra hàng rồi mới thanh toán</span>
                                            </span>
                                        </label>
                                        <label className="optionCard">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="bank"
                                                checked={paymentMethod === "bank"}
                                                onChange={() => setPaymentMethod("bank")}
                                            />
                                            <span className="optionBody">
                                                <strong>Chuyển khoản ngân hàng</strong>
                                                <span className="optionNote">Thông tin tài khoản được gửi sau khi đặt hàng</span>
                                            </span>
                                        </label>
                                        <label className="optionCard">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="card"
                                                checked={paymentMethod === "card"}
                                                onChange={() => setPaymentMethod("card")}
                                            />
                                            <span className="optionBody">
                                                <strong>Thẻ ATM, Visa hoặc Mastercard</strong>
                                                <span className="optionNote">Thanh toán trực tuyến qua cổng bảo mật</span>
                                            </span>
                                        </label>
                                        <label className="optionCard">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="wallet"
                                                checked={paymentMethod === "wallet"}
                                                onChange={() => setPaymentMethod("wallet")}
                                            />
                                            <span className="optionBody">
                                                <strong>Ví điện tử</strong>
                                                <span className="optionNote">Quét mã để thanh toán trên điện thoại</span>
                                            </span>
                                        </label>
                                    </div>
                                </fieldset>

                                <label className="checkLine">
                                    <input
                                        type="checkbox"
                                        name="agree"
                                        required
                                        disabled={isSubmitting}
                                        checked={agree}
                                        onChange={(e) => setAgree(e.target.checked)}
                                    />
                                    <span>
                                        Tôi đồng ý với{" "}
                                        <Link to="/returnPolicy" className="textLink">Chính sách đổi trả</Link>{" "}
                                        và{" "}
                                        <Link to="/privacyPolicy" className="textLink">Chính sách bảo mật</Link>{" "}
                                        của Valigo.
                                    </span>
                                </label>

                                {submitError && (
                                    <p role="alert" style={{color: "#b91c1c", marginTop: "0.75rem", fontWeight: 500}}>
                                        {submitError}
                                    </p>
                                )}

                                <div className="formActions">
                                    <Link to="/cart" className="textLink">Quay lại giỏ hàng</Link>
                                    <button type="submit" className="btn btnPrimary" disabled={isSubmitting}>
                                        {isSubmitting ? "Đang xử lý đơn hàng..." : "Đặt hàng"}
                                    </button>
                                </div>
                            </form>

                            <aside className="orderSummary" aria-labelledby="orderTitle">
                                <div className="summaryHead">
                                    <h2 id="orderTitle" className="summaryTitle">Đơn hàng của bạn</h2>
                                    <Link to="/cart" className="textLink">Sửa giỏ hàng</Link>
                                </div>

                                <ul className="summaryItems">
                                    {purchasableEntries.map((entry) => {
                                        const product = entry.product!;
                                        const variant = variantLabel(entry.line);
                                        const thumb = product.images?.[0];
                                        const colorHex =
                                            product.colors?.find((c) => c.name === entry.line.color)?.hex ??
                                            product.colors?.[0]?.hex ??
                                            "#B9C3CD";

                                        return (
                                            <li key={entry.line.key} className="summaryItem">
                                                <span className="summaryThumb">
                                                    {thumb?.startsWith("#") ? (
                                                        <svg className="summaryImage" viewBox="0 0 200 240" aria-hidden="true">
                                                            <use href={thumb} style={{["--bodyColor" as string]: colorHex}} />
                                                        </svg>
                                                    ) : (
                                                        <img src={thumb} alt={product.name} className="summaryImage" />
                                                    )}
                                                </span>
                                                <span>
                                                    <strong className="summaryName">{product.name}</strong>
                                                    <span className="summaryVariant">
                                                        {[variant, `số lượng ${entry.line.quantity}`].filter(Boolean).join(", ")}
                                                    </span>
                                                </span>
                                                <span className="summaryPrice">{formatPrice(lineTotal(entry))}</span>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <dl className="summaryRows">
                                    <div className="summaryRow">
                                        <dt>Tạm tính</dt>
                                        <dd>{formatPrice(totals.subtotal)}</dd>
                                    </div>
                                    {totals.voucher && totals.discount > 0 && (
                                        <div className="summaryRow isDiscount">
                                            <dt>Giảm giá ({totals.voucher.code}, {totals.voucher.value}%)</dt>
                                            <dd>-{formatPrice(totals.discount)}</dd>
                                        </div>
                                    )}
                                    <div className="summaryRow">
                                        <dt>Phí vận chuyển</dt>
                                        <dd>{effectiveShippingFee === 0 ? "Miễn phí" : formatPrice(effectiveShippingFee)}</dd>
                                    </div>
                                </dl>

                                <p className="summaryTotal">
                                    <span>Tổng cộng</span>
                                    <strong>{formatPrice(finalTotal)}</strong>
                                </p>
                                <p className="summaryNote">
                                    Đã bao gồm thuế VAT. Phí giao nhanh (nếu chọn) được cộng thêm khi đặt hàng.
                                </p>

                                <ul className="summaryPerks">
                                    <li>
                                        <svg className="icon iconSm" aria-hidden="true">
                                            <use href="#iShield" />
                                        </svg>
                                        Bảo hành toàn quốc 24 tháng
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
                    )}
                </div>
            </main>
            <PageFooter />
        </>
    );
}