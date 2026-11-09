import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {fetchProducts} from '../services/productService.ts'
import type {Product} from '../types/Product.ts'

export interface ProductsState {
    items: Product[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: ProductsState = {items: [], status: 'idle', error: null}

export const loadProducts = createAsyncThunk<Product[], void, {state: {products: ProductsState}}>(
    'products/load',
    (_arg, {signal}) => fetchProducts(signal),
    {
        // Không gọi lại khi đang tải / đã tải xong (StrictMode chạy useEffect hai lần ở môi trường dev)
        condition: (_arg, {getState}) => ['idle', 'failed'].includes(getState().products.status),
    },
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadProducts.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(loadProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(loadProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Không tải được sản phẩm'
            })
    },
})

export default productsSlice.reducer

type WithProducts = {products: ProductsState}

export const selectProducts = (state: WithProducts) => state.products.items
export const selectProductsStatus = (state: WithProducts) => state.products.status
export const selectProductsError = (state: WithProducts) => state.products.error
