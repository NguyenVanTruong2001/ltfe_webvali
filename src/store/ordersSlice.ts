import {createSlice} from '@reduxjs/toolkit'
import {reviewEligibility} from '../lib/orders/eligibility.ts'
import type {ReviewEligibility} from '../lib/orders/eligibility.ts'
import {SEED_ORDERS} from '../lib/orders/seed.ts'
import type {Order} from '../types/Order.ts'

export interface OrdersState {
    items: Order[]
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {items: SEED_ORDERS} as OrdersState,
    reducers: {},
})

export default ordersSlice.reducer

export const selectReviewEligibility = (state: {orders: OrdersState}, productId: number): ReviewEligibility =>
    reviewEligibility(state.orders.items, productId)
