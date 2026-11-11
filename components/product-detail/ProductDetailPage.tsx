import "../../ui/css/productDetail.css";
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import ProductDetail from "./ProductDetail.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {
    loadProducts,
    selectProductById,
    selectProductsError,
    selectProductsStatus,
} from "../../store/productsSlice.ts";

export default function ProductDetailPage() {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectProductsStatus);
    const error = useAppSelector(selectProductsError);
    const product = useAppSelector((state) => selectProductById(state, Number(id)));

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch]);

    useEffect(() => {
        document.title = product ? `${product.name} - Valigo` : "Sản phẩm - Valigo";
    }, [product]);

    return (
        <>
            <PageHeader current="vali" />
            <main id="noiDung">
                <div className="container">
                    {product && <ProductDetail product={product} />}
                    {!product && status === "failed" && (
                        <div className="emptyState" role="alert">
                            <p className="emptyTitle">Không tải được sản phẩm</p>
                            <p>{error}</p>
                            <button type="button" className="btn btnDark" onClick={() => dispatch(loadProducts())}>
                                Thử lại
                            </button>
                        </div>
                    )}
                    {!product && (status === "idle" || status === "loading") && (
                        <p className="emptyState" role="status">Đang tải sản phẩm...</p>
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
