import type {Product} from "../types/Product.ts";

export default function FlashSaleItem({product}: {product: Product}) {
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
                <a href="../ui/productDetail.html" aria-label="Xem Vali khóa kéo Zipra Z8 bản thường">
                    <img className="cardImage" src={product.images[0]} aria-hidden="true" alt={product.name}>
                    </img>
                </a>
                <span className="quickHint">Xem nhanh</span>
            </div>
            <div className="cardBody">
                <div className="swatches" role="group" aria-label="Chọn màu">
                    <button
                        type="button"
                        className="swatch isActive"
                        style={{background:"#2B3038"}}
                        aria-label="Đen"
                    >
                    </button>
                    <button
                        type="button"
                        className="swatch"
                        style={{background:"#27466F"}}
                        aria-label="Xanh navy"
                    >
                    </button>
                    <button
                        type="button"
                        className="swatch"
                        style={{background:"#F2A7B8"}}
                        aria-label="Hồng"
                    >
                    </button>
                    <button type="button" className="swatch" style={{background:"#8EC5E8"}} aria-label="Xanh nhạt"></button>
                </div>
                <h3 className="cardTitle">
                    <a href="../ui/productDetail.html">Vali khóa kéo Zipra Z8 bản thường</a>
                </h3>
                <span className="stars">
                  <span className="starsTrack" role="img" aria-label="Đánh giá 4,6 trên 5 sao">
                    ★★★★★
                    <span className="starsFill" style={{width:"92%"}} aria-hidden="true">★★★★★</span>
                  </span>
                  <span className="starsCount">(32)</span>
                </span>
                <p className="price">
                    <strong>{stringing(product.price)}</strong>
                    <s>1.149.000₫</s>
                </p>
                <button type="button" className="btn btnGhost btnBlock cardBtn">Tùy chọn</button>
            </div>
        </article>
    </>);}

}

function stringing(price: number) {
    return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'vnd'}).format(price);
}