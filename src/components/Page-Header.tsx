import { useState, useEffect, type SyntheticEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useAppSelector } from "../store/hooks.ts";
import { selectCartCount } from "../store/cartSlice.ts";
import { selectWishIds } from "../store/wishlistSlice.ts";
import {SVG} from "./SVG.tsx";
import {clearSession, getSession, type SessionAuth} from "./account/session.ts";
import {getRedirectPathByRole} from "./account/authentication.ts";

export default function PageHeader({current}: {current?: string}) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [session, setSession] = useState<SessionAuth | null>(() => getSession())
    const [keyword, setKeyword] = useState(searchParams.get("q") ?? "");
    const cartCount = useAppSelector(selectCartCount);
    const wishCount = useAppSelector(selectWishIds).length;
    const accountPath = getRedirectPathByRole(session?.user.role);
    const handleLogout = () => {
        clearSession();
        setSession(null);
        navigate("/");
    }

    useEffect(() => {
        setKeyword(searchParams.get("q") ?? "");
        setSession(getSession);
    }, [searchParams]);

    const handleSearch = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = keyword.trim();
        if (trimmed) {
            navigate(`/products?q=${encodeURIComponent(trimmed)}`);
        } else {
            navigate("/products");
        }
    };

    return (<>
        <SVG />
        <a className="skipLink" href="">Bỏ qua và đến nội dung chính</a>
        <input type="checkbox" id="navCheck" className="navCheck" aria-label="Mở menu" />
        <div className="topbar">
            {session ? (
                <>
                {session.user.role === "Admin" ? (
                    <div className="container topbarInner">
                        <div className="topbarGroup"></div>
                        <div className="topbarGroup">
                            <Link to="/dashboard">
                                <svg className="icon iconSm" aria-hidden="true">
                                    <use href="#iPackage" />
                                </svg>
                                Admin
                            </Link>
                        </div>
                    </div>
                ) : (<></>)
                }
                </>
            ) : (<></>)}
        </div>
        <header className="siteHeader">
            <div className="container mainbar">
                <label htmlFor="navCheck" className="menuToggle" aria-label="Mở menu">
                    <svg className="icon iconLg" aria-hidden="true">
                        <use href="#iMenu" />
                    </svg>
                </label>
                <Link to="/" className="logo" aria-label="Valigo - trang chủ">
                    <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">
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
                    <span className="logoText">Valigo</span>
                </Link>
                <form className="search" role="search" onSubmit={handleSearch}>
                    <label className="visuallyHidden" htmlFor="siteSearch">Tìm sản phẩm</label>
                    <input
                        id="siteSearch"
                        type="search"
                        autoComplete="off"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="searchBtn" aria-label="Tìm kiếm">
                        <svg className="icon" aria-hidden="true">
                            <use href="#iSearch" />
                        </svg>
                    </button>
                </form>
                <div className="actions">
                    {session ? (
                        <>
                            <Link to={accountPath} className="action">
                                <svg className="icon iconLg" aria-hidden="true">
                                    <use href="#iUser" />
                                </svg>
                                <span className="actionLabel">
                                    {session.user.fullname}
                                </span>
                            </Link>
                        </>
                    ) : (
                        <Link to="/login" className="action">
                            <svg className="icon iconLg" aria-hidden="true">
                                <use href="#iUser" />
                            </svg>
                            <span className="actionLabel">Tài khoản</span>
                        </Link>
                    )}
                    <Link to="/wishlist" className="action" aria-label={`Yêu thích, ${wishCount} sản phẩm`}>
                        <span className="actionIcon">
                            <svg className="icon iconLg" aria-hidden="true">
                                <use href="#iHeart" />
                            </svg>
                            {wishCount > 0 && <span className="count">{wishCount}</span>}
                        </span>
                        <span className="actionLabel">Yêu thích</span>
                    </Link>
                    <Link to="/cart" className="action" aria-label={`Giỏ hàng, ${cartCount} sản phẩm`}>
                        <span className="actionIcon">
                            <svg className="icon iconLg" aria-hidden="true">
                                <use href="#iBag" />
                            </svg>
                            {cartCount > 0 && <span className="count">{cartCount}</span>}
                        </span>
                        <span className="actionLabel">Giỏ hàng</span>
                    </Link>
                    {session ? (
                        <>
                            <button
                                type="button"
                                className="btn btnPrimary action"
                                onClick={handleLogout}
                                aria-label="Đăng xuất"
                            >
                                <span className="actionLabel">Đăng xuất</span>
                            </button>
                        </>
                    ) : (<></>)}
                </div>
            </div>
            <nav className="mainnav" aria-label="Danh mục chính">
                <div className="container">
                    <ul className="navList">
                        <li className="navItem">
                            <Link className="navLink" to="/">Trang chủ</Link>
                        </li>
                        <li className="navItem">
                            <Link className={current === "vali" ? "navLink isCurrent" : "navLink"} data-nav="vali" to="/products">
                                Sản phẩm
                                <svg className="icon iconSm" aria-hidden="true">
                                    <use href="#iChevDown" />
                                </svg>
                            </Link>
                            <div className="mega">
                                <div className="container megaInner">
                                    <div className="megaCol">
                                        <p className="megaTitle">Chọn size</p>
                                        <ul>
                                            <li>
                                                <Link to="/products?size=20">S - 20" xách tay</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?size=24">M - 24" ký gửi</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?size=28">L - 28" cỡ lớn</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="megaCol">
                                        <p className="megaTitle">Chọn loại sản phẩm</p>
                                        <ul>
                                            <li>
                                                <Link to="/products?category=suitchase-hard">Vali khung nhôm</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?category=suitchase-soft">Vali nhựa PP</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?category=travel-bag">Vali nhựa PC</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?category=accessory">Vali vải</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="megaCol">
                                        <p className="megaTitle">Chọn thương hiệu</p>
                                        <ul>
                                            <li>
                                                <Link to="/products?brand=pisani">Pisani</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?brand=larita">Larita</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?brand=bamozo">Bamozo</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?brand=mrvui">Mr.Vui</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="navItem">
                            <Link className="navLink isHot" to="/">Khuyến mại</Link>
                        </li>
                        <li className="navItem">
                            <Link className="navLink" to="/news">
                                Thông tin
                                <svg className="icon iconSm" aria-hidden="true">
                                    <use href="#iChevDown" />
                                </svg>
                            </Link>
                            <div className="mega">
                                <div className="container megaInner">
                                    <div className="megaCol">
                                        <p className="megaTitle">Thông tin</p>
                                        <ul>
                                            <li>
                                                <Link to="/news">Tin tức</Link>
                                            </li>
                                            <li>
                                                <Link to="/aboutus">Về chúng tôi</Link>
                                            </li>
                                            <li>
                                                <Link to="/stores">Hệ thống cửa hàng</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="megaCol">
                                        <p className="megaTitle">Chính sách</p>
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
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    </>);
}