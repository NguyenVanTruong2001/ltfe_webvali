import type {CSSProperties} from "react";
import type {Product} from "../../types/Product.ts";
import {formatPrice} from "../../lib/productList/format.ts";
import {PERKS} from "../../lib/productDetail/content.ts";

function Icon({id, className = "icon iconSm"}: {id: string, className?: string}) {
    return (
        <svg className={className} aria-hidden="true">
            <use href={`#${id}`} />
        </svg>
    );
}

export default function ProductInfo({product}: {product: Product}) {
    const ratingText = String(product.rating).replace(".", ",");
    const highlights = [
        product.specs.material,
        product.specs.lock,
        product.specs.warranty && `Bảo hành ${product.specs.warranty}`,
    ].filter(Boolean);
    const hasDiscount = product.discountPercent > 0;

    return (
        <div className="info">
            <h1 id="productTitle" className="productTitle">{product.name}</h1>
            <div className="productMeta">
                <span className="stars">
                    <span className="starsTrack" role="img" aria-label={`Đánh giá ${ratingText} trên 5 sao`}>
                        ★★★★★
                        <span
                            className="starsFill"
                            style={{"--rateWidth": `${product.rating * 20}%`} as CSSProperties}
                            aria-hidden="true"
                        >★★★★★</span>
                    </span>
                    <span className="starsCount">({product.reviewCount} đánh giá)</span>
                </span>
                <span className="metaSep" aria-hidden="true"></span>
                <span>Mã sản phẩm: {product.sku}</span>
                <span className="metaSep" aria-hidden="true"></span>
                <span className="stock">
                    <Icon id="iCheck" />
                    {product.inStock ? "Còn hàng" : "Hết hàng"}
                </span>
            </div>
            <p className="price priceLg">
                <strong>{formatPrice(product.price)}</strong>
                {hasDiscount && <s>{formatPrice(product.originalPrice)}</s>}
                {hasDiscount && <span className="save">Tiết kiệm {formatPrice(product.originalPrice - product.price)}</span>}
            </p>
            <ul className="highlightList">
                {highlights.map((text) => (
                    <li key={text}>
                        <Icon id="iCheck" />
                        {text}
                    </li>
                ))}
            </ul>
            <ul className="perkList">
                {PERKS.map((perk) => (
                    <li className="perk" key={perk.title}>
                        <Icon id={perk.icon} className="icon iconLg" />
                        <span>
                            <strong>{perk.title}</strong>
                            <span className="perkText">{perk.text}</span>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
