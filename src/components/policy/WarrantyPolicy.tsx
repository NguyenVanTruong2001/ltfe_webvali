import PageHeader from "../Page-Header";
import PageFooter from "../Page-Footer";
import {Link} from "react-router";

export default function WarrantyPolicy() {
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
                                    <Link to="/warrantyPolicy" aria-current="page">Chính sách bảo hành</Link>
                                </li>
                                <li>
                                    <Link to="/returnPolicy">Chính sách đổi trả</Link>
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
                                <h2>Phạm vi bảo hành</h2>
                                <ul>
                                    <li>Lỗi khung vali, bánh xe, tay kéo, khóa số và khóa kéo do nhà sản xuất.</li>
                                    <li>Lỗi đường may, quai đeo và khóa kéo của balo do nhà sản xuất.</li>
                                </ul>
                            </section>
                            <section className="policySection">
                                <h2>Không thuộc phạm vi bảo hành</h2>
                                <ul>
                                    <li>Hư hỏng do va đập mạnh, quá tải hoặc sử dụng sai mục đích.</li>
                                    <li>Trầy xước, bám bẩn, phai màu trong quá trình sử dụng bình thường.</li>
                                    <li>Sản phẩm đã bị sửa chữa hoặc can thiệp bởi đơn vị không phải Valigo.</li>
                                </ul>
                            </section>
                            <section className="policySection">
                                <h2>Cách yêu cầu bảo hành</h2>
                                <ol>
                                    <li>Liên hệ hotline 0900 000 000 hoặc email cskh@valigo.vn, cung cấp mã đơn hàng và hình ảnh lỗi.</li>
                                    <li>Mang sản phẩm đến cửa hàng Valigo gần nhất hoặc gửi theo hướng dẫn của nhân viên.</li>
                                    <li>Valigo kiểm tra, sửa chữa hoặc đổi linh kiện trong vòng 7 đến 15 ngày làm việc.</li>
                                </ol>
                            </section>
                            <section className="policySection">
                                <h2>Trường hợp không sửa được</h2>
                                <p>Nếu sản phẩm không thể sửa chữa, Valigo sẽ đổi sản phẩm tương đương hoặc hoàn tiền theo giá trị còn lại của sản phẩm.</p>
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