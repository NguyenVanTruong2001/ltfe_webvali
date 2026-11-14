import {Link} from "react-router-dom";
import {formatPrice} from "../../lib/productList/format.ts";
import {lineTotal, variantLabel} from "../../lib/cart/pricing.ts";
import type {CartEntry} from "../../lib/cart/pricing.ts";

export default function CartItem({entry}: {entry: CartEntry}) {
    const {line, product} = entry;

    if (!product) {
        return (
            <li className="cartItem">
                <span className="cartThumb" aria-hidden="true"></span>
                <div className="cartInfo">
                    <h3 className="cartName">Sản phẩm không còn được bán</h3>
                    <p className="cartVariant">{variantLabel(line)}</p>
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
            </div>
            <div className="cartQtyCell">
                <span className="cartQtyText" aria-label={`Số lượng ${line.quantity}`}>{line.quantity}</span>
            </div>
            <p className="cartLineTotal">{formatPrice(lineTotal(entry))}</p>
        </li>
    );
}
