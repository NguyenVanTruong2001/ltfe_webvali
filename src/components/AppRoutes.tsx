import {Link, Navigate, Route, Routes, useLocation} from "react-router-dom";
import App from "../App.tsx";
import ProductListPage from "./product-list/ProductListPage.tsx";
import ProductDetailPage from "./product-detail/ProductDetailPage.tsx";
import ProductReviewsPage from "./product-reviews/ProductReviewsPage.tsx";
import News from "./news/News-List.tsx";
import CartPage from "./cart/CartPage.tsx";
import WishlistPage from "./wishlist/WishlistPage.tsx";
import ShippingPolicy from "./policy/ShippingPolicy.tsx";
import WarrantyPolicy from "./policy/WarrantyPolicy.tsx";
import PaymentPolicy from "./policy/PaymentPolicy.tsx";
import ReturnPolicy from "./policy/ReturnPolicy.tsx";
import PrivacyPolicy from "./policy/PrivacyPolicy.tsx";
import AboutUs from "./aboutus/AboutUs.tsx";
import Stores from "./stores/Stores.tsx";

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
            <Route path="/news" element={<News />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/:id/reviews" element={<ProductReviewsPage />} />
            <Route path="/products/:id/:slug?" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/shippingPolicy" element={<ShippingPolicy />} />
            <Route path="/warrantyPolicy" element={<WarrantyPolicy />} />
            <Route path="/paymentPolicy" element={<PaymentPolicy />} />
            <Route path="/returnPolicy" element={<ReturnPolicy />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/index.html" element={<RedirectTo pathname="/" />} />
            <Route path="/ui/productList.html" element={<RedirectTo pathname="/products" />} />
            <Route path="/ui/productDetail.html" element={<RedirectTo pathname="/products" />} />
            <Route path="/ui/cart.html" element={<RedirectTo pathname="/cart" />} />
            <Route path="/ui/wishlist.html" element={<RedirectTo pathname="/wishlist" />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}