import {Link} from "react-router-dom";

export default function PageHeader({current}: {current?: string}) {
    return (<>
        <svg width="0" height="0" style={{position:"absolute"}} aria-hidden="true" focusable="false">
            <defs>
                <symbol id="iSearch" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                </symbol>
                <symbol id="iUser" viewBox="0 0 24 24">
                    <path d="M20 21v-1a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v1" />
                    <circle cx="12" cy="8" r="4" />
                </symbol>
                <symbol id="iHeart" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </symbol>
                <symbol id="iBag" viewBox="0 0 24 24">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                </symbol>
                <symbol id="iPhone" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </symbol>
                <symbol id="iMail" viewBox="0 0 24 24">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                </symbol>
                <symbol id="iMenu" viewBox="0 0 24 24">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                </symbol>
                <symbol id="iChevDown" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6" />
                </symbol>
                <symbol id="iChevLeft" viewBox="0 0 24 24">
                    <path d="m15 18-6-6 6-6" />
                </symbol>
                <symbol id="iChevRight" viewBox="0 0 24 24">
                    <path d="m9 18 6-6-6-6" />
                </symbol>
                <symbol id="iTruck" viewBox="0 0 24 24">
                    <path d="M1 6h13v10H1z" />
                    <path d="M14 9h4l4 4v3h-8z" />
                    <circle cx="6" cy="18" r="2" />
                    <circle cx="18" cy="18" r="2" />
                </symbol>
                <symbol id="iShield" viewBox="0 0 24 24">
                    <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />
                    <path d="m9 12 2 2 4-4" />
                </symbol>
                <symbol id="iRefresh" viewBox="0 0 24 24">
                    <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
                    <path d="M3 21v-5h5" />
                </symbol>
                <symbol id="iHeadset" viewBox="0 0 24 24">
                    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
                    <rect x="3" y="14" width="4" height="6" rx="1.5" />
                    <rect x="17" y="14" width="4" height="6" rx="1.5" />
                </symbol>
                <symbol id="iCopy" viewBox="0 0 24 24">
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
                </symbol>
                <symbol id="iStore" viewBox="0 0 24 24">
                    <path d="M4 9 5.5 4h13L20 9" />
                    <path d="M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9" />
                    <path d="M5 12v8h14v-8" />
                </symbol>
                <symbol id="iPackage" viewBox="0 0 24 24">
                    <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" />
                    <path d="m3 7.5 9 4.5 9-4.5M12 12v9" />
                </symbol>
                <symbol id="iClock" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                </symbol>
                <symbol id="suitcase" viewBox="0 0 200 240">
                    <ellipse cx="100" cy="230" rx="64" ry="5" fill="#12263A" opacity=".1" />
                    <path
                        d="M80 34V20a8 8 0 0 1 8-8h24a8 8 0 0 1 8 8v14"
                        fill="none"
                        style={{stroke:"color-mix(in srgb, var(--bodyColor), #000 30%)"}}
                        strokeWidth={7}
                        strokeLinecap={"round"}
                    />
                    <rect x="38" y="30" width="124" height="172" rx="24" style={{fill:"var(--bodyColor)"}} />
                    <path
                        d="M68 48V184M100 48V184M132 48V184"
                        fill="none"
                        style={{stroke:"color-mix(in srgb, var(--bodyColor), #000 14%)"}}
                        strokeWidth={6}
                        strokeLinecap={"round"}
                    />
                    <rect x="47" y="40" width="9" height="152" rx="4.5" fill="#fff" opacity=".22" />
                    <rect
                        x="122"
                        y="156"
                        width="30"
                        height="16"
                        rx="4"
                        style={{fill:"color-mix(in srgb, var(--bodyColor), #000 30%)"}}
                    />
                    <rect x="127" y="160" width="12" height="8" rx="2" fill="#FFC400" />
                    <path
                        d="M62 202v4M138 202v4"
                        fill="none"
                        style={{stroke:"color-mix(in srgb, var(--bodyColor), #000 30%)"}}
                        strokeWidth="6"
                        strokeLinecap="round"
                    />
                    <circle cx="62" cy="214" r="10" fill="#12263A" />
                    <circle cx="62" cy="214" r="4" fill="#9AA9B8" />
                    <circle cx="138" cy="214" r="10" fill="#12263A" />
                    <circle cx="138" cy="214" r="4" fill="#9AA9B8" />
                </symbol>
                <symbol id="backpack" viewBox="0 0 200 240">
                    <ellipse cx="100" cy="230" rx="64" ry="5" fill="#12263A" opacity=".1" />
                    <path
                        d="M84 36q16-26 32 0"
                        fill="none"
                        style={{stroke:"color-mix(in srgb, var(--bodyColor), #000 30%)"}}
                        strokeWidth={7}
                        strokeLinecap={"round"}
                    />
                    <rect
                        x="34"
                        y="92"
                        width="14"
                        height="88"
                        rx="7"
                        style={{fill:"color-mix(in srgb, var(--bodyColor), #000 30%)"}}
                    />
                    <rect
                        x="152"
                        y="92"
                        width="14"
                        height="88"
                        rx="7"
                        style={{fill:"color-mix(in srgb, var(--bodyColor), #000 30%)"}}
                    />
                    <path
                        d="M46 84Q46 32 100 32T154 84V190Q154 214 130 214H70Q46 214 46 190Z"
                        style={{fill:"var(--bodyColor)"}}
                    />
                    <path
                        d="M62 74Q100 54 138 74"
                        fill="none"
                        style={{stroke:"color-mix(in srgb, var(--bodyColor), #000 14%)"}}
                        strokeWidth={4}
                        strokeLinecap={"round"}
                    />
                    <rect
                        x="62"
                        y="122"
                        width="76"
                        height="72"
                        rx="18"
                        style={{fill:"color-mix(in srgb, var(--bodyColor), #000 14%)"}}
                    />
                    <path
                        d="M72 140h56"
                        fill="none"
                        style={{stroke:"color-mix(in srgb, var(--bodyColor), #000 30%)"}}
                        strokeWidth={3}
                        strokeLinecap={"round"}
                        strokeDasharray={"2 6"}
                    />
                    <rect x="88" y="88" width="24" height="12" rx="3" fill="#FFC400" />
                    <rect x="50" y="44" width="8" height="120" rx="4" fill="#fff" opacity=".18" />
                </symbol>
                <symbol id="pouch" viewBox="0 0 200 240">
                    <ellipse cx="100" cy="230" rx="64" ry="5" fill="#12263A" opacity=".1" />
                    <rect x="28" y="84" width="144" height="116" rx="28" style={{fill:"var(--bodyColor)"}} />
                    <path
                        d="M28 120h144"
                        fill="none"
                        style={{stroke:"color-mix(in srgb, var(--bodyColor), #000 30%)"}}
                        strokeWidth={3}
                        strokeLinecap={"round"}
                        strokeDasharray={"2 6"}
                    />
                    <rect
                        x="84"
                        y="102"
                        width="32"
                        height="14"
                        rx="7"
                        style={{fill:"color-mix(in srgb, var(--bodyColor), #000 30%)"}}
                    />
                    <rect x="118" y="146" width="36" height="22" rx="5" fill="#FFC400" />
                    <rect x="38" y="94" width="10" height="96" rx="5" fill="#fff" opacity=".2" />
                </symbol>
                <symbol id="iClose" viewBox="0 0 24 24">
                    <path d="M6 6l12 12M18 6 6 18" />
                </symbol>
                <symbol id="iFilter" viewBox="0 0 24 24">
                    <path d="M3 5h18l-7 8v6l-4 2v-8z" />
                </symbol>
                <symbol id="iMinus" viewBox="0 0 24 24">
                    <path d="M5 12h14" />
                </symbol>
                <symbol id="iPlus" viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14" />
                </symbol>
                <symbol id="iEye" viewBox="0 0 24 24">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                </symbol>
                <symbol id="iEyeOff" viewBox="0 0 24 24">
                    <path d="M17.9 17.9A10.4 10.4 0 0 1 12 19c-6.5 0-10-7-10-7a17.7 17.7 0 0 1 4.1-5M9.9 5.2A9.7 9.7 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.2 3.2" />
                    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18" />
                </symbol>
                <symbol id="iLock" viewBox="0 0 24 24">
                    <rect x="4" y="11" width="16" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </symbol>
                <symbol id="iAlert" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4.5M12 16h.01" />
                </symbol>
                <symbol id="iCheck" viewBox="0 0 24 24">
                    <path d="m5 12 5 5 9-10" />
                </symbol>
            </defs>
        </svg>
        <a className="skipLink" href="">Bỏ qua và đến nội dung chính</a>
        <input type="checkbox" id="navCheck" className="navCheck" aria-label="Mở menu" />
        <div className="topbar">
            <div className="container topbarInner">
                <div className="topbarGroup">
                    <a href="tel:0900000000">
                        <svg className="icon iconSm" aria-hidden="true">
                            <use href="#iPhone" />
                        </svg>
                        0900 000 000
                    </a>
                    <a href="mailto:cskh@valigo.vn">
                        <svg className="icon iconSm" aria-hidden="true">
                            <use href="#iMail" />
                        </svg>
                        cskh@valigo.vn
                    </a>
                </div>
                <div className="topbarGroup">
                    <a href="../ui/orderTracking.html">
                        <svg className="icon iconSm" aria-hidden="true">
                            <use href="#iPackage" />
                        </svg>
                        Kiểm tra đơn hàng
                    </a>
                    <a href="../ui/stores.html">
                        <svg className="icon iconSm" aria-hidden="true">
                            <use href="#iStore" />
                        </svg>
                        Hệ thống cửa hàng
                    </a>
                </div>
            </div>
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
                <form className="search" role="search" action="#">
                    <label className="visuallyHidden" htmlFor="siteSearch">Tìm sản phẩm</label>
                    <input
                        id="siteSearch"
                        type="search"
                        autoComplete="off"
                        placeholder="Tìm vali, balo, phụ kiện..."
                    />
                    <button type="submit" className="searchBtn" aria-label="Tìm kiếm">
                        <svg className="icon" aria-hidden="true">
                            <use href="#iSearch" />
                        </svg>
                    </button>
                </form>
                <div className="actions">
                    <a href="../ui/login.html" className="action">
                        <svg className="icon iconLg" aria-hidden="true">
                            <use href="#iUser" />
                        </svg>
                        <span className="actionLabel">Tài khoản</span>
                    </a>
                    <a href="#" className="action" aria-label="Yêu thích, 2 sản phẩm">
        <span className="actionIcon">
          <svg className="icon iconLg" aria-hidden="true">
            <use href="#iHeart" />
          </svg>
          <span className="count">2</span>
        </span>
                        <span className="actionLabel">Yêu thích</span>
                    </a>
                    <a href="../ui/cart.html" className="action" aria-label="Giỏ hàng, 1 sản phẩm">
        <span className="actionIcon">
          <svg className="icon iconLg" aria-hidden="true">
            <use href="#iBag" />
          </svg>
          <span className="count">1</span>
        </span>
                        <span className="actionLabel">Giỏ hàng</span>
                    </a>
                </div>
            </div>
            <nav className="mainnav" aria-label="Danh mục chính">
                <div className="container">
                    <ul className="navList">
                        <li className="navItem">
                            <a className="navLink" href="../ui/about.html">Về chúng tôi</a>
                        </li>
                        <li className="navItem">
                            <Link className={current === "vali" ? "navLink isCurrent" : "navLink"} data-nav="vali" to="/products">
                                Vali
                                <svg className="icon iconSm" aria-hidden="true">
                                    <use href="#iChevDown" />
                                </svg>
                            </Link>
                            <div className="mega">
                                <div className="container megaInner">
                                    <div className="megaCol">
                                        <p className="megaTitle">Theo size</p>
                                        <ul>
                                            <li>
                                                <Link to="/products?size=20">Size 20" xách tay</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?size=24">Size 24" ký gửi</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?size=28">Size 28" cỡ lớn</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="megaCol">
                                        <p className="megaTitle">Theo chất liệu</p>
                                        <ul>
                                            <li>
                                                <Link to="/products?material=aluminum">Vali khung nhôm</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?material=zipper">Vali khóa kéo</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?material=zipper">Vali nhựa PC</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?material=pp">Vali nhựa PP</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="megaCol">
                                        <p className="megaTitle">Dòng sản phẩm</p>
                                        <ul>
                                            <li>
                                                <Link to="/products?line=atlas">Atlas</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?line=orion">Orion doanh nhân</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?line=zipra">Zipra</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?line=sora">Sora</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?line=pebble">Pebble</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="navItem">
                            <Link className="navLink" to="/products?category=backpack">
                                Balo
                                <svg className="icon iconSm" aria-hidden="true">
                                    <use href="#iChevDown" />
                                </svg>
                            </Link>
                            <div className="mega">
                                <div className="container megaInner">
                                    <div className="megaCol">
                                        <p className="megaTitle">Balo</p>
                                        <ul>
                                            <li>
                                                <Link to="/products?category=backpack&line=dune">Balo laptop Dune</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?category=backpack&line=fern">Balo laptop Fern</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?category=backpack&line=ridge">Balo Ridge da PU</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?category=backpack&line=skyline">Balo Skyline</Link>
                                            </li>
                                            <li>
                                                <Link to="/products?category=backpack&line=daily">Balo Daily</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="navItem">
                            <Link className="navLink" to="/products?category=accessory">Phụ kiện</Link>
                        </li>
                        <li className="navItem">
                            <Link className="navLink isHot" to="/">Khuyến mại</Link>
                        </li>
                        <li className="navItem">
                            <Link className="navLink" to="/news">
                                Tin tức
                                <svg className="icon iconSm" aria-hidden="true">
                                    <use href="#iChevDown" />
                                </svg>
                            </Link>
                            <div className="mega">
                                <div className="container megaInner">
                                    <div className="megaCol">
                                        <p className="megaTitle">Hướng dẫn</p>
                                        <ul>
                                            <li>
                                                <Link to="/news?topic=size">Chọn size vali</Link>
                                            </li>
                                            <li>
                                                <Link to="/news?topic=guide">Cẩm nang du lịch</Link>
                                            </li>
                                            <li>
                                                <Link to="/news?topic=review">Review sản phẩm</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="megaCol">
                                        <p className="megaTitle">Hỗ trợ</p>
                                        <ul>
                                            <li>
                                                <a href="../ui/warrantyPolicy.html">Chính sách bảo hành</a>
                                            </li>
                                            <li>
                                                <a href="../ui/warrantyPolicy.html">Xử lý lỗi vali</a>
                                            </li>
                                            <li>
                                                <Link to="/news">Tuyển dụng</Link>
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