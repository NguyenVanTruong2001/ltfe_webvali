import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import {Link} from "react-router-dom";

export default function LogIn() {
    return (
        <>
            <PageHeader />
            <main id="noiDung" className="auth">
                <div className="container">
                    <nav className="crumbs" aria-label="Đường dẫn">
                        <a href="index.html">Trang chủ</a>
                        <span aria-hidden="true">/</span>
                        <span aria-current="page">Đăng nhập</span>
                    </nav>

                    <div className="authTicket">
                        <section className="authMain" aria-labelledby="loginTitle">
                            <h1 id="loginTitle" className="authTitle">Đăng nhập</h1>
                            <p className="authSub">Xem đơn hàng, lưu sản phẩm yêu thích và thanh toán nhanh hơn.</p>

                            <form id="loginForm" className="form" action="#" noValidate>
                                <p id="formStatus" className="formStatus" role="status" aria-live="polite" hidden></p>

                                <div className="field">
                                    <label className="fieldLabel" htmlFor="loginId">Email hoặc số điện thoại</label>
                                    <input
                                        id="loginId"
                                        name="loginId"
                                        className="input"
                                        type="text"
                                        inputMode="email"
                                        autoComplete="username"
                                        placeholder="vidu@email.com"
                                        aria-describedby="loginIdError"
                                        required
                                    />
                                        <p id="loginIdError" className="fieldError" hidden>
                                            <svg className="icon iconSm" aria-hidden="true">
                                                <use href="#iAlert" />
                                            </svg>
                                            <span></span>
                                        </p>
                                </div>

                                <div className="field">
                                    <div className="fieldHead">
                                        <label className="fieldLabel" htmlFor="loginPassword">Mật khẩu</label>
                                        <Link to="/forgotPassword" className="textLink fieldLink">Quên mật khẩu?</Link>
                                    </div>
                                    <div className="inputWrap">
                                        <input
                                            id="loginPassword"
                                            name="password"
                                            className="input"
                                            type="password"
                                            autoComplete="current-password"
                                            placeholder="Nhập mật khẩu"
                                            aria-describedby="loginPasswordError"
                                            required
                                        />
                                            <button
                                                type="button"
                                                className="eyeBtn"
                                                aria-controls="loginPassword"
                                                aria-pressed="false"
                                                aria-label="Hiện mật khẩu"
                                            >
                                                <svg className="icon eyeOn" aria-hidden="true">
                                                    <use href="#iEye" />
                                                </svg>
                                                <svg className="icon eyeOff" aria-hidden="true">
                                                    <use href="#iEyeOff" />
                                                </svg>
                                            </button>
                                    </div>
                                    <p id="loginPasswordError" className="fieldError" hidden>
                                        <svg className="icon iconSm" aria-hidden="true">
                                            <use href="#iAlert" />
                                        </svg>
                                        <span></span>
                                    </p>
                                </div>

                                <label className="check">
                                    <input type="checkbox" name="remember" className="checkInput"/>
                                        <span className="checkBox" aria-hidden="true">
                                            <svg className="icon iconSm">
                                                <use href="#iCheck" />
                                            </svg>
                                        </span>
                                        <span>Ghi nhớ đăng nhập trên thiết bị này</span>
                                </label>

                                <button type="submit" className="btn btnPrimary btnBlock submitBtn">Đăng nhập</button>
                            </form>

                            <div className="divider" role="separator">
                                <span>hoặc đăng nhập bằng</span>
                            </div>

                            <div className="socialBtns">
                                <button type="button" className="btn btnGhost">Google</button>
                                <button type="button" className="btn btnGhost">Facebook</button>
                            </div>

                            <p className="switchText">
                                Chưa có tài khoản? <Link to="/register" className="textLink">Tạo tài khoản mới</Link>
                            </p>
                        </section>

                        <aside className="authStub" aria-label="Quyền lợi thành viên">
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
                            <h2 className="stubTitle">Quyền lợi thành viên</h2>
                            <ul className="perks">
                                <li>
                                    <svg className="icon" aria-hidden="true">
                                        <use href="#iPackage" />
                                    </svg>
                                    Theo dõi đơn hàng từng bước
                                </li>
                                <li>
                                    <svg className="icon" aria-hidden="true">
                                        <use href="#iHeart" />
                                    </svg>
                                    Lưu sản phẩm yêu thích
                                </li>
                                <li>
                                    <svg className="icon" aria-hidden="true">
                                        <use href="#iShield" />
                                    </svg>
                                    Tra cứu bảo hành nhanh
                                </li>
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