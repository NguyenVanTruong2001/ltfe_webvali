import {formatPrice} from "../../lib/productList/format.ts";

interface ProductBuyBarProps {
    price: number
    originalPrice: number
    discountPercent: number
    inStock: boolean
    onAddToCart: () => void
}

export default function ProductBuyBar({price, originalPrice, discountPercent, inStock, onAddToCart}: ProductBuyBarProps) {
    return (
        <div className="buyBar">
            <p className="buyBarPrice">
                <strong>{formatPrice(price)}</strong>
                {discountPercent > 0 && <s>{formatPrice(originalPrice)}</s>}
            </p>
            <button type="button" className="btn btnPrimary" disabled={!inStock} onClick={onAddToCart}>
                Thêm vào giỏ
            </button>
        </div>
    );
}
