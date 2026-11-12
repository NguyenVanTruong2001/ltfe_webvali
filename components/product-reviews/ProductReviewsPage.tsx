import "../../ui/css/productDetail.css";
import "../../ui/css/productReviews.css";
import {useEffect} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import ProductReviews from "./ProductReviews.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {
    loadProducts,
    selectProductById,
    selectProductsError,
    selectProductsStatus,
} from "../../store/productsSlice.ts";

export default function ProductReviewsPage() {
    const {id} = useParams();
    const {hash} = useLocation();
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectProductsStatus);
    const error = useAppSelector(selectProductsError);
    const product = useAppSelector((state) => selectProductById(state, Number(id)));

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch]);

    const productId = product?.id;

    useEffect(() => {
        if (productId === undefined) return;
        if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({block: "start"});
        else window.scrollTo(0, 0);
    }, [productId, hash]);

    useEffect(() => {
        document.title = product ? `Đánh giá ${product.name} - Valigo` : "Đánh giá sản phẩm - Valigo";
    }, [product]);

    return (
        <>
            <PageHeader current="vali" />
            <main id="noiDung">
                <div className="container">
                    {product && <ProductReviews product={product} key={product.id} />}
                    {!product && status === "failed" && (
                        <div className="emptyState" role="alert">
                            <p className="emptyTitle">Không tải được đánh giá</p>
                            <p>{error}</p>
                            <button type="button" className="btn btnDark" onClick={() => dispatch(loadProducts())}>
                                Thử lại
                            </button>
                        </div>
                    )}
                    {!product && (status === "idle" || status === "loading") && (
                        <p className="emptyState" role="status">Đang tải đánh giá...</p>
                    )}
                    {!product && status === "succeeded" && (
                        <div className="emptyState">
                            <p className="emptyTitle">Không tìm thấy sản phẩm</p>
                            <p>Sản phẩm có thể đã ngừng kinh doanh hoặc đường dẫn không đúng.</p>
                            <Link to="/products" className="btn btnDark">Xem tất cả vali</Link>
                        </div>
                    )}
                </div>
            </main>
            <PageFooter />
        </>
    );
}
