import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

const STORAGE_KEY = 'valigo:wishlist'

export interface WishlistState {
    ids: number[]
}

export function loadWishlist(): number[] {
    try {
        const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
        return Array.isArray(parsed) ? parsed.filter((id): id is number => typeof id === 'number') : []
    } catch {
        return []
    }
}

export function saveWishlist(ids: number[]): void {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
    }
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {ids: loadWishlist()} as WishlistState,
    reducers: {
        toggleWish(state, action: PayloadAction<number>) {
            const index = state.ids.indexOf(action.payload)
            if (index >= 0) state.ids.splice(index, 1)
            else state.ids.push(action.payload)
        },
    },
})

export const {toggleWish} = wishlistSlice.actions
export default wishlistSlice.reducer

export const selectWishIds = (state: {wishlist: WishlistState}) => state.wishlist.ids
