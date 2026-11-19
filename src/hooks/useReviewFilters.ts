import {useCallback, useMemo} from 'react'
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom'
import type {ProductReview} from '../types/Product.ts'
import {filterByStar, paginate, sortReviews} from '../lib/productReviews/filtering.ts'
import {buildReviewSearch, parseReviewSearch, REVIEW_PAGE_SIZE} from '../lib/productReviews/urlState.ts'
import type {ReviewListState, ReviewSortKey} from '../lib/productReviews/urlState.ts'

export function useReviewFilters<T extends ProductReview>(reviews: T[]) {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const {hash} = useLocation()
    const state = useMemo(() => parseReviewSearch(searchParams), [searchParams])

    const filtered = useMemo(
        () => sortReviews(filterByStar(reviews, state.star), state.sort),
        [reviews, state.star, state.sort],
    )
    const view = useMemo(() => paginate(filtered, state.page, REVIEW_PAGE_SIZE), [filtered, state.page])

    const update = useCallback((change: (current: ReviewListState) => ReviewListState) => {
        setSearchParams((previous) => buildReviewSearch(change(parseReviewSearch(previous))))
    }, [setSearchParams])

    const setStar = useCallback((star: number | null) => {
        update((current) => ({...current, star: current.star === star ? null : star, page: 1}))
    }, [update])

    const setSort = useCallback((sort: ReviewSortKey) => {
        update((current) => ({...current, sort, page: 1}))
    }, [update])

    const reset = useCallback(() => {
        navigate({search: '', hash}, {replace: true})
    }, [navigate, hash])

    const searchForPage = useCallback((page: number) => {
        return buildReviewSearch({...state, page}).toString()
    }, [state])

    const searchForStar = useCallback((star: number) => {
        return buildReviewSearch({...state, star: state.star === star ? null : star, page: 1}).toString()
    }, [state])

    return {
        star: state.star,
        sort: state.sort,
        page: view.page,
        totalPages: view.totalPages,
        total: filtered.length,
        items: view.items,
        setStar,
        setSort,
        reset,
        searchForPage,
        searchForStar,
    }
}
