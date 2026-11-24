import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import {Link} from "react-router";

export default function AboutUs() {
    return (
        <>
            <PageHeader />
            <main id="noiDung">
                <div className="container">
                    <nav className="breadcrumb" aria-label="Đường dẫn">
                        <ol>
                            <li>
                                <Link to="/">Trang chủ</Link>
                            </li>
                            <li aria-current="page">Về chúng tôi</li>
                        </ol>
                    </nav>
                    <section className="aboutHero" aria-labelledby="aboutTitle">
                        <h1 id="aboutTitle" className="aboutTitle">Đồng hành cùng mọi chuyến đi</h1>
                        <p className="aboutLead">
                            Valigo là thương hiệu vali và phụ kiện du lịch dành cho người Việt.
                            Chúng tôi làm ra những chiếc vali bền, nhẹ và dễ dùng, để bạn chỉ cần nghĩ đến điểm đến.
                        </p>
                    </section>
                    <ul className="aboutStats" aria-label="Valigo qua các con số">
                        <li>
                            <strong>2018</strong>
                            <span>Năm thành lập</span>
                        </li>
                        <li>
                            <strong>7</strong>
                            <span>Cửa hàng trên toàn quốc</span>
                        </li>
                        <li>
                            <strong>200.000+</strong>
                            <span>Khách hàng tin dùng</span>
                        </li>
                        <li>
                            <strong>24 tháng</strong>
                            <span>Bảo hành toàn quốc</span>
                        </li>
                    </ul>
                    <section className="aboutStory" aria-labelledby="storyTitle">
                        <h2 id="storyTitle" className="aboutHeading">Câu chuyện của Valigo</h2>
                        <div className="aboutText">
                            <p>
                                Valigo bắt đầu từ một cửa hàng nhỏ ở TP. Hồ Chí Minh, với câu hỏi đơn giản:
                                vì sao một chiếc vali tốt lại khó chọn đến thế? Mỗi chuyến đi đều cần size phù hợp,
                                bánh xe êm và khóa chắc chắn, nhưng khách hàng thường phải đoán.
                            </p>
                            <p>
                                Từ đó, chúng tôi thiết kế từng dòng sản phẩm theo nhu cầu thật: vali xách tay gọn cho chuyến đi ngắn,
                                vali ký gửi rộng cho kỳ nghỉ dài, balo laptop cho người đi làm. Mỗi mẫu đều được thử độ bền
                                trước khi đến tay khách hàng.
                            </p>
                        </div>
                    </section>
                    <section className="aboutValues" aria-labelledby="valuesTitle">
                        <h2 id="valuesTitle" className="aboutHeading">Cam kết của chúng tôi</h2>
                        <ul className="valueList">
                            <li className="valueCard">
                                <svg className="icon iconLg" aria-hidden="true">
                                    <use href="#iShield" />
                                </svg>
                                <h3>Chất lượng bền bỉ</h3>
                                <p>Vật liệu được chọn lọc, kiểm tra kỹ và bảo hành 24 tháng trên toàn quốc.</p>
                            </li>
                            <li className="valueCard">
                                <svg className="icon iconLg" aria-hidden="true">
                                    <use href="#iTruck" />
                                </svg>
                                <h3>Giao hàng nhanh</h3>
                                <p>Giao tiêu chuẩn miễn phí, nhận hàng sau 2 đến 4 ngày trên toàn quốc.</p>
                            </li>
                            <li className="valueCard">
                                <svg className="icon iconLg" aria-hidden="true">
                                    <use href="#iRefresh" />
                                </svg>
                                <h3>Đổi trả dễ dàng</h3>
                                <p>Đổi trả trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất, không cần giải thích dài dòng.</p>
                            </li>
                            <li className="valueCard">
                                <svg className="icon iconLg" aria-hidden="true">
                                    <use href="#iHeadset" />
                                </svg>
                                <h3>Tư vấn tận tâm</h3>
                                <p>Nhân viên giúp bạn chọn đúng size, đúng mẫu theo chuyến đi và ngân sách.</p>
                            </li>
                        </ul>
                    </section>
                    <section className="aboutCta" aria-labelledby="ctaTitle">
                        <h2 id="ctaTitle" className="aboutHeading">Ghé thăm Valigo</h2>
                        <p>Xem và thử sản phẩm trực tiếp tại cửa hàng, hoặc chọn mua ngay trên website.</p>
                        <div className="aboutActions">
                            <Link to="/products" className="btn btnPrimary">Xem sản phẩm</Link>
                            <Link to="/stores" className="btn btnGhost">Tìm cửa hàng</Link>
                        </div>
                    </section>
                </div>
            </main>
            <PageFooter />
        </>
    )
}