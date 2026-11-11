import {MAX_QUANTITY, MIN_QUANTITY} from "../../lib/productDetail/options.ts";

interface ProductBuyRowProps {
    quantity: number
    onQuantityChange: (quantity: number) => void
}

function Icon({id}: {id: string}) {
    return (
        <svg className="icon" aria-hidden="true">
            <use href={`#${id}`} />
        </svg>
    );
}

export default function ProductBuyRow({quantity, onQuantityChange}: ProductBuyRowProps) {
    return (
        <>
            <div className="buyRow">
                <div className="qtyBox">
                    <button
                        type="button"
                        aria-label="Giảm số lượng"
                        disabled={quantity <= MIN_QUANTITY}
                        onClick={() => onQuantityChange(quantity - 1)}
                    >
                        <Icon id="iMinus" />
                    </button>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        min={MIN_QUANTITY}
                        max={MAX_QUANTITY}
                        aria-label="Số lượng"
                        onChange={(event) => onQuantityChange(event.target.valueAsNumber)}
                    />
                    <button
                        type="button"
                        aria-label="Tăng số lượng"
                        disabled={quantity >= MAX_QUANTITY}
                        onClick={() => onQuantityChange(quantity + 1)}
                    >
                        <Icon id="iPlus" />
                    </button>
                </div>
                <a href="../ui/cart.html" className="btn btnPrimary addBtn">
                    <Icon id="iBag" />
                    Thêm vào giỏ hàng
                </a>
            </div>
            <a href="../ui/checkout.html" className="btn btnDark btnBlock">Mua ngay</a>
        </>
    );
}
