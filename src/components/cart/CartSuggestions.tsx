import {useCallback, useMemo} from "react";
import {Link} from "react-router";
import ProductItem from "../Product-Item.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {selectProducts} from "../../store/productsSlice.ts";
import {selectWishIds, toggleWish} from "../../store/wishlistSlice.ts";
import {suggestProducts} from "../../lib/cart/suggestions.ts";
import type {CartEntry} from "../../lib/cart/pricing.ts";

export default function CartSuggestions({entries}: {entries: CartEntry[]}) {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const wishIds = useAppSelector(selectWishIds);
    const onToggleWish = useCallback((id: number) => dispatch(toggleWish(id)), [dispatch]);
    const suggestions = useMemo(() => suggestProducts(products, entries), [products, entries]);

    if (suggestions.length === 0) return null;

    return (
        <section className="alsoLike" aria-labelledby="alsoTitle">
            <div className="sectionHead">
                <h2 id="alsoTitle" className="sectionTitle">Có thể bạn cũng thích</h2>
                <Link to="/products" className="textLink">Xem tất cả vali</Link>
            </div>
            <div className="grid">
                {suggestions.map((product) => (
                    <ProductItem
                        product={product}
                        key={product.id}
                        wished={wishIds.includes(product.id)}
                        onToggleWish={onToggleWish}
                    />
                ))}
            </div>
        </section>
    );
}
