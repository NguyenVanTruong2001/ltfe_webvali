import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import {useMemo, useState} from "react";
import {StoresData} from "../../dataset/Stores.tsx";
import {Link} from "react-router-dom";

function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd');
}

export default function Stores() {
    const [selectedCity, setSelectedCity] = useState("");
    const [keyword, setKeyword] = useState("");

    // 4. Logic lọc danh sách cửa hàng bằng useMemo
    const filteredStores = useMemo(() => {
        const normalizedKeyword = normalize(keyword.trim());

        return StoresData.filter((store: any) => {
            const matchedCity = !selectedCity || store.cityCode === selectedCity;
            const searchableContent = `${store.name} ${store.cityName} ${store.address}`;
            const matchedKeyword = !normalizedKeyword || normalize(searchableContent).includes(normalizedKeyword);

            return matchedCity && matchedKeyword;
        });
    }, [selectedCity, keyword]);

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
                            <li aria-current="page">Hệ thống cửa hàng</li>
                        </ol>
                    </nav>
                    <div className="checkoutHead">
                        <h1 className="checkoutTitle">Hệ thống cửa hàng</h1>
                        <p className="storeIntro">Ghé cửa hàng để xem và thử sản phẩm trực tiếp, nhận tư vấn chọn size vali phù hợp chuyến đi.</p>
                    </div>
                    <div className="storeFilter">
                        <div className="formField">
                            <label htmlFor="storeCity">Tỉnh, thành phố</label>
                            <select id="storeCity"
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                            >
                                <option value="">Tất cả</option>
                                <option value="hcm">TP. Hồ Chí Minh</option>
                                <option value="hn">Hà Nội</option>
                                <option value="dn">Đà Nẵng</option>
                                <option value="ct">Cần Thơ</option>
                            </select>
                        </div>
                        <div className="formField">
                            <label htmlFor="storeKeyword">Tìm theo tên đường hoặc quận</label>
                            <input id="storeKeyword" type="search"
                                   autoComplete="off" placeholder="VD: Quận 1, Nguyễn Huệ,..."
                                   value={keyword}
                                   onChange={(e) => setKeyword(e.target.value)}
                            />
                        </div>
                        <p id="storeCount" className="storeCount" role="status" aria-live="polite">
                            {filteredStores.length} cửa hàng
                        </p>
                    </div>
                    {filteredStores.length > 0 ? (
                    <ul className="storeList" id="storeList">
                        {filteredStores.map((store: any) => (
                        <li key={store.id} className="storeCard" data-city={store.cityCode}>
                            <h2 className="storeName">{store.name}</h2>
                            <p className="storeCity">{store.cityName}</p>
                            <dl className="storeInfo">
                                <div>
                                    <dt>Địa chỉ</dt>
                                    <dd>{store.address}</dd>
                                </div>
                                <div>
                                    <dt>Giờ mở cửa</dt>
                                    <dd>{store.hours}</dd>
                                </div>
                                <div>
                                    <dt>Điện thoại</dt>
                                    <dd>
                                        <a href={"tel: " + store.phoneRaw} className="textLink">
                                            {store.phone}
                                        </a>
                                    </dd>
                                </div>
                            </dl>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p id="storeEmpty" className="storeEmpty" hidden>
                    Không có cửa hàng phù hợp. Thử chọn tỉnh, thành phố khác hoặc xóa từ khóa.
                    </p>
                )}
                </div>
            </main>
            <PageFooter />
        </>
    )
}