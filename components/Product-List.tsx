import ProductItem from "./Product-Item.tsx";
import {useProducts} from "../hooks/useProducts.ts";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {selectWishIds, toggleWish} from "../store/wishlistSlice.ts";
import {useCallback} from "react";

export default function ProductList() {
    const wishIds = useAppSelector(selectWishIds);
    const dispatch = useAppDispatch();
    const onToggleWish = useCallback((id: number) => dispatch(toggleWish(id)), [dispatch]);
    const {products, status, error, reload} = useProducts();

    if (status === "failed") {
        return (
            <div role="alert">
                <p>{error}</p>
                <button type="button" className="btn btnGhost" onClick={reload}>Thử lại</button>
            </div>
        );
    }

    if (status !== "succeeded") {
        return <p role="status">Đang tải sản phẩm...</p>;
    }

    return (<>
        <div className="grid" role="tabpanel">
            {products.map((product) =>
                <ProductItem product={product}
                             key={product.id}
                             wished={wishIds.includes(product.id)}
                             onToggleWish={onToggleWish}
                />)}
        </div>
        <div className="gridMore">
            <button type="button" className="btn btnGhost">Xem thêm 2 sản phẩm</button>
        </div>
    </>)
}
