export const REVIEW_PAGE_SIZE = 5

export const REVIEW_SORTS = [
    {value: 'newest', label: 'Mới nhất'},
    {value: 'oldest', label: 'Cũ nhất'},
    {value: 'highest', label: 'Điểm cao nhất'},
    {value: 'lowest', label: 'Điểm thấp nhất'},
] as const

export type ReviewSortKey = typeof REVIEW_SORTS[number]['value']

export const DEFAULT_REVIEW_SORT: ReviewSortKey = 'newest'

export interface ReviewListState {
    star: number | null
    sort: ReviewSortKey
    page: number
}

export function parseReviewSearch(params: URLSearchParams): ReviewListState {
    const star = Number.parseInt(params.get('star') ?? '', 10)
    const page = Number.parseInt(params.get('page') ?? '', 10)

    return {
        star: Number.isInteger(star) && star >= 1 && star <= 5 ? star : null,
        sort: REVIEW_SORTS.find((option) => option.value === params.get('sort'))?.value ?? DEFAULT_REVIEW_SORT,
        page: Number.isInteger(page) && page > 0 ? page : 1,
    }
}

export function buildReviewSearch({star, sort, page}: ReviewListState): URLSearchParams {
    const params = new URLSearchParams()

    if (star !== null) params.set('star', String(star))
    if (sort !== DEFAULT_REVIEW_SORT) params.set('sort', sort)
    if (page > 1) params.set('page', String(page))

    return params
}
