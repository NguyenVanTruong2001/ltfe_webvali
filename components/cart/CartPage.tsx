import "../../ui/css/cart.css";
import {useEffect} from "react";
import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import Cart from "./Cart.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {selectCartLines} from "../../store/cartSlice.ts";
import {loadProducts, selectProductsError, selectProductsStatus} from "../../store/productsSlice.ts";

export default function CartPage() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectProductsStatus);
    const error = useAppSelector(selectProductsError);
    const hasLines = useAppSelector((state) => selectCartLines(state).length > 0);
    const ready = status === "succeeded" || !hasLines;

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch]);

    useEffect(() => {
        document.title = "Giỏ hàng - Valigo";
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <PageHeader />
            <main id="noiDung">
                <div className="container">
                    {ready && <Cart />}
                    {!ready && status === "failed" && (
                        <div className="cartEmpty" role="alert">
                            <p className="cartEmptyTitle">Không tải được giỏ hàng</p>
                            <p>{error}</p>
                            <button type="button" className="btn btnDark" onClick={() => dispatch(loadProducts())}>
                                Thử lại
                            </button>
                        </div>
                    )}
                    {!ready && status !== "failed" && (
                        <p className="cartEmpty" role="status">Đang tải giỏ hàng...</p>
                    )}
                </div>
            </main>
            <PageFooter />
        </>
    );
}
