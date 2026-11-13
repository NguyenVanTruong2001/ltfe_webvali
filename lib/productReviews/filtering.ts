import type {ProductReview} from '../../types/Product.ts'
import type {ReviewSortKey} from './urlState.ts'

export function filterByStar<T extends ProductReview>(reviews: T[], star: number | null): T[] {
    return star === null ? reviews : reviews.filter((review) => review.rating === star)
}

export function sortReviews<T extends ProductReview>(reviews: T[], sort: ReviewSortKey): T[] {
    const byDate = (a: T, b: T) => a.date.localeCompare(b.date)
    const sorted = [...reviews]

    switch (sort) {
        case 'oldest':
            return sorted.sort(byDate)
        case 'highest':
            return sorted.sort((a, b) => b.rating - a.rating || byDate(b, a))
        case 'lowest':
            return sorted.sort((a, b) => a.rating - b.rating || byDate(b, a))
        default:
            return sorted.sort((a, b) => byDate(b, a))
    }
}

export function paginate<T>(items: T[], page: number, pageSize: number): {items: T[], page: number, totalPages: number} {
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
    const current = Math.min(Math.max(page, 1), totalPages)
    return {items: items.slice((current - 1) * pageSize, current * pageSize), page: current, totalPages}
}
