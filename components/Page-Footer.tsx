import {Link} from "react-router-dom";

export default function PageFooter() {
    return (<>
        <section className="newsletter" aria-labelledby="newsletterTitle">
            <div className="container newsletterInner">
                <div>
                    <h2 id="newsletterTitle" className="sectionTitle">Nhận mã giảm 10% cho đơn đầu tiên</h2>
                    <p className="sectionSub">
                        Chúng tôi chỉ gửi thông tin khuyến mại và mẹo du lịch, mỗi tuần tối đa một thư.
                    </p>
                </div>
                <form className="newsletterForm" action="#">
                    <div className="newsletterRow">
                        <label className="visuallyHidden" htmlFor="newsletterEmail">Email của bạn</label>
                        <input
                            id="newsletterEmail"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            placeholder="Email của bạn"
                        />
                            <button type="submit" className="btn btnDark">Đăng ký</button>
                    </div>
                </form>
            </div>
        </section>
        <footer className="footer">
            <div className="container footerGrid">
                <div className="footerBrand">
                    <p className="footerLogo">Valigo</p>
                    <p>Vali &amp; phụ kiện du lịch.</p>
                    <ul className="footerContact">
                        <li>
                            <svg className="icon" aria-hidden="true">
                                <use href="#iStore" />
                            </svg>
                            123 Đường Mẫu, Quận 1, TP. Hồ Chí Minh
                        </li>
                        <li>
                            <svg className="icon" aria-hidden="true">
                                <use href="#iPhone" />
                            </svg>
                            <a href="tel:0900000000">0900 000 000</a>
                        </li>
                        <li>
                            <svg className="icon" aria-hidden="true">
                                <use href="#iMail" />
                            </svg>
                            <a href="mailto:cskh@valigo.vn">cskh@valigo.vn</a>
                        </li>
                        <li>
                            <svg className="icon" aria-hidden="true">
                                <use href="#iClock" />
                            </svg>
                            8:00 – 21:00 mỗi ngày
                        </li>
                    </ul>
                </div>
                <nav aria-label="Hỗ trợ khách hàng">
                    <h2 className="footerTitle">Hỗ trợ khách hàng</h2>
                    <ul>
                        <li>
                            <Link to="/">Trang chủ</Link>
                        </li>
                        <li>
                            <a href="../ui/about.html">Giới thiệu</a>
                        </li>
                        <li>
                            <Link to="/products">Tất cả sản phẩm</Link>
                        </li>
                        <li>
                            <Link to="/news">Tin tức</Link>
                        </li>
                        <li>
                            <a href="../ui/stores.html">Hệ thống cửa hàng</a>
                        </li>
                        <li>
                            <a href="../ui/orderHistory.html">Lịch sử đơn hàng</a>
                        </li>
                    </ul>
                </nav>
                <nav aria-label="Chính sách">
                    <h2 className="footerTitle">Chính sách</h2>
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
                            <Link to="/privacyPolicy">Chính sách bảo mật</Link>
                        </li>
                    </ul>
                </nav>
                <div>
                    <h2 className="footerTitle">Thanh toán</h2>
                    <ul className="payList">
                        <li>COD</li>
                        <li>Thẻ ATM</li>
                        <li>Visa / Mastercard</li>
                        <li>Ví điện tử</li>
                        <li>Chuyển khoản</li>
                    </ul>
                    <h2 className="footerTitle footerTitleGap">Kết nối</h2>
                    <ul className="socialList">
                        <li>
                            <Link to="">Facebook</Link>
                        </li>
                        <li>
                            <Link to="">YouTube</Link>
                        </li>
                        <li>
                            <Link to="">TikTok</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footerBottom">
                <div className="container">© 2026 Valigo.</div>
            </div>
        </footer>
    </>);
}