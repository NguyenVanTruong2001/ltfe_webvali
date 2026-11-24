import PageHeader from "../Page-Header";
import PageFooter from "../Page-Footer";
import {Link} from "react-router";

export default function ShippingPolicy() {
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
                            <li aria-current="page">Chính sách vận chuyển</li>
                        </ol>
                    </nav>
                    <div className="checkoutHead">
                        <h1 className="checkoutTitle">Chính sách vận chuyển</h1>
                        <p className="policyIntro">Valigo giao hàng toàn quốc. Trang này giải thích thời gian nhận hàng, phí vận chuyển và cách kiểm tra hàng khi nhận.</p>
                    </div>
                    <div className="policyLayout">
                        <aside className="policyNav">
                            <p className="policyNavTitle">Chính sách</p>
                            <ul>
                                <li>
                                    <Link to="/shippingPolicy" aria-current="page">Chính sách vận chuyển</Link>
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
                                    <Link to="/privacyPolicy">Chính sách bảo mật</Link>
                                </li>
                            </ul>
                        </aside>
                        <article className="policyBody">
                            <section className="policySection">
                                <h2>Phạm vi giao hàng</h2>
                                <p>Valigo giao hàng đến tất cả tỉnh, thành phố trong cả nước. Với khu vực hải đảo hoặc vùng xa, thời gian giao có thể lâu hơn và nhân viên sẽ báo trước khi xác nhận đơn.</p>
                            </section>
                            <section className="policySection">
                                <h2>Các hình thức giao hàng</h2>
                                <p>Thời gian được tính từ lúc đơn hàng được xác nhận, không tính Chủ nhật và ngày lễ.</p>
                                <ul>
                                    <li>Giao tiêu chuẩn: nhận hàng sau 2 đến 4 ngày, miễn phí vận chuyển.</li>
                                    <li>Giao nhanh: nhận hàng sau 1 đến 2 ngày, phí 30.000₫ mỗi đơn.</li>
                                </ul>
                            </section>
                            <section className="policySection">
                                <h2>Kiểm tra hàng khi nhận</h2>
                                <p>Bạn được kiểm tra bên ngoài kiện hàng trước khi thanh toán. Nếu thấy hàng sai mẫu, sai màu hoặc móp méo do vận chuyển, hãy từ chối nhận và liên hệ Valigo ngay để được xử lý.</p>
                            </section>
                            <section className="policySection">
                                <h2>Khi giao hàng không thành công</h2>
                                <p>Đơn vị vận chuyển sẽ liên hệ tối đa 3 lần. Nếu không liên lạc được, đơn hàng được hoàn về kho và nhân viên Valigo sẽ gọi lại để sắp xếp lần giao khác.</p>
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