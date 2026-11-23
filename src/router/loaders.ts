import {store} from "../store";
import {loadProducts} from "../store/productsSlice.ts";

export async function productsLoader() {
    await store.dispatch(loadProducts());
    return null;
}
