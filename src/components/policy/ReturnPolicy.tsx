import PageHeader from "../Page-Header";
import PageFooter from "../Page-Footer";
import {Link} from "react-router";

export default function ReturnPolicy() {
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
                                    <Link to="/returnPolicy" aria-current="page">Chính sách đổi trả</Link>
                                </li>
                                <li>
                                    <Link to="/paymentPolicy">Chính sách thanh toán</Link>
                                </li>
                                <li>
                                    <Link to="/privacyPolicy">Chính sách bảo mật</Link>
                                </li>
                            </ul>
                        </aside>
                        <article className="policyBody">
                            <section className="policySection">
                                <h2>Điều kiện đổi trả</h2>
                                <ul>
                                    <li>Sản phẩm bị lỗi do nhà sản xuất hoặc giao sai mẫu, sai màu, sai size.</li>
                                    <li>Sản phẩm còn nguyên tem, mác, phụ kiện và chưa qua sử dụng.</li>
                                    <li>Có hóa đơn hoặc mã đơn hàng.</li>
                                </ul>
                            </section>
                            <section className="policySection">
                                <h2>Trường hợp không áp dụng đổi trả</h2>
                                <ul>
                                    <li>Sản phẩm đã sử dụng, trầy xước hoặc dơ bẩn.</li>
                                    <li>Sản phẩm giảm giá đặc biệt đã được thông báo không đổi trả.</li>
                                    <li>Quá 7 ngày kể từ ngày nhận hàng.</li>
                                </ul>
                            </section>
                            <section className="policySection">
                                <h2>Quy trình đổi trả</h2>
                                <ol>
                                    <li>Liên hệ Valigo qua hotline hoặc email, gửi hình ảnh sản phẩm và mã đơn hàng.</li>
                                    <li>Nhân viên xác nhận yêu cầu và hướng dẫn cách gửi sản phẩm về.</li>
                                    <li>Valigo đổi sản phẩm mới hoặc hoàn tiền sau khi nhận và kiểm tra hàng.</li>
                                </ol>
                            </section>
                            <section className="policySection">
                                <h2>Phí và thời gian hoàn tiền</h2>
                                <p>Valigo chịu phí vận chuyển hai chiều với sản phẩm lỗi do nhà sản xuất. Tiền được hoàn trong vòng 5 đến 7 ngày làm việc, theo đúng hình thức bạn đã thanh toán.</p>
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