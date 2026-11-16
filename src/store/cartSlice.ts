import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {clampQuantity, MAX_QUANTITY} from '../lib/productDetail/options.ts'

const STORAGE_KEY = 'valigo:cart'

export interface CartLine {
    key: string
    productId: number
    color: string
    size: string
    quantity: number
}

export interface CartState {
    lines: CartLine[]
}

export interface AddToCartPayload {
    productId: number
    color: string
    size: string
    quantity: number
}

export function lineKey({productId, color, size}: Omit<AddToCartPayload, 'quantity'>): string {
    return `${productId}|${color}|${size}`
}

function isCartLine(value: unknown): value is CartLine {
    if (typeof value !== 'object' || value === null) return false
    const line = value as Record<string, unknown>
    return typeof line.key === 'string'
        && typeof line.productId === 'number'
        && typeof line.color === 'string'
        && typeof line.size === 'string'
        && typeof line.quantity === 'number'
}

export function loadCart(): CartLine[] {
    try {
        const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
        return Array.isArray(parsed) ? parsed.filter(isCartLine) : []
    } catch {
        return []
    }
}

export function saveCart(lines: CartLine[]): void {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
        return
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {lines: loadCart()} as CartState,
    reducers: {
        addToCart(state, action: PayloadAction<AddToCartPayload>) {
            const key = lineKey(action.payload)
            const existing = state.lines.find((line) => line.key === key)
            if (existing) {
                existing.quantity = Math.min(MAX_QUANTITY, existing.quantity + action.payload.quantity)
            } else {
                state.lines.push({...action.payload, key, quantity: clampQuantity(action.payload.quantity)})
            }
        },
        setLineQuantity(state, action: PayloadAction<{key: string, quantity: number}>) {
            const line = state.lines.find((item) => item.key === action.payload.key)
            if (line) line.quantity = clampQuantity(action.payload.quantity)
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.lines = state.lines.filter((line) => line.key !== action.payload)
        },
        clearCart(state) {
            state.lines = []
        },
    },
})

export const {addToCart, setLineQuantity, removeFromCart, clearCart} = cartSlice.actions
export default cartSlice.reducer

type WithCart = {cart: CartState}

export const selectCartLines = (state: WithCart) => state.cart.lines
export const selectCartCount = (state: WithCart) =>
    state.cart.lines.reduce((total, line) => total + line.quantity, 0)
