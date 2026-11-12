import {memo, useState} from "react";
import type {CSSProperties} from "react";
import {Link} from "react-router-dom";
import {formatPrice} from "../lib/productList/format.ts";
import type {Product} from "../types/Product.ts";

interface ProductItemProps {
    product: Product
    wished?: boolean
    onToggleWish?: (id: number) => void
}

function FlashSaleItem({product, wished = false, onToggleWish}: ProductItemProps) {
    const [activeColor, setActiveColor] = useState(product.colors[0]?.name);
    const hasDiscount = product.discountPercent > 0;
    const detailPath = `/products/${product.id}/${product.slug}`;

    if (product.isBestSeller) {
    return (<>
        <article className="card">
            <div className="cardMedia">
                <span className="badgeSale">-{product.discountPercent}%</span>
                <button
                    type="button"
                    className={wished ? "wish isActive" : "wish"}
                    aria-label={wished ? "Bỏ khỏi yêu thích" : "Thêm vào yêu thích"}
                    aria-pressed={wished}
                    onClick={() => onToggleWish?.(product.id)}
                >
                    <svg className="icon" aria-hidden="true">
                        <use href="#iHeart" />
                    </svg>
                </button>
                <Link to={detailPath} aria-label={`Xem ${product.name}`}>
                    <img className="cardImage" src={product.images[0]} alt={product.name} />
                </Link>
                <span className="quickHint">Xem nhanh</span>
            </div>
            <div className="cardBody">
                <div className="swatches" role="group" aria-label="Chọn màu">
                    {product.colors.map((color) => (
                        <button
                            key={color.name}
                            type="button"
                            className={color.name === activeColor ? "swatch isActive" : "swatch"}
                            aria-pressed={color.name === activeColor}
                            onClick={() => setActiveColor(color.name)}
                            style={{"--bodyColor": color.hex} as CSSProperties}
                            aria-label={color.name}
                        >
                        </button>
                    ))}
                </div>
                <h3 className="cardTitle">
                    <Link to={detailPath}>{product.name}</Link>
                </h3>
                <span className="stars">
                  <span className="starsTrack" role="img" aria-label="Đánh giá 4,6 trên 5 sao">
                    ★★★★★
                    <span className="starsFill" style={{width:"92%"}} aria-hidden="true">★★★★★</span>
                  </span>
                  <span className="starsCount">(32)</span>
                </span>
                <p className="price">
                    <strong>{formatPrice(product.price)}</strong>
                    {hasDiscount && <s>{formatPrice(product.originalPrice)}</s>}
                </p>
                <Link to={detailPath} className="btn btnGhost btnBlock cardBtn">Tùy chọn</Link>
            </div>
        </article>
    </>);}
}

export default memo(FlashSaleItem)