import type {ProductReview} from '../../types/Product.ts'

export const STAR_LEVELS = [5, 4, 3, 2, 1] as const

export interface StarCount {
    star: number
    count: number
    percent: number
}

export function countByStar(reviews: ProductReview[]): StarCount[] {
    const total = reviews.length
    return STAR_LEVELS.map((star) => {
        const count = reviews.filter((review) => review.rating === star).length
        return {star, count, percent: total === 0 ? 0 : Math.round((count / total) * 100)}
    })
}

export function formatRating(rating: number): string {
    return String(rating).replace('.', ',')
}
