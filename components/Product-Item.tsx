export default function ProductItem({product}: {product:any}) {
    return (<>
        <article className="card">
            <div className="cardMedia">
                <span className="badgeSale">-{product.discountPercent}%</span>
                <button type="button" className="wish" aria-label="Thêm vào yêu thích">
                    <svg className="icon" aria-hidden="true">
                        <use href="#iHeart" />
                    </svg>
                </button>
                <a href="../ui/productDetail.html" aria-label="Xem Vali khung nhôm Atlas A9 cao cấp">
                    <img className="cardImage" src={product.images[0]} aria-hidden="true">
                    </img>
                </a>
                <span className="quickHint">Xem nhanh</span>
            </div>
            <div className="cardBody">
                <div className="swatches" role="group" aria-label="Chọn màu">
                    <button
                        type="button"
                        className="swatch isActive"
                        style={{background: "#B9C3CD"}}
                        aria-label="Bạc"
                    >
                    </button>
                    <button type="button" className="swatch" style={{background: "#2B3038"}} aria-label="Đen"></button>
                    <button type="button" className="swatch" style={{background: "#27466F"}} aria-label="Xanh navy"></button>
                    <button
                        type="button"
                        className="swatch"
                        style={{background:"#D9BF93"}}
                        aria-label="Champagne"
                    >
                    </button>
                </div>
                <h3 className="cardTitle">
                    <a href="../ui/productDetail.html">{product.name}</a>
                </h3>
                <span className="stars">
                <span className="starsTrack" role="img" aria-label="Đánh giá 4,8 trên 5 sao">
                  ★★★★★
                  <span className="starsFill" style={{width:product.rating * 20 + "%"}} aria-hidden="true">★★★★★</span>
                </span>
                <span className="starsCount">(58)</span>
              </span>
                <p className="price">
                    <strong>{product.price}₫</strong>
                    <s>{product.originalPrice}₫</s>
                </p>
                <button type="button" className="btn btnGhost btnBlock cardBtn">Tùy chọn</button>
            </div>
        </article>
    </>);
}