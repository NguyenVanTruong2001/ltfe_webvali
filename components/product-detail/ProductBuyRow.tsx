import {MAX_QUANTITY, MIN_QUANTITY} from "../../lib/productDetail/options.ts";

interface ProductBuyRowProps {
    quantity: number
    inStock: boolean
    wished: boolean
    notice: string | null
    onQuantityChange: (quantity: number) => void
    onAddToCart: () => void
    onBuyNow: () => void
    onToggleWish: () => void
}

function Icon({id, className = "icon"}: {id: string, className?: string}) {
    return (
        <svg className={className} aria-hidden="true">
            <use href={`#${id}`} />
        </svg>
    );
}

export default function ProductBuyRow({
    quantity, inStock, wished, notice, onQuantityChange, onAddToCart, onBuyNow, onToggleWish,
}: ProductBuyRowProps) {
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
                <button type="button" className="btn btnPrimary addBtn" disabled={!inStock} onClick={onAddToCart}>
                    <Icon id="iBag" />
                    Thêm vào giỏ hàng
                </button>
                <button
                    type="button"
                    className={wished ? "wishBtn isActive" : "wishBtn"}
                    aria-label={wished ? "Bỏ khỏi yêu thích" : "Thêm vào yêu thích"}
                    aria-pressed={wished}
                    onClick={onToggleWish}
                >
                    <Icon id="iHeart" className="icon iconLg" />
                </button>
            </div>
            <button type="button" className="btn btnDark btnBlock" disabled={!inStock} onClick={onBuyNow}>
                Mua ngay
            </button>
            <p className="addNotice" role="status">
                {notice}
                {notice && <> <a href="../ui/cart.html" className="textLink">Xem giỏ hàng</a></>}
            </p>
        </>
    );
}
