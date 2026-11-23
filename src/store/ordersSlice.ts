import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {reviewEligibility} from '../lib/orders/eligibility.ts'
import type {ReviewEligibility} from '../lib/orders/eligibility.ts'
import {SEED_ORDERS} from '../lib/orders/seed.ts'
import type {Order} from '../types/Order.ts'

const STORAGE_KEY = 'valigo:orders'

export interface OrdersState {
    items: Order[]
}

function loadOrders(): Order[] {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (!raw) return SEED_ORDERS
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_ORDERS
    } catch {
        return SEED_ORDERS
    }
}

function saveOrders(items: Order[]): void {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
        return
    }
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {items: loadOrders()} as OrdersState,
    reducers: {
        addOrder(state, action: PayloadAction<Order>) {
            state.items.unshift(action.payload)
            saveOrders(state.items)
        },
        cancelOrder(state, action: PayloadAction<string>) {
            const target = state.items.find((o) => o.code === action.payload)
            if (target && target.status === 'pending') {
                target.status = 'cancelled'
                saveOrders(state.items)
            }
        },
    },
})

export const {addOrder, cancelOrder} = ordersSlice.actions
export default ordersSlice.reducer

export const selectOrders = (state: {orders: OrdersState}) => state.orders.items
export const selectOrderByCode = (state: {orders: OrdersState}, code: string | undefined) =>
    state.orders.items.find((o) => o.code === code)

export const selectReviewEligibility = (state: {orders: OrdersState}, productId: number): ReviewEligibility =>
    reviewEligibility(state.orders.items, productId)