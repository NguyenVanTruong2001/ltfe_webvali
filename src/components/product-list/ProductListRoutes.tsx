import {Link, Route, Routes} from "react-router";
import ProductListPage from "./ProductListPage.tsx";

function NotFound() {
    return (
        <main id="noiDung" className="container">
            <p className="emptyTitle">Không tìm thấy trang</p>
            <Link to="/" className="textLink">Về trang chủ</Link>
        </main>
    );
}

// Trang được phục vụ ở /ui/productList.html (đường dẫn cũ của bản HTML tĩnh)
export default function ProductListRoutes() {
    return (
        <Routes>
            <Route path="/ui/productList.html" element={<ProductListPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
