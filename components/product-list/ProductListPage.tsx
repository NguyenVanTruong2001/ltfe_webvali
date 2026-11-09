import {useEffect} from "react";
import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import ProductItem from "../Product-Item.tsx";
import Breadcrumb from "./Breadcrumb.tsx";
import ListHead from "./ListHead.tsx";
import FilterSidebar from "./FilterSidebar.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {loadProducts, selectProducts, selectProductsError, selectProductsStatus} from "../../store/productsSlice.ts";

export default function ProductListPage() {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const status = useAppSelector(selectProductsStatus);
    const error = useAppSelector(selectProductsError);

    // Side effect: gọi API sau khi render lần đầu
    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch]);

    return (
        <>
            <PageHeader current="vali" />
            <main id="noiDung">
                <div className="container">
                    <Breadcrumb />
                    <ListHead total={products.length} />
                </div>
                <div className="container listLayout">
                    <FilterSidebar products={products} />
                    <section className="results" aria-label="Kết quả">
                        {status === "failed" && (
                            <div className="emptyState" role="alert">
                                <p className="emptyTitle">Không tải được sản phẩm</p>
                                <p>{error}</p>
                                <button type="button" className="btn btnDark" onClick={() => dispatch(loadProducts())}>
                                    Thử lại
                                </button>
                            </div>
                        )}
                        {(status === "idle" || status === "loading") && (
                            <p className="emptyState" role="status">Đang tải sản phẩm...</p>
                        )}
                        {status === "succeeded" && (
                            <div className="grid gridThree">
                                {products.map((product) => <ProductItem product={product} key={product.id} />)}
                            </div>
                        )}
                    </section>
                </div>
            </main>
            <PageFooter />
        </>
    );
}
