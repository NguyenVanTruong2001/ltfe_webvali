import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import {Link} from "react-router-dom";

export default function Register() {
    return (
        <>
            <PageHeader />
            <main id="noiDung" className="auth">
                <div className="container">
                    <nav className="crumbs" aria-label="Đường dẫn">
                        <Link to="/">Trang chủ</Link>
                        <span aria-hidden="true">/</span>
                        <span aria-current="page">Đăng ký</span>
                    </nav>

                    <div className="authTicket">
                        <section className="authMain" aria-labelledby="registerTitle">
                            <h1 id="registerTitle" className="authTitle">Tạo tài khoản</h1>
                            <p className="authSub">Chỉ mất một phút để bắt đầu mua sắm và nhận ưu đãi thành viên.</p>

                            <form id="registerForm" className="form" action="#" noValidate>
                                <p id="formStatus" className="formStatus" role="status" aria-live="polite" hidden></p>

                                <div className="field">
                                    <label className="fieldLabel" htmlFor="fullName">Họ và tên</label>
                                    <input id="fullName" name="fullName" className="input" type="text" autoComplete="name" placeholder="Nguyễn Văn A" aria-describedby="fullNameError" required />
                                        <p id="fullNameError" className="fieldError" hidden>
                                            <svg className="icon iconSm" aria-hidden="true"><use href="#iAlert" /></svg>
                                            <span></span>
                                        </p>
                                </div>

                                <div className="fieldRow">
                                    <div className="field">
                                        <label className="fieldLabel" htmlFor="regEmail">Email</label>
                                        <input id="regEmail" name="email" className="input" type="email" autoComplete="email" placeholder="vidu@email.com" aria-describedby="regEmailError" inputMode="email" required />
                                            <p id="regEmailError" className="fieldError" hidden>
                                                <svg className="icon iconSm" aria-hidden="true"><use href="#iAlert" /></svg>
                                                <span></span>
                                            </p>
                                    </div>
                                    <div className="field">
                                        <label className="fieldLabel" htmlFor="regPhone">Số điện thoại</label>
                                        <input id="regPhone" name="phone" className="input" type="tel" autoComplete="tel" placeholder="0912 345 678" aria-describedby="regPhoneError" inputMode="tel" required />
                                            <p id="regPhoneError" className="fieldError" hidden>
                                                <svg className="icon iconSm" aria-hidden="true"><use href="#iAlert" /></svg>
                                                <span></span>
                                            </p>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="fieldLabel" htmlFor="regPassword">Mật khẩu</label>
                                    <div className="inputWrap">
                                        <input id="regPassword" name="password" className="input" type="password" autoComplete="new-password" placeholder="Tạo mật khẩu" aria-describedby="regPasswordError" required />
                                            <button type="button" className="eyeBtn" aria-controls="regPassword" aria-pressed="false" aria-label="Hiện mật khẩu">
                                                <svg className="icon eyeOn" aria-hidden="true"><use href="#iEye" /></svg>
                                                <svg className="icon eyeOff" aria-hidden="true"><use href="#iEyeOff" /></svg>
                                            </button>
                                    </div>
                                    <div className="strength" id="strength" data-level="0" aria-live="polite">
                                        <span className="strengthBar"><i></i><i></i><i></i><i></i></span>
                                        <span className="strengthText" id="strengthText">Tối thiểu 8 ký tự, gồm chữ và số.</span>
                                    </div>
                                    <p id="regPasswordError" className="fieldError" hidden>
                                        <svg className="icon iconSm" aria-hidden="true"><use href="#iAlert" /></svg>
                                        <span></span>
                                    </p>
                                </div>

                                <div className="field">
                                    <label className="fieldLabel" htmlFor="regConfirm">Nhập lại mật khẩu</label>
                                    <div className="inputWrap">
                                        <input id="regConfirm" name="confirm" className="input" type="password" autoComplete="new-password" placeholder="Nhập lại mật khẩu" aria-describedby="regConfirmError" required />
                                            <button type="button" className="eyeBtn" aria-controls="regConfirm" aria-pressed="false" aria-label="Hiện mật khẩu">
                                                <svg className="icon eyeOn" aria-hidden="true"><use href="#iEye" /></svg>
                                                <svg className="icon eyeOff" aria-hidden="true"><use href="#iEyeOff" /></svg>
                                            </button>
                                    </div>
                                    <p id="regConfirmError" className="fieldError" hidden>
                                        <svg className="icon iconSm" aria-hidden="true"><use href="#iAlert" /></svg>
                                        <span></span>
                                    </p>
                                </div>

                                <div className="field">
                                    <label className="check">
                                        <input type="checkbox" id="regTerms" name="terms" className="checkInput" aria-describedby="regTermsError" />
                                            <span className="checkBox" aria-hidden="true"><svg className="icon iconSm"><use href="#iCheck" /></svg></span>
                                            <span>Tôi đồng ý với <a href="" className="textLink">Điều khoản sử dụng</a> và <a href="" className="textLink">Chính sách bảo mật</a></span>
                                    </label>
                                    <p id="regTermsError" className="fieldError" hidden>
                                        <svg className="icon iconSm" aria-hidden="true"><use href="#iAlert" /></svg>
                                        <span></span>
                                    </p>
                                </div>

                                <button type="submit" className="btn btnPrimary btnBlock submitBtn">Tạo tài khoản</button>
                            </form>

                            <div className="divider" role="separator">
                                <span>hoặc đăng ký bằng</span>
                            </div>

                            <div className="socialBtns">
                                <button type="button" className="btn btnGhost">Google</button>
                                <button type="button" className="btn btnGhost">Facebook</button>
                            </div>

                            <p className="switchText">
                                Đã có tài khoản?
                                <Link to="/login" className="textLink">Đăng nhập</Link>
                            </p>
                        </section>

                        <aside className="authStub" aria-label="Ưu đãi thành viên mới">
                            <svg viewBox="0 0 40 40" width="200" height="200" aria-hidden="true">
                                <path
                                    d="M15 11V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3"
                                    fill="none"
                                    stroke="#12263A"
                                    strokeWidth="2.6"
                                    strokeLinecap="round"
                                />
                                <rect x="6" y="11" width="28" height="22" rx="6" fill="#12263A" />
                                <path
                                    d="M14 15v14M20 15v14M26 15v14"
                                    stroke="#3B5876"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <rect x="22" y="22" width="14" height="9" rx="2.5" fill="#FFC400" />
                            </svg>
                            <h2 className="stubTitle">Chào mừng thành viên mới</h2>
                            <ul className="perks">
                                <li><svg className="icon" aria-hidden="true"><use href="#iTruck" /></svg>Miễn phí vận chuyển đơn từ 500.000đ</li>
                                <li><svg className="icon" aria-hidden="true"><use href="#iShield" /></svg>Bảo hành điện tử, tra cứu nhanh</li>
                                <li><svg className="icon" aria-hidden="true"><use href="#iHeart" /></svg>Lưu sản phẩm yêu thích</li>
                            </ul>
                            <p className="stubCoupon">
                                <span>Đơn đầu tiên</span>
                                <strong>ATLAS10</strong>
                                <span>Giảm 10%</span>
                            </p>
                        </aside>
                    </div>
                </div>
            </main>
            <PageFooter />
        </>
    )
}