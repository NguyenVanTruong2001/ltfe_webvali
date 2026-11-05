import PageHeader from "../components/Page-Header.tsx";
import PageFooter from "../components/Page-Footer.tsx";
import ProductList from "../components/Product-List.tsx";

function App() {
  return (
    <>
      <PageHeader />
      <main id="noiDung">
        <section className="hero" aria-label="Chương trình nổi bật">
          <div className="container">
            <div className="ticket">
              <div className="ticketMain">
                <div className="slide">
                  <h1 className="heroTitle">Atlas khung nhôm: nhẹ tay kéo, bền qua nhiều chuyến bay</h1>
                  <p className="heroText">
                    Ba size 20, 24 và 28 inch, khóa TSA, bánh xe xoay 360°. Bảo hành toàn quốc.
                  </p>
                  <div className="coupon">
                    <span className="couponCode">ATLAS10</span>
                    <span className="couponNote">Giảm thêm 10% cho đơn đầu tiên</span>
                    <button type="button" className="couponCopy">
                      <svg className="icon iconSm" aria-hidden="true">
                        <use href="#iCopy" />
                      </svg>
                      Sao chép
                    </button>
                  </div>
                  <a href="#" className="btn btnPrimary">Xem vali khung nhôm</a>
                </div>
                <div className="heroControls">
                  <button type="button" className="roundBtn" aria-label="Banner trước">
                    <svg className="icon" aria-hidden="true">
                      <use href="#iChevLeft" />
                    </svg>
                  </button>
                  <div className="dots">
                    <button
                        type="button"
                        className="dot isActive"
                        aria-label="Chuyển đến banner 1"
                        aria-current="true"
                    >
                    </button>
                    <button type="button" className="dot" aria-label="Chuyển đến banner 2"></button>
                    <button type="button" className="dot" aria-label="Chuyển đến banner 3"></button>
                  </div>
                  <button type="button" className="roundBtn" aria-label="Banner sau">
                    <svg className="icon" aria-hidden="true">
                      <use href="#iChevRight" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ticketStub">
                <div className="stubContent">
                  <svg className="stubImage" viewBox="0 0 200 240" aria-hidden="true">
                    <use href="#suitcase" />
                  </svg>
                  <p className="stubLabel">Giá từ</p>
                  <p className="stubPrice">1.039.000₫</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="policy" aria-label="Cam kết của cửa hàng">
          <ul className="container policyList">
            <li className="policyItem">
            <span className="policyIcon">
              <svg className="icon iconLg" aria-hidden="true">
                <use href="#iTruck" />
              </svg>
            </span>
              <span>
              <strong>Miễn phí vận chuyển</strong>
              <span className="policyText">Đơn từ 1.000.000₫</span>
            </span>
            </li>
            <li className="policyItem">
            <span className="policyIcon">
              <svg className="icon iconLg" aria-hidden="true">
                <use href="#iShield" />
              </svg>
            </span>
              <span>
              <strong>Bảo hành toàn quốc</strong>
              <span className="policyText">Sửa chữa bánh xe, tay kéo, khóa</span>
            </span>
            </li>
            <li className="policyItem">
            <span className="policyIcon">
              <svg className="icon iconLg" aria-hidden="true">
                <use href="#iRefresh" />
              </svg>
            </span>
              <span>
              <strong>Đổi trả trong 7 ngày</strong>
              <span className="policyText">Nếu sản phẩm lỗi do nhà sản xuất</span>
            </span>
            </li>
            <li className="policyItem">
            <span className="policyIcon">
              <svg className="icon iconLg" aria-hidden="true">
                <use href="#iHeadset" />
              </svg>
            </span>
              <span>
              <strong>Hỗ trợ mỗi ngày</strong>
              <span className="policyText">8:00 – 21:00 mỗi ngày</span>
            </span>
            </li>
          </ul>
        </section>
        <section className="section container" aria-labelledby="finderTitle">
          <div className="finder">
            <div className="finderCopy">
              <h2 id="finderTitle" className="sectionTitle">Bạn đi mấy ngày?</h2>
              <p className="sectionSub">Kéo thanh trượt, chúng tôi gợi ý size vali phù hợp với chuyến đi.</p>
              <label className="rangeLabel" htmlFor="tripDays">
                <span className="rangeValue">5</span>
                ngày
              </label>
              <input id="tripDays" className="range" type="range" min="1" max="14" value="5" />
                <div className="rangeScale" aria-hidden="true">
                  <span>1 ngày</span>
                  <span>14 ngày</span>
                </div>
                <p className="finderResult">
                  <strong>Nên chọn size 24"</strong>
                  Ký gửi, đủ cho một tuần đi lại thoải mái mà vẫn dễ kéo.
                </p>
                <button type="button" className="btn btnDark">Xem 9 mẫu size 24"</button>
            </div>
            <div className="finderVisual" aria-hidden="true">
              <div className="sil">
                <svg width="62" className="" viewBox="0 0 200 240" aria-hidden="true">
                  <use href="#suitcase" style={{fill:"#B9C3CD"}} />
                </svg>
                <span>20"</span>
              </div>
              <div className="sil isActive">
                <svg width="80" className="" viewBox="0 0 200 240" aria-hidden="true">
                  <use href="#suitcase" style={{fill:"#FFC400"}} />
                </svg>
                <span>24"</span>
              </div>
              <div className="sil">
                <svg width="98" className="" viewBox="0 0 200 240" aria-hidden="true">
                  <use href="#suitcase" style={{fill:"#B9C3CD"}} />
                </svg>
                <span>28"</span>
              </div>
            </div>
          </div>
        </section>
        <section id="sanPham" className="section container" aria-labelledby="productsTitle">
          <div className="sectionHead">
            <div>
              <h2 id="productsTitle" className="sectionTitle">Sản phẩm cho chuyến đi sắp tới</h2>
              <p className="sectionSub">Chọn nhóm sản phẩm, màu sắc và size để xem nhanh giá và đánh giá.</p>
            </div>
          </div>
          <div className="tabs" role="tablist" aria-label="Nhóm sản phẩm">
            <button type="button" role="tab" className="tab isActive" aria-selected="true">Nổi bật</button>
            <button type="button" role="tab" className="tab" aria-selected="false">Vali khung nhôm</button>
            <button type="button" role="tab" className="tab" aria-selected="false">Vali khóa kéo</button>
            <button type="button" role="tab" className="tab" aria-selected="false">Vali nhựa</button>
            <button type="button" role="tab" className="tab" aria-selected="false">Balo</button>
            <button type="button" role="tab" className="tab" aria-selected="false">Phụ kiện</button>
          </div>
          <div className="sizeFilter" role="group" aria-label="Lọc theo size vali">
            <span className="sizeFilterLabel">Size</span>
            <button type="button" className="chip isActive">Tất cả</button>
            <button type="button" className="chip">20"</button>
            <button type="button" className="chip">24"</button>
            <button type="button" className="chip">28"</button>
          </div>
          <ProductList />
        </section>
        <section id="flashSale" className="flash" aria-labelledby="flashTitle">
          <div className="container">
            <div className="sectionHead">
              <div>
                <h2 id="flashTitle" className="sectionTitle">Flash sale hôm nay</h2>
                <p className="sectionSub">Giá ưu đãi kết thúc lúc 23:59. Hết giờ, giá quay về như cũ.</p>
              </div>
              <div className="flashSide">
                <div className="countdown" role="timer" aria-label="Thời gian còn lại của flash sale">
                  <div className="timeBox">
                    <span className="timeValue">05</span>
                    <span className="timeLabel">giờ</span>
                  </div>
                  <div className="timeBox">
                    <span className="timeValue">32</span>
                    <span className="timeLabel">phút</span>
                  </div>
                  <div className="timeBox">
                    <span className="timeValue">10</span>
                    <span className="timeLabel">giây</span>
                  </div>
                </div>
                <div className="railBtns">
                  <button type="button" className="roundBtn onDark" aria-label="Cuộn sang trái">
                    <svg className="icon" aria-hidden="true">
                      <use href="#iChevLeft" />
                    </svg>
                  </button>
                  <button type="button" className="roundBtn onDark" aria-label="Cuộn sang phải">
                    <svg className="icon" aria-hidden="true">
                      <use href="#iChevRight" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="rail" tabIndex={0} aria-label="Danh sách sản phẩm flash sale">
              <article className="card">
                <div className="cardMedia">
                  <span className="badgeSale">-40%</span>
                  <button type="button" className="wish" aria-label="Thêm vào yêu thích">
                    <svg className="icon" aria-hidden="true">
                      <use href="#iHeart" />
                    </svg>
                  </button>
                  <a href="../ui/productDetail.html" aria-label="Xem Vali khóa kéo Zipra Z8 bản thường">
                    <svg className="cardImage" viewBox="0 0 200 240" aria-hidden="true">
                      <use href="#suitcase" style={{fill:"#2B3038"}} />
                    </svg>
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
                    <strong>689.000₫</strong>
                    <s>1.149.000₫</s>
                  </p>
                  <button type="button" className="btn btnGhost btnBlock cardBtn">Tùy chọn</button>
                </div>
              </article>
              <article className="card">
                <div className="cardMedia">
                  <span className="badgeSale">-46%</span>
                  <button type="button" className="wish" aria-label="Thêm vào yêu thích">
                    <svg className="icon" aria-hidden="true">
                      <use href="#iHeart" />
                    </svg>
                  </button>
                  <a href="../ui/productDetail.html" aria-label="Xem Vali nhựa PC Sora thời trang">
                    <svg className="cardImage" viewBox="0 0 200 240" aria-hidden="true">
                      <use href="#suitcase" style={{fill:"#8EC5E8"}} />
                    </svg>
                  </a>
                  <span className="quickHint">Xem nhanh</span>
                </div>
                <div className="cardBody">
                  <div className="swatches" role="group" aria-label="Chọn màu">
                    <button
                        type="button"
                        className="swatch isActive"
                        style={{background:"#8EC5E8"}}
                        aria-label="Xanh nhạt"
                    >
                    </button>
                    <button
                        type="button"
                        className="swatch"
                        style={{background:"#B9C3CD"}}
                        aria-label="Bạc"
                    >
                    </button>
                    <button
                        type="button"
                        className="swatch"
                        style={{background:"#F2A7B8"}}
                        aria-label="Hồng"
                    >
                    </button>
                  </div>
                  <h3 className="cardTitle">
                    <a href="../ui/productDetail.html">Vali nhựa PC Sora thời trang</a>
                  </h3>
                  <span className="stars">
                  <span className="starsTrack" role="img" aria-label="Đánh giá 4,7 trên 5 sao">
                    ★★★★★
                    <span className="starsFill" style={{width:"94%"}} aria-hidden="true">★★★★★</span>
                  </span>
                  <span className="starsCount">(43)</span>
                </span>
                  <p className="price">
                    <strong>889.000₫</strong>
                    <s>1.649.000₫</s>
                  </p>
                  <button type="button" className="btn btnGhost btnBlock cardBtn">Tùy chọn</button>
                </div>
              </article>
              <article className="card">
                <div className="cardMedia">
                  <span className="badgeSale">-50%</span>
                  <button type="button" className="wish" aria-label="Thêm vào yêu thích">
                    <svg className="icon" aria-hidden="true">
                      <use href="#iHeart" />
                    </svg>
                  </button>
                  <a href="../ui/productDetail.html" aria-label="Xem Vali nhựa PP dẻo Corsa chịu va đập">
                    <svg className="cardImage" viewBox="0 0 200 240" aria-hidden="true">
                      <use href="#suitcase" style={{fill:"#6B7B4A"}} />
                    </svg>
                  </a>
                  <span className="quickHint">Xem nhanh</span>
                </div>
                <div className="cardBody">
                  <div className="swatches" role="group" aria-label="Chọn màu">
                    <button
                        type="button"
                        className="swatch isActive"
                        style={{background:"#6B7B4A"}}
                        aria-label="Xanh olive"
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
                        style={{background:"#8C949C"}}
                        aria-label="Xám tro"
                    >
                    </button>
                  </div>
                  <h3 className="cardTitle">
                    <a href="../ui/productDetail.html">Vali nhựa PP dẻo Corsa chịu va đập</a>
                  </h3>
                  <span className="stars">
                  <span className="starsTrack" role="img" aria-label="Đánh giá 4,5 trên 5 sao">
                    ★★★★★
                    <span className="starsFill" style={{width:"90%"}} aria-hidden="true">★★★★★</span>
                  </span>
                  <span className="starsCount">(16)</span>
                </span>
                  <p className="price">
                    <strong>839.000₫</strong>
                    <s>1.678.000₫</s>
                  </p>
                  <button type="button" className="btn btnGhost btnBlock cardBtn">Tùy chọn</button>
                </div>
              </article>
              <article className="card">
                <div className="cardMedia">
                  <span className="badgeSale">-40%</span>
                  <button type="button" className="wish" aria-label="Thêm vào yêu thích">
                    <svg className="icon" aria-hidden="true">
                      <use href="#iHeart" />
                    </svg>
                  </button>
                  <a href="../ui/productDetail.html" aria-label="Xem Balo laptop nam Ridge 16 inch da PU chống nước">
                    <svg className="cardImage" viewBox="0 0 200 240" aria-hidden="true">
                      <use href="#backpack" style={{fill:"#6B7B4A"}} />
                    </svg>
                  </a>
                  <span className="quickHint">Xem nhanh</span>
                </div>
                <div className="cardBody">
                  <div className="swatches" role="group" aria-label="Chọn màu">
                    <button
                        type="button"
                        className="swatch isActive"
                        style={{background:"#6B7B4A"}}
                        aria-label="Xanh olive"
                    >
                    </button>
                    <button
                        type="button"
                        className="swatch"
                        style={{background:"#2B3038"}}
                        aria-label="Đen"
                    >
                    </button>
                  </div>
                  <h3 className="cardTitle">
                    <a href="../ui/productDetail.html">Balo laptop nam Ridge 16 inch da PU chống nước</a>
                  </h3>
                  <span className="stars">
                  <span className="starsTrack" role="img" aria-label="Đánh giá 4,5 trên 5 sao">
                    ★★★★★
                    <span className="starsFill" style={{width:"90%"}} aria-hidden="true">★★★★★</span>
                  </span>
                  <span className="starsCount">(12)</span>
                </span>
                  <p className="price">
                    <strong>639.000₫</strong>
                    <s>1.059.000₫</s>
                  </p>
                  <button type="button" className="btn btnGhost btnBlock cardBtn">Thêm vào giỏ</button>
                </div>
              </article>
              <article className="card">
                <div className="cardMedia">
                  <span className="badgeSale">-27%</span>
                  <button type="button" className="wish" aria-label="Thêm vào yêu thích">
                    <svg className="icon" aria-hidden="true">
                      <use href="#iHeart" />
                    </svg>
                  </button>
                  <a href="../ui/productDetail.html" aria-label="Xem Cốp vali mini Pod 14 inch chống thấm">
                    <svg className="cardImage" viewBox="0 0 200 240" aria-hidden="true">
                      <use href="#pouch" style={{fill:"#2B3038"}} />
                    </svg>
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
                        style={{background:"#F2A7B8"}}
                        aria-label="Hồng"
                    >
                    </button>
                  </div>
                  <h3 className="cardTitle">
                    <a href="../ui/productDetail.html">Cốp vali mini Pod 14 inch chống thấm</a>
                  </h3>
                  <span className="stars">
                  <span className="starsTrack" role="img" aria-label="Đánh giá 4,6 trên 5 sao">
                    ★★★★★
                    <span className="starsFill" style={{width:"92%"}} aria-hidden="true">★★★★★</span>
                  </span>
                  <span className="starsCount">(11)</span>
                </span>
                  <p className="price">
                    <strong>269.000₫</strong>
                    <s>369.000₫</s>
                  </p>
                  <button type="button" className="btn btnGhost btnBlock cardBtn">Thêm vào giỏ</button>
                </div>
              </article>
              <article className="card">
                <div className="cardMedia">
                  <span className="badgeSale">-33%</span>
                  <button type="button" className="wish" aria-label="Thêm vào yêu thích">
                    <svg className="icon" aria-hidden="true">
                      <use href="#iHeart" />
                    </svg>
                  </button>
                  <a href="../ui/productDetail.html" aria-label="Xem Vali khóa kéo Zipra Z8 cao cấp">
                    <svg className="cardImage" viewBox="0 0 200 240" aria-hidden="true">
                      <use href="#suitcase" style={{fill:"#F2C230"}} />
                    </svg>
                  </a>
                  <span className="quickHint">Xem nhanh</span>
                </div>
                <div className="cardBody">
                  <div className="swatches" role="group" aria-label="Chọn màu">
                    <button
                        type="button"
                        className="swatch isActive"
                        style={{background:"#F2C230"}}
                        aria-label="Vàng"
                    >
                    </button>
                    <button
                        type="button"
                        className="swatch"
                        style={{background:"#2B3038"}}
                        aria-label="Đen"
                    >
                    </button>
                    <button
                        type="button"
                        className="swatch"
                        style={{background:"#2E9E8F"}}
                        aria-label="Xanh ngọc"
                    >
                    </button>
                  </div>
                  <h3 className="cardTitle">
                    <a href="../ui/productDetail.html">Vali khóa kéo Zipra Z8 cao cấp</a>
                  </h3>
                  <span className="stars">
                  <span className="starsTrack" role="img" aria-label="Đánh giá 4,8 trên 5 sao">
                    ★★★★★
                    <span className="starsFill" style={{width:"96%"}} aria-hidden="true">★★★★★</span>
                  </span>
                  <span className="starsCount">(50)</span>
                </span>
                  <p className="price">
                    <strong>789.000₫</strong>
                    <s>1.178.000₫</s>
                  </p>
                  <button type="button" className="btn btnGhost btnBlock cardBtn">Tùy chọn</button>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="section container" aria-label="Gợi ý theo nhu cầu">
          <div className="tiles">
            <a href="" className="tile tileSky">
            <span className="tileCopy">
              <span className="tileTitle">Vali khung nhôm</span>
              <span className="tileText">Chịu lực tốt, ít móp méo, hợp với người đi nhiều.</span>
              <span className="tileCta">Xem vali khung nhôm</span>
            </span>
              <svg className="tileImage" viewBox="0 0 200 240" aria-hidden="true">
                <use href="#suitcase" style={{fill:"#27466F"}} />
              </svg>
            </a>
            <a href="" className="tile tileStrap">
            <span className="tileCopy">
              <span className="tileTitle">Balo laptop đi làm, đi bay</span>
              <span className="tileText">Ngăn laptop 14 đến 16 inch, vải chống thấm nước.</span>
              <span className="tileCta">Xem balo</span>
            </span>
              <svg className="tileImage" viewBox="0 0 200 240" aria-hidden="true">
                <use href="#backpack" style={{fill:"#12263A"}} />
              </svg>
            </a>
          </div>
        </section>
        <section className="section container" aria-labelledby="newsTitle">
          <div className="sectionHead">
            <div>
              <h2 id="newsTitle" className="sectionTitle">Cẩm nang và tin mới</h2>
              <p className="sectionSub">Mẹo chọn vali, xếp đồ và các chương trình khuyến mại gần đây.</p>
            </div>
            <a href="#" className="textLink">Xem tất cả bài viết</a>
          </div>
          <div className="newsGrid">
            <article className="newsCard">
              <a
                  href="#"
                  className="newsThumb"
                  style={{background:"#E3ECF6"}}
                  aria-hidden="true"
                  tabIndex={-1}
              >
                <svg className="newsImage" viewBox="0 0 200 240" aria-hidden="true">
                  <use href="#suitcase" style={{fill:"#27466F"}} />
                </svg>
              </a>
              <p className="newsMeta">
                <span className="newsTag">Cẩm nang</span>
                <time>28/10/2026</time>
              </p>
              <h3 className="newsTitle">
                <a href="#">Chọn size vali theo số ngày đi: bảng gợi ý nhanh</a>
              </h3>
              <p className="newsExcerpt">
                Đi 3 ngày hay 10 ngày thì nên mang size nào? Gợi ý theo số ngày, cân nặng hành lý và loại vé máy bay.
              </p>
            </article>
            <article className="newsCard">
              <a
                  href="#"
                  className="newsThumb"
                  style={{background:"#FCEBDD"}}
                  aria-hidden="true"
                  tabIndex={-1}
              >
                <svg className="newsImage" viewBox="0 0 200 240" aria-hidden="true">
                  <use href="#suitcase" style={{fill:"#F2823A"}} />
                </svg>
              </a>
              <p className="newsMeta">
                <span className="newsTag">Review</span>
                <time>15/10/2026</time>
              </p>
              <h3 className="newsTitle">
                <a href="#">Vali nhựa PC và PP khác nhau thế nào?</a>
              </h3>
              <p className="newsExcerpt">
                So sánh độ bền, trọng lượng và giá để chọn đúng chất liệu cho kiểu chuyến đi của bạn.
              </p>
            </article>
            <article className="newsCard">
              <a
                  href="#"
                  className="newsThumb"
                  style={{background:"#DDF3EF"}}
                  aria-hidden="true"
                  tabIndex={-1}
              >
                <svg className="newsImage" viewBox="0 0 200 240" aria-hidden="true">
                  <use href="#pouch" style={{fill:"#2E9E8F"}} />
                </svg>
              </a>
              <p className="newsMeta">
                <span className="newsTag">Mẹo du lịch</span>
                <time>02/10/2026</time>
              </p>
              <h3 className="newsTitle">
                <a href="#">Mẹo xếp đồ gọn trong vali xách tay</a>
              </h3>
              <p className="newsExcerpt">
                Cuộn hay gấp, giày đặt ở đâu, đồ ướt để lớp nào: vài mẹo nhỏ giúp bạn dư thêm một ngăn.
              </p>
            </article>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  )
}

export default App
