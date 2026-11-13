import PageHeader from "../components/Page-Header.tsx";
import PageFooter from "../components/Page-Footer.tsx";
import ProductList from "../components/Product-List.tsx";
import FlashSaleList from "../components/index/FlashSale-ProductList.tsx";

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
                  <img className="stubImage" src={"https://plus.unsplash.com/premium_photo-1684407616508-b9e82c8bc8a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"}
                  alt={"Vali Khung Nhôm Cao Cấp Horizon Titan"} />
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
                <span className="rangeValue">5 </span>
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
              <img style={{width: "100%"}} alt=""
                  src={"https://images.unsplash.com/photo-1639598003276-8a70fcaaad6c?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"} />
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
            <FlashSaleList />
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
              <img className="tileImage" alt=""
                   src={"https://images.unsplash.com/photo-1740470077240-e0ff892c21a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"}
                   aria-hidden="true">
              </img>
            </a>
            <a href="" className="tile tileStrap">
            <span className="tileCopy">
              <span className="tileTitle">Balo laptop đi làm, đi bay</span>
              <span className="tileText">Ngăn laptop 14 đến 16 inch, vải chống thấm nước.</span>
              <span className="tileCta">Xem balo</span>
            </span>
              <img className="tileImage" alt=""
                   src={"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800"}
                   aria-hidden="true">
              </img>
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
                <img className="newsImage" src={"https://images.unsplash.com/photo-1639598003276-8a70fcaaad6c?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"}
                     aria-hidden="true" alt={""} style={{width: "85%"}}>
                </img>
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
                <img className="newsImage" src={"https://plus.unsplash.com/premium_photo-1764227288000-73fdff1fa852?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"}
                     aria-hidden="true" alt={""} style={{width: "85%"}}>
                </img>
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
                <img className="newsImage" src={"https://images.unsplash.com/photo-1522199710521-72d69614c702?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"}
                     aria-hidden="true" alt={""} style={{width: "85%"}}>
                </img>
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
