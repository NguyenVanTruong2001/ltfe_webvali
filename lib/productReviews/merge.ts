import type {Product, ProductReview} from '../../types/Product.ts'
import type {StoredReview} from '../../store/reviewsSlice.ts'

export interface DisplayReview extends ProductReview {
    own: boolean
}

export function mergeReviews(product: Product, stored: StoredReview[]): DisplayReview[] {
    const base = (product.reviews ?? []).map((review) => ({...review, own: false}))
    const mine = stored
        .filter((review) => review.productId === product.id)
        .map((review) => ({
            id: review.id,
            userName: review.userName,
            rating: review.rating,
            comment: review.comment,
            date: review.date,
            own: true,
        }))
    return [...base, ...mine]
}

export function combineScore(product: Product, reviews: DisplayReview[]): {rating: number, count: number} {
    const mine = reviews.filter((review) => review.own)
    if (mine.length === 0) return {rating: product.rating, count: product.reviewCount}

    const count = product.reviewCount + mine.length
    const total = product.rating * product.reviewCount + mine.reduce((sum, review) => sum + review.rating, 0)
    return {rating: Math.round((total / count) * 10) / 10, count}
}
