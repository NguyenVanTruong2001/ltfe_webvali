import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {ProductReview} from '../types/Product.ts'

const STORAGE_KEY = 'valigo:reviews'
const HELPFUL_KEY = 'valigo:reviewHelpful'

export interface StoredReview extends ProductReview {
    productId: number
}

export interface ReviewsState {
    items: StoredReview[]
    helpful: string[]
}

export interface ReviewEdit {
    id: string
    rating: number
    userName: string
    comment: string
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

export function loadHelpful(): string[] {
    try {
        const parsed: unknown = JSON.parse(window.localStorage.getItem(HELPFUL_KEY) ?? '[]')
        return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
    } catch {
        return []
    }
}

export function saveHelpful(ids: string[]): void {
    try {
        window.localStorage.setItem(HELPFUL_KEY, JSON.stringify(ids))
    } catch {
    }
}

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {items: loadReviews(), helpful: loadHelpful()} as ReviewsState,
    reducers: {
        addReview(state, action: PayloadAction<StoredReview>) {
            state.items.push(action.payload)
        },
        updateReview(state, action: PayloadAction<ReviewEdit>) {
            const review = state.items.find((item) => item.id === action.payload.id)
            if (!review) return
            review.rating = action.payload.rating
            review.userName = action.payload.userName
            review.comment = action.payload.comment
        },
        removeReview(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.id !== action.payload)
            state.helpful = state.helpful.filter((id) => id !== action.payload)
        },
        toggleHelpful(state, action: PayloadAction<string>) {
            const index = state.helpful.indexOf(action.payload)
            if (index >= 0) state.helpful.splice(index, 1)
            else state.helpful.push(action.payload)
        },
    },
})

export const {addReview, updateReview, removeReview, toggleHelpful} = reviewsSlice.actions
export default reviewsSlice.reducer

export const selectStoredReviews = (state: {reviews: ReviewsState}) => state.reviews.items
export const selectHelpfulIds = (state: {reviews: ReviewsState}) => state.reviews.helpful
