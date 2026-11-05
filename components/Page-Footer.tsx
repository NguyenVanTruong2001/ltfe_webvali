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
                            <a href="index.html">Trang chủ</a>
                        </li>
                        <li>
                            <a href="../ui/about.html">Giới thiệu</a>
                        </li>
                        <li>
                            <a href="../ui/productList.html">Tất cả sản phẩm</a>
                        </li>
                        <li>
                            <a href="../ui/news.html">Tin tức</a>
                        </li>
                        <li>
                            <a href="../ui/stores.html">Hệ thống cửa hàng</a>
                        </li>
                    </ul>
                </nav>
                <nav aria-label="Chính sách">
                    <h2 className="footerTitle">Chính sách</h2>
                    <ul>
                        <li>
                            <a href="../ui/shippingPolicy.html">Chính sách vận chuyển</a>
                        </li>
                        <li>
                            <a href="../ui/warrantyPolicy.html">Chính sách bảo hành</a>
                        </li>
                        <li>
                            <a href="../ui/returnPolicy.html">Chính sách đổi trả</a>
                        </li>
                        <li>
                            <a href="../ui/paymentPolicy.html">Chính sách thanh toán</a>
                        </li>
                        <li>
                            <a href="../ui/privacyPolicy.html">Chính sách bảo mật</a>
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
                            <a href="#">Facebook</a>
                        </li>
                        <li>
                            <a href="#">YouTube</a>
                        </li>
                        <li>
                            <a href="#">TikTok</a>
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