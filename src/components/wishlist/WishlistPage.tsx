import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import ProductItem from "../Product-Item.tsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { clearWishlist, selectWishIds, toggleWish } from "../../store/wishlistSlice.ts";
import { loadProducts, selectProducts } from "../../store/productsSlice.ts";
import { addToCart } from "../../store/cartSlice.ts";
import { initOptions } from "../../lib/productDetail/options.ts";

export default function WishlistPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const wishIds = useAppSelector(selectWishIds);
    const products = useAppSelector(selectProducts);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(loadProducts());
        }
    }, [dispatch, products.length]);

    const wishedProducts = useMemo(() => {
        return wishIds
            .map((id) => products.find((p) => p.id === id))
            .filter((p): p is NonNullable<typeof p> => p !== undefined);
    }, [wishIds, products]);

    const suggestedProducts = useMemo(() => {
        const wishedSet = new Set(wishIds);
        return products.filter((p) => !wishedSet.has(p.id)).slice(0, 4);
    }, [products, wishIds]);

    const handleAddAllToCart = () => {
        wishedProducts.forEach((product) => {
            if (!product.inStock) return;
            const defaults = initOptions(product);
            dispatch(
                addToCart({
                    productId: product.id,
                    color: defaults.color,
                    size: defaults.size,
                    quantity: 1,
                }),
            );
        });
        navigate("/cart");
    };

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
                            <li aria-current="page">Sản phẩm yêu thích</li>
                        </ol>
                    </nav>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "flex-end",
                            justifyContent: "space-between",
                            gap: "12px",
                            marginBottom: "24px",
                        }}
                    >
                        <div>
                            <h1 style={{ margin: 0 }}>Sản phẩm yêu thích</h1>
                            <p style={{ margin: "4px 0 0", opacity: 0.75 }}>
                                {wishedProducts.length} sản phẩm đã lưu
                            </p>
                        </div>

                        {wishedProducts.length > 0 && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
                                <button
                                    type="button"
                                    className="textAction"
                                    onClick={() => dispatch(clearWishlist())}
                                >
                                    Xóa tất cả
                                </button>
                                <button
                                    type="button"
                                    className="btn btnPrimary"
                                    onClick={handleAddAllToCart}
                                >
                                    Thêm tất cả vào giỏ
                                </button>
                            </div>
                        )}
                    </div>

                    {wishedProducts.length === 0 ? (
                        <div style={{ padding: "48px 0", textAlign: "center" }}>
                            <p className="emptyTitle">Danh sách yêu thích đang trống</p>
                            <p style={{ marginBottom: "16px" }}>
                                Nhấn vào biểu tượng trái tim trên sản phẩm để lưu lại những mẫu bạn ưng ý.
                            </p>
                            <Link to="/products" className="btn btnPrimary">
                                Khám phá sản phẩm
                            </Link>
                        </div>
                    ) : (
                        <div className="grid" style={{ marginBottom: "48px" }}>
                            {wishedProducts.map((product) => (
                                <ProductItem
                                    key={product.id}
                                    product={product}
                                    wished={true}
                                    onToggleWish={(id) => dispatch(toggleWish(id))}
                                />
                            ))}
                        </div>
                    )}

                    {suggestedProducts.length > 0 && (
                        <section aria-labelledby="wishSuggestTitle" style={{ marginTop: "32px" }}>
                            <div className="sectionHead">
                                <h2 id="wishSuggestTitle" className="sectionTitle">
                                    Gợi ý dành cho bạn
                                </h2>
                                <Link to="/products" className="textLink">
                                    Xem tất cả
                                </Link>
                            </div>
                            <div className="grid">
                                {suggestedProducts.map((product) => (
                                    <ProductItem
                                        key={product.id}
                                        product={product}
                                        wished={wishIds.includes(product.id)}
                                        onToggleWish={(id) => dispatch(toggleWish(id))}
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
            <PageFooter />
        </>
    );
}