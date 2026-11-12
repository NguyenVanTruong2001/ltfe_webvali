import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import {Link} from "react-router-dom";

export default function News() {
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
                            <li aria-current="page">Tin tức</li>
                        </ol>
                    </nav>
                    <div className="checkoutHead">
                        <h1 className="checkoutTitle">Tin tức</h1>
                        <p className="newsIntro">Mẹo chọn vali, kinh nghiệm du lịch và đánh giá sản phẩm từ đội ngũ Valigo.</p>
                    </div>
                    <div className="newsTabs" role="group" aria-label="Chủ đề bài viết">
                        <button type="button" className="newsTab isActive" data-topic="all" aria-pressed="true">
                            Tất cả
                        </button>
                        <button type="button" className="newsTab" data-topic="size" aria-pressed="false">
                            Chọn size vali
                        </button>
                        <button type="button" className="newsTab" data-topic="guide" aria-pressed="false">
                            Cẩm nang du lịch
                        </button>
                        <button type="button" className="newsTab" data-topic="review" aria-pressed="false">
                            Review sản phẩm
                        </button>
                    </div>
                    <ul className="newsList" id="newsList">
                        <li className="newsCard" data-topic="size">
                            <p className="newsTopic">Chọn size vali</p>
                            <h2 className="newsTitle">Vali size 20, 24 hay 28: chọn thế nào cho đúng chuyến đi</h2>
                            <p className="newsExcerpt">Cách tính dung tích theo số ngày đi, hãng bay cho phép xách tay bao nhiêu ký và khi nào nên ký gửi.</p>
                            <p className="newsMeta">01/11/2026 · 6 phút đọc</p>
                        </li>
                        <li className="newsCard" data-topic="guide">
                            <p className="newsTopic">Cẩm nang du lịch</p>
                            <h2 className="newsTitle">Checklist xếp vali cho chuyến đi 5 ngày 4 đêm</h2>
                            <p className="newsExcerpt">Danh sách đồ cần mang, cách xếp gọn để tiết kiệm chỗ và tránh quá cân khi làm thủ tục bay.</p>
                            <p className="newsMeta">28/10/2026 · 5 phút đọc</p>
                        </li>
                        <li className="newsCard" data-topic="review">
                            <p className="newsTopic">Review sản phẩm</p>
                            <h2 className="newsTitle">Đánh giá vali khung nhôm Atlas A9 sau 3 tháng sử dụng</h2>
                            <p className="newsExcerpt">Độ bền khung, bánh xe và khóa số sau nhiều chuyến bay, kèm ưu nhược điểm thực tế.</p>
                            <p className="newsMeta">24/10/2026 · 7 phút đọc</p>
                        </li>
                        <li className="newsCard" data-topic="size">
                            <p className="newsTopic">Chọn size vali</p>
                            <h2 className="newsTitle">Vali nhựa PC và PP khác nhau thế nào</h2>
                            <p className="newsExcerpt">So sánh độ bền, trọng lượng và giá để bạn chọn chất liệu phù hợp nhu cầu.</p>
                            <p className="newsMeta">20/10/2026 · 4 phút đọc</p>
                        </li>
                        <li className="newsCard" data-topic="guide">
                            <p className="newsTopic">Cẩm nang du lịch</p>
                            <h2 className="newsTitle">Bảo quản vali đúng cách để dùng bền hơn</h2>
                            <p className="newsExcerpt">Vệ sinh, cất giữ và xử lý khi bánh xe kẹt hoặc khóa số bị lỗi.</p>
                            <p className="newsMeta">15/10/2026 · 4 phút đọc</p>
                        </li>
                        <li className="newsCard" data-topic="review">
                            <p className="newsTopic">Review sản phẩm</p>
                            <h2 className="newsTitle">Balo laptop Dune 14 inch có đáng mua cho dân văn phòng</h2>
                            <p className="newsExcerpt">Ngăn chống sốc, độ thoáng lưng và khả năng chống nước qua một tuần đi làm.</p>
                            <p className="newsMeta">09/10/2026 · 5 phút đọc</p>
                        </li>
                    </ul>
                    <p id="newsEmpty" className="newsEmpty" hidden>Chưa có bài viết trong chủ đề này.</p>
                </div>
            </main>
            <PageFooter />
        </>
    );
}