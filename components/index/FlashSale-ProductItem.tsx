import type {Product} from "../../types/Product.ts";
import {useState} from "react";
import type {CSSProperties} from "react"
import {Link} from "react-router-dom";
import {formatPrice} from "../../lib/productList/format.ts";

export default function FlashSaleItem({product}: {product: Product}) {
    const [activeColor, setActiveColor] = useState(product.colors[0]?.name);
    const hasDiscount = product.discountPercent > 0;
    const detailPath = `/products/${product.id}/${product.slug}`;

    if (product.isBestSeller) {
    return (<>
        <article className="card">
            <div className="cardMedia">
                <span className="badgeSale">-{product.discountPercent}%</span>
                <button type="button" className="wish" aria-label="Thêm vào yêu thích">
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
                    <a href="../../ui/productDetail.html">Vali khóa kéo Zipra Z8 bản thường</a>
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
                <button type="button" className="btn btnGhost btnBlock cardBtn">Tùy chọn</button>
            </div>
        </article>
    </>);}
}