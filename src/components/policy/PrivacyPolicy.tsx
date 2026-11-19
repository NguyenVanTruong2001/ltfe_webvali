import PageHeader from "../Page-Header";
import PageFooter from "../Page-Footer";
import {Link} from "react-router-dom";

export default function PrivacyPolicy() {
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
                            <li aria-current="page">Chính sách bảo hành</li>
                        </ol>
                    </nav>
                    <div className="checkoutHead">
                        <h1 className="checkoutTitle">Chính sách bảo hành</h1>
                        <p className="policyIntro">Mọi sản phẩm chính hãng của Valigo được bảo hành 24 tháng trên toàn quốc, tính từ ngày nhận hàng.</p>
                    </div>
                    <div className="policyLayout">
                        <aside className="policyNav">
                            <p className="policyNavTitle">Chính sách</p>
                            <ul>
                                <li>
                                    <Link to="/shippingPolicy">Chính sách vận chuyển</Link>
                                </li>
                                <li>
                                    <Link to="/warrantyPolicy">Chính sách bảo hành</Link>
                                </li>
                                <li>
                                    <Link to="/returnPolicy">Chính sách đổi trả</Link>
                                </li>
                                <li>
                                    <Link to="/paymentPolicy">Chính sách thanh toán</Link>
                                </li>
                                <li>
                                    <Link to="/privacyPolicy" aria-current="page">Chính sách bảo mật</Link>
                                </li>
                            </ul>
                        </aside>
                        <article className="policyBody">
                            <section className="policySection">
                                <h2>Thông tin chúng tôi thu thập</h2>
                                <ul>
                                    <li>Họ tên, số điện thoại, email và địa chỉ giao hàng khi bạn đặt hàng.</li>
                                    <li>Lịch sử mua hàng và sản phẩm bạn quan tâm.</li>
                                    <li>Thông tin kỹ thuật cơ bản như loại trình duyệt và thiết bị truy cập.</li>
                                </ul>
                            </section>
                            <section className="policySection">
                                <h2>Mục đích sử dụng</h2>
                                <ul>
                                    <li>Xử lý đơn hàng, giao hàng và chăm sóc sau bán.</li>
                                    <li>Gửi thông tin khuyến mại nếu bạn đã đăng ký nhận tin.</li>
                                    <li>Cải thiện website và dịch vụ của Valigo.</li>
                                </ul>
                            </section>
                            <section className="policySection">
                                <h2>Chia sẻ thông tin</h2>
                                <p>Valigo chỉ chia sẻ thông tin cần thiết với đơn vị vận chuyển và cổng thanh toán để hoàn tất đơn hàng. Chúng tôi không bán thông tin cá nhân cho bên thứ ba.</p>
                            </section>
                            <section className="policySection">
                                <h2>Quyền của bạn</h2>
                                <p>Bạn có thể yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân, và hủy nhận email khuyến mại bất cứ lúc nào bằng cách gửi email đến cskh@valigo.vn.</p>
                            </section>
                            <p className="policyContact">
                                Cần hỗ trợ thêm? Gọi <a href="" className="textLink">0900 000 000</a> hoặc email <a href="" className="textLink">cskh@valigo.vn</a>.
                            </p>
                        </article>
                    </div>
                </div>
            </main>
            <PageFooter />
        </>
    )
}