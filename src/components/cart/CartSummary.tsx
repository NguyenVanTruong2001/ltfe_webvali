import {formatPrice} from "../../lib/productList/format.ts";
import type {CartEntry} from "../../lib/cart/pricing.ts";
import type {CartTotals} from "../../lib/cart/totals.ts";
import VoucherPicker from "./VoucherPicker.tsx";

function Icon({id}: {id: string}) {
    return (
        <svg className="icon iconSm" aria-hidden="true">
            <use href={`#${id}`} />
        </svg>
    );
}

interface CartSummaryProps {
    entries: CartEntry[]
    totals: CartTotals
    voucherCode: string | null
}

export default function CartSummary({entries, totals, voucherCode}: CartSummaryProps) {
    return (
        <aside className="summary" aria-labelledby="summaryTitle">
            <h2 id="summaryTitle" className="summaryTitle">Tóm tắt đơn hàng</h2>
            <VoucherPicker entries={entries} totals={totals} voucherCode={voucherCode} />
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
                    <dd>{totals.shippingFee === 0 ? "Miễn phí" : formatPrice(totals.shippingFee)}</dd>
                </div>
                {totals.voucher && totals.shippingDiscount > 0 && (
                    <div className="summaryRow isDiscount">
                        <dt>Giảm phí vận chuyển ({totals.voucher.code})</dt>
                        <dd>-{formatPrice(totals.shippingDiscount)}</dd>
                    </div>
                )}
            </dl>
            <p className="summaryTotal">
                <span>Tổng cộng</span>
                <strong>{formatPrice(totals.total)}</strong>
            </p>
            <p className="summaryNote">Đã bao gồm thuế VAT</p>
            {totals.unavailableCount > 0 && (
                <p className="summaryWarn" role="status">
                    {totals.unavailableCount} sản phẩm đang tạm hết hàng và không được tính vào đơn.
                </p>
            )}
            {totals.purchasableCount > 0 ? (
                <a href="/ui/checkout.html" className="btn btnPrimary btnBlock">Tiến hành thanh toán</a>
            ) : (
                <button type="button" className="btn btnPrimary btnBlock" disabled>
                    Tiến hành thanh toán
                </button>
            )}
            <ul className="methodList" aria-label="Phương thức thanh toán">
                <li className="methodChip">COD</li>
                <li className="methodChip">Thẻ ATM</li>
                <li className="methodChip">Visa / Mastercard</li>
                <li className="methodChip">Ví điện tử</li>
            </ul>
            <ul className="summaryPerks">
                <li>
                    <Icon id="iRefresh" />
                    Đổi trả trong 7 ngày nếu lỗi nhà sản xuất
                </li>
                <li>
                    <Icon id="iShield" />
                    Bảo hành toàn quốc 24 tháng
                </li>
                <li>
                    <Icon id="iPackage" />
                    Đóng gói cẩn thận, giao trong 2 đến 4 ngày
                </li>
            </ul>
        </aside>
    );
}
