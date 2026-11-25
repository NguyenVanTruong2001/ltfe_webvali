import {store} from "../store";
import {loadProducts} from "../store/productsSlice.ts";
import {fetchOrders} from "../store/ordersSlice.ts";

export async function productsLoader() {
    await store.dispatch(loadProducts());
    return null;
}

export async function ordersLoader() {
    await Promise.all([
        store.dispatch(loadProducts()),
        store.dispatch(fetchOrders()),
    ]);
    return null;
}