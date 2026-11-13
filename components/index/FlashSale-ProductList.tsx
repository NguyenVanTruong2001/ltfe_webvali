import FlashSaleItem from "./FlashSale-ProductItem.tsx";
import {useProducts} from "../../hooks/useProducts.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {selectWishIds, toggleWish} from "../../store/wishlistSlice.ts";
import {useCallback} from "react";

export default function FlashSaleList() {
    const wishIds = useAppSelector(selectWishIds);
    const dispatch = useAppDispatch();
    const onToggleWish = useCallback((id: number) => dispatch(toggleWish(id)), [dispatch]);
    const {products, status} = useProducts();

    if (status !== "succeeded") {
        return <p role="status">Đang tải sản phẩm...</p>;
    }

    return (<>
        <div className="rail" tabIndex={0} aria-label="Danh sách sản phẩm flash sale">
            {products.map((product) =>
                <FlashSaleItem product={product}
                               key={product.id}
                               wished={wishIds.includes(product.id)}
                               onToggleWish={onToggleWish}
                />)}
        </div>
    </>)
}
