import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {reviewEligibility} from '../lib/orders/eligibility.ts'
import type {ReviewEligibility} from '../lib/orders/eligibility.ts'
import {SEED_ORDERS} from '../lib/orders/seed.ts'
import {ordersApi} from '../services/ordersApi.ts'
import type {Order} from '../types/Order.ts'

export interface OrdersState {
    items: Order[]
    loading: boolean
    error: string | null
}

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    return await ordersApi.fetchOrders()
})

export const createOrderAsync = createAsyncThunk('orders/createOrder', async (order: Order) => {
    return await ordersApi.createOrder(order)
})

export const cancelOrderAsync = createAsyncThunk('orders/cancelOrder', async (code: string) => {
    return await ordersApi.cancelOrder(code)
})

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        items: SEED_ORDERS,
        loading: false,
        error: null,
    } as OrdersState,
    reducers: {
        addOrder(state, action: PayloadAction<Order>) {
            state.items.unshift(action.payload)
            void ordersApi.createOrder(action.payload)
        },
        cancelOrder(state, action: PayloadAction<string>) {
            const target = state.items.find((o) => o.code === action.payload)
            if (target && target.status === 'pending') {
                target.status = 'cancelled'
                void ordersApi.cancelOrder(action.payload)
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Lỗi tải danh sách đơn hàng'
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.items.unshift(action.payload)
            })
            .addCase(cancelOrderAsync.fulfilled, (state, action) => {
                const idx = state.items.findIndex((o) => o.code === action.payload.code)
                if (idx !== -1) {
                    state.items[idx] = action.payload
                }
            })
    },
})

export const {addOrder, cancelOrder} = ordersSlice.actions
export default ordersSlice.reducer

export const selectOrders = (state: {orders: OrdersState}) => state.orders.items
export const selectOrdersLoading = (state: {orders: OrdersState}) => state.orders.loading
export const selectOrderByCode = (state: {orders: OrdersState}, code: string | undefined) =>
    state.orders.items.find((o) => o.code === code)

export const selectReviewEligibility = (state: {orders: OrdersState}, productId: number): ReviewEligibility =>
    reviewEligibility(state.orders.items, productId)