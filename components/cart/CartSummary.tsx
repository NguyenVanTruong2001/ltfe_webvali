import {formatPrice} from "../../lib/productList/format.ts";

function Icon({id}: {id: string}) {
    return (
        <svg className="icon iconSm" aria-hidden="true">
            <use href={`#${id}`} />
        </svg>
    );
}

export default function CartSummary({subtotal}: {subtotal: number}) {
    return (
        <aside className="summary" aria-labelledby="summaryTitle">
            <h2 id="summaryTitle" className="summaryTitle">Tóm tắt đơn hàng</h2>
            <dl className="summaryRows">
                <div className="summaryRow">
                    <dt>Tạm tính</dt>
                    <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="summaryRow">
                    <dt>Phí vận chuyển</dt>
                    <dd>Tính ở bước thanh toán</dd>
                </div>
            </dl>
            <p className="summaryTotal">
                <span>Tổng cộng</span>
                <strong>{formatPrice(subtotal)}</strong>
            </p>
            <p className="summaryNote">Đã bao gồm thuế VAT</p>
            <a href="/ui/checkout.html" className="btn btnPrimary btnBlock">Tiến hành thanh toán</a>
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
