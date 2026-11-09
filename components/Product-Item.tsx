import type {CSSProperties} from "react";
import type {Product} from "../types/Product.ts";
import {formatPrice} from "../lib/productList/format.ts";

export default function ProductItem({product}: {product: Product}) {
    const hasDiscount = product.discountPercent > 0;

    return (<>
        <article className="card">
            <div className="cardMedia">
                {hasDiscount && <span className="badgeSale">-{product.discountPercent}%</span>}
                <button type="button" className="wish" aria-label="Thêm vào yêu thích">
                    <svg className="icon" aria-hidden="true">
                        <use href="#iHeart" />
                    </svg>
                </button>
                <a href="../ui/productDetail.html" aria-label={`Xem ${product.name}`}>
                    <img className="cardImage" src={product.images[0]} alt={product.name} />
                </a>
                <span className="quickHint">Xem nhanh</span>
            </div>
            <div className="cardBody">
                <div className="swatches" role="group" aria-label="Chọn màu">
                    {product.colors.map((color, index) => (
                        <button
                            key={color.name}
                            type="button"
                            className={index === 0 ? "swatch isActive" : "swatch"}
                            style={{"--bodyColor": color.hex} as CSSProperties}
                            aria-label={color.name}
                        >
                        </button>
                    ))}
                </div>
                <h3 className="cardTitle">
                    <a href="../ui/productDetail.html">{product.name}</a>
                </h3>
                <span className="stars">
                    <span className="starsTrack" role="img"
                          aria-label={`Đánh giá ${String(product.rating).replace(".", ",")} trên 5 sao`}>
                        ★★★★★
                        <span className="starsFill" style={{width: product.rating * 20 + "%"}} aria-hidden="true">★★★★★</span>
                    </span>
                    <span className="starsCount">({product.reviewCount})</span>
                </span>
                <p className="price">
                    <strong>{formatPrice(product.price)}</strong>
                    {hasDiscount && <s>{formatPrice(product.originalPrice)}</s>}
                </p>
                <button type="button" className="btn btnGhost btnBlock cardBtn">Tùy chọn</button>
            </div>
        </article>
    </>);
}
