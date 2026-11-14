import {Link} from "react-router-dom";
import {formatPrice} from "../../lib/productList/format.ts";
import {lineTotal, variantLabel} from "../../lib/cart/pricing.ts";
import type {CartEntry} from "../../lib/cart/pricing.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {removeFromCart, setLineQuantity} from "../../store/cartSlice.ts";
import {selectWishIds, toggleWish} from "../../store/wishlistSlice.ts";
import CartQuantity from "./CartQuantity.tsx";

interface CartItemProps {
    entry: CartEntry
    onNotice: (message: string) => void
}

export default function CartItem({entry, onNotice}: CartItemProps) {
    const dispatch = useAppDispatch();
    const {line, product} = entry;
    const wished = useAppSelector((state) => product !== undefined && selectWishIds(state).includes(product.id));
    const name = product?.name ?? "sản phẩm không còn được bán";

    const handleRemove = () => {
        dispatch(removeFromCart(line.key));
        onNotice(`Đã xóa ${name} khỏi giỏ hàng.`);
    };

    const handleMoveToWishlist = () => {
        if (!product) return;
        if (!wished) dispatch(toggleWish(product.id));
        dispatch(removeFromCart(line.key));
        onNotice(`Đã chuyển ${product.name} vào yêu thích.`);
    };

    if (!product) {
        return (
            <li className="cartItem">
                <span className="cartThumb" aria-hidden="true"></span>
                <div className="cartInfo">
                    <h3 className="cartName">Sản phẩm không còn được bán</h3>
                    <p className="cartVariant">{variantLabel(line)}</p>
                    <div className="cartActions">
                        <button type="button" className="textAction" onClick={handleRemove}>Xóa</button>
                    </div>
                </div>
                <div className="cartQtyCell">
                    <span className="cartQtyText">{line.quantity}</span>
                </div>
                <p className="cartLineTotal">—</p>
            </li>
        );
    }

    const detailPath = `/products/${product.id}/${product.slug}`;
    const hasDiscount = product.discountPercent > 0;

    return (
        <li className="cartItem">
            <Link to={detailPath} className="cartThumb" aria-label={`Xem ${product.name}`}>
                <img className="cartPhoto" src={product.images[0]} alt={product.name} />
            </Link>
            <div className="cartInfo">
                <h3 className="cartName">
                    <Link to={detailPath}>{product.name}</Link>
                </h3>
                <p className="cartVariant">{variantLabel(line)}</p>
                <p className="cartUnitPrice">
                    <strong>{formatPrice(product.price)}</strong>
                    {hasDiscount && <s>{formatPrice(product.originalPrice)}</s>}
                </p>
                <div className="cartActions">
                    <button type="button" className="textAction" onClick={handleMoveToWishlist}>
                        Chuyển vào yêu thích
                    </button>
                    <button type="button" className="textAction" onClick={handleRemove}>Xóa</button>
                </div>
            </div>
            <div className="cartQtyCell">
                <CartQuantity
                    name={product.name}
                    quantity={line.quantity}
                    onChange={(quantity) => dispatch(setLineQuantity({key: line.key, quantity}))}
                />
            </div>
            <p className="cartLineTotal">{formatPrice(lineTotal(entry))}</p>
        </li>
    );
}
