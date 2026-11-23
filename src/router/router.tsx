import {createBrowserRouter} from "react-router";
import App from "../App.tsx";
import Layout from "./Layout.tsx";
import ErrorPage from "./ErrorPage.tsx";
import Redirect from "./Redirect.tsx";
import {productsLoader} from "./loaders.ts";
import ProductListPage from "../components/product-list/ProductListPage.tsx";
import ProductDetailPage from "../components/product-detail/ProductDetailPage.tsx";
import ProductReviewsPage from "../components/product-reviews/ProductReviewsPage.tsx";
import News from "../components/news/News-List.tsx";
import CartPage from "../components/cart/CartPage.tsx";
import WishlistPage from "../components/wishlist/WishlistPage.tsx";
import ShippingPolicy from "../components/policy/ShippingPolicy.tsx";
import WarrantyPolicy from "../components/policy/WarrantyPolicy.tsx";
import PaymentPolicy from "../components/policy/PaymentPolicy.tsx";
import ReturnPolicy from "../components/policy/ReturnPolicy.tsx";
import PrivacyPolicy from "../components/policy/PrivacyPolicy.tsx";
import AboutUs from "../components/aboutus/AboutUs.tsx";
import Stores from "../components/stores/Stores.tsx";
import Register from "../components/account/Register.tsx";
import LogIn from "../components/account/LogIn.tsx";
import ForgotPassword from "../components/account/ForgotPassword.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        hydrateFallbackElement: <p className="emptyTitle">Đang tải...</p>,
        children: [
            {index: true, element: <App />, loader: productsLoader},
            {path: "news", element: <News />},
            {path: "register", element: <Register />},
            {path: "login", element: <LogIn />},
            {path: "forgotPassword", element: <ForgotPassword />},
            {path: "aboutus", element: <AboutUs />},
            {path: "stores", element: <Stores />},
            {path: "products", element: <ProductListPage />, loader: productsLoader},
            {path: "products/:id/reviews", element: <ProductReviewsPage />, loader: productsLoader},
            {path: "products/:id/:slug?", element: <ProductDetailPage />, loader: productsLoader},
            {path: "cart", element: <CartPage />, loader: productsLoader},
            {path: "wishlist", element: <WishlistPage />, loader: productsLoader},
            {path: "shippingPolicy", element: <ShippingPolicy />},
            {path: "warrantyPolicy", element: <WarrantyPolicy />},
            {path: "paymentPolicy", element: <PaymentPolicy />},
            {path: "returnPolicy", element: <ReturnPolicy />},
            {path: "privacyPolicy", element: <PrivacyPolicy />},
            {path: "index.html", element: <Redirect pathname="/" />},
            {path: "ui/productList.html", element: <Redirect pathname="/products" />},
            {path: "ui/productDetail.html", element: <Redirect pathname="/products" />},
            {path: "ui/cart.html", element: <Redirect pathname="/cart" />},
            {path: "ui/wishlist.html", element: <Redirect pathname="/wishlist" />},
        ],
    },
]);
