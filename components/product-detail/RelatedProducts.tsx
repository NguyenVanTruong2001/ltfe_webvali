import {Link} from "react-router-dom";
import ProductItem from "../Product-Item.tsx";
import {useAppSelector} from "../../store/hooks.ts";
import {selectProducts} from "../../store/productsSlice.ts";
import type {Product} from "../../types/Product.ts";

const RELATED_LIMIT = 4;

export default function RelatedProducts({product}: {product: Product}) {
    const products = useAppSelector(selectProducts);
    const related = products
        .filter((item) => item.id !== product.id && item.category === product.category)
        .slice(0, RELATED_LIMIT);

    if (related.length === 0) return null;

    return (
        <section className="related" aria-labelledby="relatedTitle">
            <div className="sectionHead">
                <h2 id="relatedTitle" className="sectionTitle">Sản phẩm liên quan</h2>
                <Link to="/products" className="textLink">Xem tất cả vali</Link>
            </div>
            <div className="grid">
                {related.map((item) => <ProductItem product={item} key={item.id} />)}
            </div>
        </section>
    );
}
