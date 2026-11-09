import {Link, Navigate, Route, Routes, useLocation} from "react-router-dom";
import App from "../src/App.tsx";
import ProductListPage from "./product-list/ProductListPage.tsx";

function NotFound() {
    return (
        <main id="noiDung" className="container">
            <p className="emptyTitle">Không tìm thấy trang</p>
            <Link to="/" className="textLink">Về trang chủ</Link>
        </main>
    );
}

function RedirectTo({pathname}: {pathname: string}) {
    const {search} = useLocation();
    return <Navigate to={{pathname, search}} replace />;
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/index.html" element={<RedirectTo pathname="/" />} />
            <Route path="/ui/productList.html" element={<RedirectTo pathname="/products" />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
