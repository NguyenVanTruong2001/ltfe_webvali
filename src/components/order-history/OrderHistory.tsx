import {useMemo} from "react";
import {Link, useSearchParams} from "react-router";
import OrderCard from "./OrderCard.tsx";
import OrderTabs from "./OrderTabs.tsx";
import {useAppSelector} from "../../store/hooks.ts";
import {selectOrders} from "../../store/ordersSlice.ts";
import {selectProducts} from "../../store/productsSlice.ts";
import {countByFilter, filterOrders, parseFilter, sortNewestFirst} from "../../lib/orders/history.ts";
import type {StatusFilter} from "../../lib/orders/history.ts";

export default function OrderHistory() {
    const orders = useAppSelector(selectOrders);
    const products = useAppSelector(selectProducts);
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = parseFilter(searchParams.get("status"));
    const sorted = useMemo(() => sortNewestFirst(orders), [orders]);
    const counts = useMemo(() => countByFilter(sorted), [sorted]);
    const visible = useMemo(() => filterOrders(sorted, filter), [sorted, filter]);

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
                    <OrderTabs active={filter} counts={counts} onChange={changeFilter} />
                    {visible.length === 0 ? (
                        <p className="historyEmpty" role="status">Chưa có đơn hàng nào ở trạng thái này.</p>
                    ) : (
                        <ul className="orderList">
                            {visible.map((order) => (
                                <OrderCard key={order.code} order={order} products={products} />
                            ))}
                        </ul>
                    )}
                </>
            )}
        </>
    );
}
