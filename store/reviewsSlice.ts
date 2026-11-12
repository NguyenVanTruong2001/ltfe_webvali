import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {ProductReview} from '../types/Product.ts'

const STORAGE_KEY = 'valigo:reviews'

export interface StoredReview extends ProductReview {
    productId: number
}

export interface ReviewsState {
    items: StoredReview[]
}

function isStoredReview(value: unknown): value is StoredReview {
    if (typeof value !== 'object' || value === null) return false
    const review = value as Record<string, unknown>
    return typeof review.id === 'string'
        && typeof review.productId === 'number'
        && typeof review.userName === 'string'
        && typeof review.rating === 'number'
        && typeof review.comment === 'string'
        && typeof review.date === 'string'
}

export function loadReviews(): StoredReview[] {
    try {
        const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
        return Array.isArray(parsed) ? parsed.filter(isStoredReview) : []
    } catch {
        return []
    }
}

export function saveReviews(items: StoredReview[]): void {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
    }
}

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {items: loadReviews()} as ReviewsState,
    reducers: {
        addReview(state, action: PayloadAction<StoredReview>) {
            state.items.push(action.payload)
        },
    },
})

export const {addReview} = reviewsSlice.actions
export default reviewsSlice.reducer

export const selectStoredReviews = (state: {reviews: ReviewsState}) => state.reviews.items
