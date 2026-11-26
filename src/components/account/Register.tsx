import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import {Link} from "react-router";
import type {SessionAuth} from "./session.ts";
import type {AuthResult} from "./authentication.ts";
import * as React from "react";
import {useRef, useState} from "react";
import {register} from "./authentication.ts";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^(0)\d{9}$/;

interface RegisterProps {
    onNav?: (path: string, session: SessionAuth) => void;
    onAuthSuccess?: (result: AuthResult) => void;
}

export const Register: React.FC<RegisterProps> = ({onNav, onAuthSuccess}) => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [policy, setPolicy] = useState(false);

    const [fullnameError, setFullnameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [policyError, setPolicyError] = useState("");
    const [formStatus, setFormStatus] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fullnameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const validateFullname = (value: string): boolean => {
        const trimmed = value.trim();
        if (!trimmed) {
            setFullnameError("Nhập họ và tên của bạn.");
            return false;
        }
        if (trimmed.length < 5) {
            setFullnameError("Họ và tên có ít nhất 5 ký tự.");
            return false;
        }
        setFullnameError("");
        return true;
    };

    const validateEmail = (value: string): boolean => {
        const trimmed = value.trim();
        if (!trimmed) {
            setEmailError("Nhập địa chỉ email.");
            return false;
        }
        if (!emailPattern.test(trimmed)) {
            setEmailError("Email chưa đúng định dạng.");
            return false;
        }
        setEmailError("");
        return true;
    };

    const validatePhone = (value: string): boolean => {
        const cleaned = value.replace(/[\s.-]/g, '').trim();
        if (!cleaned) {
            setPhoneError("Nhập số điện thoại.");
            return false;
        }
        if (!phonePattern.test(cleaned)) {
            setPhoneError("Số điện thoại chưa đúng định dạng.");
            return false;
        }
        setPhoneError("");
        return true;
    };

    const validatePassword = (value: string): boolean => {
        if (!value) {
            setPasswordError("Nhập mật khẩu.");
            return false;
        }
        if (value.length < 6) {
            setPasswordError("Mật khẩu có ít nhất 6 ký tự.");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const validateConfirmPassword = (passValue: string, confirmValue: string): boolean => {
        if (!confirmValue) {
            setConfirmPasswordError("Nhập lại mật khẩu để xác nhận.");
            return false;
        }
        if (passValue !== confirmValue) {
            setConfirmPasswordError("Mật khẩu xác nhận không khớp.");
            return false;
        }
        setConfirmPasswordError("");
        return true;
    };

    const validatePolicy = (checked: boolean): boolean => {
        if (!checked) {
            setPolicyError("Bạn cần đồng ý với điều khoản và chính sách bảo mật.");
            return false;
        }
        setPolicyError("");
        return true;
    };

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLoading) return;

        setFormStatus("");

        const fullname1 = validateFullname(fullname);
        const email1 = validateEmail(email);
        const phone1 = validatePhone(phone);
        const password1 = validatePassword(password);
        const confirmPassword1 = validateConfirmPassword(password, confirmPassword);
        const policy1 = validatePolicy(policy);

        if (!fullname1 || !email1 || !phone1 || !password1 || !confirmPassword1) {
            if (!fullname1) fullnameRef.current?.focus();
            else if (!email1) emailRef.current?.focus();
            else if (!phone1) phoneRef.current?.focus();
            else if (!password1) passwordRef.current?.focus();
            else confirmPasswordRef.current?.focus();
            return;
        }

        if (!policy1) {
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const result = register({
                fullname,
                email,
                phone,
                password,
                remember: true,
            });

            if (!result.isSuccess || !result.session || !result.redirection) {
                setIsLoading(false);
                setFormStatus(result.message || "Đăng ký không thành công. Vui lòng thử lại.");
                return;
            }

            onAuthSuccess?.(result);

            if (onNav) {
                onNav(result.redirection, result.session);
            } else {
                window.location.assign(result.redirection);
            }
        }, 1000);
    };

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

                            <form id="registerForm" className="form" onSubmit={handleSubmit} noValidate>
                                <p id="formStatus" className="formStatus" role="status" aria-live="polite"
                                   hidden={!formStatus}>{formStatus}</p>

                                <div className="field">
                                    <label className="fieldLabel" htmlFor="fullName">Họ và tên</label>
                                    <input id="fullName" name="fullName" className="input" type="text" autoComplete="name" placeholder="Nguyễn Văn A" aria-describedby="fullNameError" required
                                           ref={fullnameRef} aria-invalid={fullnameError ? "true" : "false"} value={fullname}
                                           onChange={(e) => {
                                               const next = e.target.value;
                                               setFullname(next);
                                               if (fullnameError) validateFullname(next);
                                           }}
                                           onBlur={() => {if (fullname) validateFullname(fullname)}} />
                                        <p id="fullNameError" className="fieldError" hidden={!fullnameError}>
                                            <svg className="icon iconSm" aria-hidden="true"><use href="#iAlert" /></svg>
                                            <span>{fullnameError}</span>
                                        </p>
                                </div>

                                <div className="fieldRow">
                                    <div className="field">
                                        <label className="fieldLabel" htmlFor="regEmail">Email</label>
                                        <input id="regEmail" name="email" className="input" type="email" autoComplete="email" placeholder="vidu@email.com" aria-describedby="regEmailError" inputMode="email" required
                                               ref={emailRef} aria-invalid={emailError ? "true" : "false"}
                                               value={email}
                                               onChange={(e) => {
                                                   const next = e.target.value;
                                                   setEmail(next);
                                                   if (emailError) validateEmail(next);
                                               }}
                                               onBlur={() => {
                                                   if (email) validateEmail(email);
                                               }}
                                        />
                                            <p id="regEmailError" className="fieldError" hidden={!emailError}>
                                                <svg className="icon iconSm" aria-hidden="true"><use href="#iAlert" /></svg>
                                                <span>{emailError}</span>
                                            </p>
                                    </div>
                                    <div className="field">
                                        <label className="fieldLabel" htmlFor="regPhone">Số điện thoại</label>
                                        <input id="regPhone" name="phone" className="input" type="tel" autoComplete="tel" placeholder="0912 345 678" aria-describedby="regPhoneError" inputMode="tel" required
                                               ref={phoneRef} aria-invalid={phoneError ? "true" : "false"}
                                               value={phone}
                                               onChange={(e) => {
                                                   const next = e.target.value;
                                                   setPhone(next);
                                                   if (phoneError) validatePhone(next);
                                               }}
                                               onBlur={() => {
                                                   if (phone) validatePhone(phone);
                                               }}
                                        />
                                            <p id="regPhoneError" className="fieldError" hidden={!phoneError}>
                                                <svg className="icon iconSm" aria-hidden="true"><use href="#iAlert" /></svg>
                                                <span>{phoneError}</span>
                                            </p>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="fieldLabel" htmlFor="regPassword">Mật khẩu</label>
                                    <div className="inputWrap">
                                        <input id="regPassword" name="password" className="input"
                                               type={showPassword ? "text" : "password"}
                                               autoComplete="new-password" placeholder="Tạo mật khẩu" aria-describedby="regPasswordError" required
                                               ref={passwordRef} aria-invalid={passwordError ? "true" : "false"}
                                               value={password}
                                               onChange={(e) => {
                                                   const next = e.target.value;
                                                   setPassword(next);
                                                   if (passwordError) validatePassword(next);
                                                   if (confirmPasswordError) validateConfirmPassword(next, confirmPassword);
                                               }}
                                               onBlur={() => {
                                                   if (password) validatePassword(password);
                                               }}
                                        />
                                            <button type="button" className="eyeBtn" aria-controls="regPassword" aria-pressed={showPassword}
                                                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                                    onClick={() => {
                                                        setShowPassword((prev) => !prev);
                                                        passwordRef.current?.focus();
                                                    }}
                                            >
                                                <svg className="icon eyeOn" aria-hidden="true"><use href="#iEye" /></svg>
                                                <svg className="icon eyeOff" aria-hidden="true"><use href="#iEyeOff" /></svg>
                                            </button>
                                    </div>
                                    <div className="strength" id="strength" data-level="0" aria-live="polite">
                                        <span className="strengthBar"><i></i><i></i><i></i><i></i></span>
                                        <span className="strengthText" id="strengthText">Tối thiểu 8 ký tự, gồm chữ và số.</span>
                                    </div>
                                    <p id="regPasswordError" className="fieldError" hidden={!passwordError}>
                                        <svg className="icon iconSm" aria-hidden="true"><use href="#iAlert" /></svg>
                                        <span>{passwordError}</span>
                                    </p>
                                </div>

                                <div className="field">
                                    <label className="fieldLabel" htmlFor="regConfirm">Nhập lại mật khẩu</label>
                                    <div className="inputWrap">
                                        <input id="regConfirm" name="confirm" className="input" autoComplete="new-password" placeholder="Nhập lại mật khẩu" aria-describedby="regConfirmError" required
                                               type={showConfirmPassword ? "text" : "password"} ref={confirmPasswordRef}
                                               aria-invalid={confirmPasswordError ? "true" : "false"}
                                               value={confirmPassword}
                                               onChange={(e) => {
                                                   const next = e.target.value;
                                                   setConfirmPassword(next);
                                                   if (confirmPasswordError) validateConfirmPassword(password, next);
                                               }}
                                               onBlur={() => {
                                                   if (confirmPassword) validateConfirmPassword(password, confirmPassword);
                                               }}
                                        />
                                            <button type="button" className="eyeBtn" aria-controls="regConfirm"
                                                    aria-pressed={showConfirmPassword}
                                                    aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                                    onClick={() => {
                                                        setShowConfirmPassword((prev) => !prev);
                                                        confirmPasswordRef.current?.focus();
                                                    }}
                                            >
                                                <svg className="icon eyeOn" aria-hidden="true"><use href="#iEye" /></svg>
                                                <svg className="icon eyeOff" aria-hidden="true"><use href="#iEyeOff" /></svg>
                                            </button>
                                    </div>
                                    <p id="regConfirmError" className="fieldError" hidden={!confirmPasswordError}>
                                        <svg className="icon iconSm" aria-hidden="true"><use href="#iAlert" /></svg>
                                        <span>{confirmPasswordError}</span>
                                    </p>
                                </div>

                                <div className="field">
                                    <label className="check">
                                        <input type="checkbox" id="regTerms" name="terms" className="checkInput" aria-describedby="regTermsError"
                                               checked={policy}
                                               onChange={(e) => {
                                                   const checked = e.target.checked;
                                                   setPolicy(checked);
                                                   if (policyError) validatePolicy(checked);
                                               }}
                                        />
                                            <span className="checkBox" aria-hidden="true"><svg className="icon iconSm"><use href="#iCheck" /></svg></span>
                                            <span>Tôi đồng ý với <span className="textLink">Điều khoản sử dụng</span> và <span className="textLink">Chính sách bảo mật</span></span>
                                    </label>
                                    <p id="regTermsError" className="fieldError" hidden={!policyError}>
                                        <svg className="icon iconSm" aria-hidden="true"><use href="#iAlert" /></svg>
                                        <span>{policyError}</span>
                                    </p>
                                </div>

                                <button type="submit" className={`btn btnPrimary btnBlock submitBtn ${isLoading ? "isLoading" : ""}`}
                                        disabled={isLoading}>
                                    {isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                                </button>
                            </form>

                            <div className="divider" role="separator">
                                <span>hoặc đăng ký bằng</span>
                            </div>

                            <div className="socialBtns">
                                <button type="button" className="btn btnGhost">Google</button>
                                <button type="button" className="btn btnGhost">Facebook</button>
                            </div>

                            <p className="switchText">
                                Đã có tài khoản? <Link to="/login" className="textLink">Đăng nhập</Link>
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

export default Register;