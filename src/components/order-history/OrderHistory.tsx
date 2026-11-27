import {useMemo, useState} from "react";
import {Link, useNavigate, useSearchParams} from "react-router";
import OrderCard from "./OrderCard.tsx";
import OrderTabs from "./OrderTabs.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {addToCart} from "../../store/cartSlice.ts";
import {cancelOrderAsync, selectOrders} from "../../store/ordersSlice.ts";
import {selectProducts} from "../../store/productsSlice.ts";
import {countByFilter, filterOrders, parseFilter, sortNewestFirst} from "../../lib/orders/history.ts";
import type {StatusFilter} from "../../lib/orders/history.ts";
import {planReorder} from "../../lib/orders/reorder.ts";
import type {Order} from "../../types/Order.ts";

export default function OrderHistory() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [notice, setNotice] = useState<string | null>(null);
    const orders = useAppSelector(selectOrders);
    const products = useAppSelector(selectProducts);
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = parseFilter(searchParams.get("status"));
    const sorted = useMemo(() => sortNewestFirst(orders), [orders]);
    const counts = useMemo(() => countByFilter(sorted), [sorted]);
    const visible = useMemo(() => filterOrders(sorted, filter), [sorted, filter]);

    const handleCancel = async (order: Order) => {
        try {
            await dispatch(cancelOrderAsync(order.code)).unwrap();
            setNotice(`Đã hủy đơn ${order.code}.`);
        } catch (err) {
            setNotice(err instanceof Error ? err.message : "Không thể hủy đơn hàng.");
        }
    };

    const handleReorder = (order: Order) => {
        const {payloads} = planReorder(order, products);
        if (payloads.length === 0) {
            setNotice(`Các sản phẩm trong đơn ${order.code} hiện đã hết hàng.`);
            return;
        }
        payloads.forEach((payload) => dispatch(addToCart(payload)));
        navigate("/cart");
    };

    const changeFilter = (next: StatusFilter) => {
        setSearchParams(next === "all" ? {} : {status: next}, {replace: true});
    };

    return (
        <>
            <nav className="breadcrumb" aria-label="Đường dẫn">
                <ol>
                    <li><Link to="/">Trang chủ</Link></li>
                    <li aria-current="page">Lịch sử đơn hàng</li>
                </ol>
            </nav>
            <div className="checkoutHead">
                <h1 className="checkoutTitle">Lịch sử đơn hàng</h1>
                <p className="historyIntro">Xem lại các đơn đã đặt và theo dõi trạng thái giao hàng.</p>
            </div>
            {sorted.length === 0 ? (
                <div className="cartEmpty">
                    <p className="cartEmptyTitle">Bạn chưa có đơn hàng nào</p>
                    <p>Hãy chọn vali hoặc balo yêu thích để đặt đơn đầu tiên.</p>
                    <Link to="/products" className="btn btnDark">Xem tất cả vali</Link>
                </div>
            ) : (
                <>
                    {notice && <p className="formNotice" role="status">{notice}</p>}
                    <OrderTabs active={filter} counts={counts} onChange={changeFilter} />
                    {visible.length === 0 ? (
                        <p className="historyEmpty" role="status">Chưa có đơn hàng nào ở trạng thái này.</p>
                    ) : (
                        <ul className="orderList">
                            {visible.map((order) => (
                                <OrderCard
                                    key={order.code}
                                    order={order}
                                    products={products}
                                    onCancel={handleCancel}
                                    onReorder={handleReorder}
                                />
                            ))}
                        </ul>
                    )}
                </>
            )}
        </>
    );
}
