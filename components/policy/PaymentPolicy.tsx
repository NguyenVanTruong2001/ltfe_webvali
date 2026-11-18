import PageHeader from "../Page-Header";
import PageFooter from "../Page-Footer";
import {Link} from "react-router-dom";

export default function PaymentPolicy() {
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
                                    <Link to="/paymentPolicy" aria-current="page">Chính sách thanh toán</Link>
                                </li>
                                <li>
                                    <Link to="/privacyPolicy">Chính sách bảo mật</Link>
                                </li>
                            </ul>
                        </aside>
                        <article className="policyBody">
                            <section className="policySection">
                                <h2>Hình thức thanh toán</h2>
                                <ul>
                                    <li>Thanh toán khi nhận hàng (COD): kiểm tra hàng rồi mới thanh toán.</li>
                                    <li>Chuyển khoản ngân hàng: thông tin tài khoản được gửi sau khi đặt hàng.</li>
                                    <li>Thẻ ATM nội địa, Visa hoặc Mastercard: thanh toán trực tuyến qua cổng bảo mật.</li>
                                    <li>Ví điện tử: quét mã để thanh toán trên điện thoại.</li>
                                </ul>
                            </section>
                            <section className="policySection">
                                <h2>Xác nhận thanh toán</h2>
                                <p>Với chuyển khoản, đơn hàng được xử lý sau khi Valigo nhận được tiền. Bạn nên ghi mã đơn hàng vào nội dung chuyển khoản để được xác nhận nhanh hơn.</p>
                            </section>
                            <section className="policySection">
                                <h2>Bảo mật thông tin thanh toán</h2>
                                <p>Valigo không lưu số thẻ của bạn. Giao dịch thẻ và ví điện tử được xử lý bởi cổng thanh toán đối tác đạt chuẩn bảo mật quốc tế.</p>
                            </section>
                            <section className="policySection">
                                <h2>Hoàn tiền</h2>
                                <p>Khi đơn hàng bị hủy hoặc đổi trả đủ điều kiện, tiền được hoàn về đúng hình thức đã thanh toán trong vòng 5 đến 7 ngày làm việc.</p>
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