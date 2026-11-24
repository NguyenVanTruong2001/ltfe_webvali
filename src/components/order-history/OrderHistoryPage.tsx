import {useEffect} from "react";
import PageHeader from "../Page-Header.tsx";
import PageFooter from "../Page-Footer.tsx";
import OrderHistory from "./OrderHistory.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {loadProducts, selectProductsError, selectProductsStatus} from "../../store/productsSlice.ts";

export default function OrderHistoryPage() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectProductsStatus);
    const error = useAppSelector(selectProductsError);

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch]);

    useEffect(() => {
        document.title = "Lịch sử đơn hàng - Valigo";
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <PageHeader />
            <main id="noiDung">
                <div className="container">
                    {status === "succeeded" && <OrderHistory />}
                    {status === "failed" && (
                        <div className="cartEmpty" role="alert">
                            <p className="cartEmptyTitle">Không tải được lịch sử đơn hàng</p>
                            <p>{error}</p>
                            <button type="button" className="btn btnDark" onClick={() => dispatch(loadProducts())}>
                                Thử lại
                            </button>
                        </div>
                    )}
                    {status !== "succeeded" && status !== "failed" && (
                        <p className="cartEmpty" role="status">Đang tải lịch sử đơn hàng...</p>
                    )}
                </div>
            </main>
            <PageFooter />
        </>
    );
}
