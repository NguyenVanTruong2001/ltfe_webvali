import {useCallback, useEffect, useRef} from "react";
import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import ProductItem from "../Product-Item.tsx";
import Breadcrumb from "./Breadcrumb.tsx";
import ListHead from "./ListHead.tsx";
import FilterSidebar from "./FilterSidebar.tsx";
import ActiveFilters from "./ActiveFilters.tsx";
import Pagination from "./Pagination.tsx";
import {useProductFilters} from "../../hooks/useProductFilters.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {selectWishIds, toggleWish} from "../../store/wishlistSlice.ts";
import "../../ui/css/productList.css";
import {loadProducts, selectProducts, selectProductsError, selectProductsStatus} from "../../store/productsSlice.ts";

export default function ProductListPage() {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const status = useAppSelector(selectProductsStatus);
    const error = useAppSelector(selectProductsError);

    const wishIds = useAppSelector(selectWishIds);
    const {
        filters, sort, setSort, total, pageItems, page, totalPages, pageSize, searchFor,
        activeFilters, toggle, remove, clear,
    } = useProductFilters(products);

    const onToggleWish = useCallback((id: number) => dispatch(toggleWish(id)), [dispatch]);

    const resultsRef = useRef<HTMLElement>(null);
    const previousPage = useRef(page);
    useEffect(() => {
        if (previousPage.current === page) return;
        previousPage.current = page;
        resultsRef.current?.scrollIntoView({block: "start"});
    }, [page]);

    const from = (page - 1) * pageSize + 1;
    const to = from + pageItems.length - 1;

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch]);

    return (
        <>
            <PageHeader current="vali" />
            <main id="noiDung">
                <div className="container">
                    <Breadcrumb />
                    <ListHead total={total} from={from} to={to} sort={sort} onSortChange={setSort} />
                </div>
                <div className="container listLayout">
                    <FilterSidebar products={products} filters={filters} onToggle={toggle} onClear={clear} />
                    <section className="results" aria-label="Kết quả" ref={resultsRef}>
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
                            <>
                                <ActiveFilters items={activeFilters} onRemove={remove} onClear={clear} />
                                {pageItems.length > 0 ? (
                                    <div className="grid gridThree">
                                        {pageItems.map((product) => (
                                            <ProductItem
                                                product={product}
                                                key={product.id}
                                                wished={wishIds.includes(product.id)}
                                                onToggleWish={onToggleWish}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="emptyState">
                                        <p className="emptyTitle">Không có sản phẩm phù hợp</p>
                                        <p>Thử bỏ bớt bộ lọc để xem thêm sản phẩm.</p>
                                        <button type="button" className="btn btnDark" onClick={clear}>Xóa bộ lọc</button>
                                    </div>
                                )}
                                <Pagination page={page} totalPages={totalPages} searchFor={searchFor} />
                            </>
                        )}
                    </section>
                </div>
            </main>
            <PageFooter />
        </>
    );
}
