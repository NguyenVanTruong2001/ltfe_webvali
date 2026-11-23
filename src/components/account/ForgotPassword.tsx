import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import {Link} from "react-router";

export default function ForgotPassword() {
    return (
        <>
            <PageHeader />
            <main id="noiDung" className="auth">
                <div className="container">
                    <nav className="crumbs" aria-label="Đường dẫn">
                        <Link to="/">Trang chủ</Link>
                        <span aria-hidden="true">/</span>
                        <Link to="/login">Đăng nhập</Link>
                        <span aria-hidden="true">/</span>
                        <span aria-current="page">Quên mật khẩu</span>
                    </nav>

                    <div className="authTicket">
                        <section className="authMain" aria-labelledby="pageTitle">
                            <h1 id="pageTitle" className="authTitle">Quên mật khẩu?</h1>
                            <p className="authSub">Nhập email hoặc số điện thoại đã đăng ký, Valigo sẽ gửi mã xác nhận để bạn đặt lại mật khẩu.</p>

                            <form className="form" action="">
                                <div className="field">
                                    <label className="fieldLabel" htmlFor="forgotId">Email hoặc số điện thoại</label>
                                    <input id="forgotId" className="input" type="text" required inputMode="email" autoComplete="username" placeholder="vidu@email.com" aria-describedby="forgotIdError" />
                                        <p id="forgotIdError" className="fieldError" hidden>
                                            <svg className="icon iconSm" aria-hidden="true"><use href="#iAlert" /></svg>
                                            <span></span>
                                        </p>
                                </div>
                                <button type="submit" className="btn btnPrimary btnBlock submitBtn">Gửi mã xác nhận</button>
                            </form>

                            <p className="switchText">
                                Nhớ ra rồi? <Link to="/login" className="textLink">Quay lại đăng nhập</Link>
                            </p>
                        </section>

                        <aside className="authStub" aria-label="Hỗ trợ">
                            <svg className="stubImage" viewBox="0 0 200 240" aria-hidden="true">
                                <use href="#suitcase" style={{fill: "#27466F"}} />
                            </svg>
                            <h2 className="stubTitle">Đừng lo, có ngay</h2>
                            <p className="stubText">Mã xác nhận có hiệu lực trong 10 phút. Nếu không nhận được, hãy kiểm tra hộp thư rác hoặc gọi 0900 000 000.</p>
                        </aside>
                    </div>
                </div>
            </main>
            <PageFooter />
        </>
    )
}