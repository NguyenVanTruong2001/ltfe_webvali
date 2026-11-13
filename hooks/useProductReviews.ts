import {useMemo} from 'react'
import type {Product} from '../types/Product.ts'
import {useAppSelector} from '../store/hooks.ts'
import {selectStoredReviews} from '../store/reviewsSlice.ts'
import {combineScore, mergeReviews} from '../lib/productReviews/merge.ts'

export function useProductReviews(product: Product) {
    const stored = useAppSelector(selectStoredReviews)
    const reviews = useMemo(() => mergeReviews(product, stored), [product, stored])
    const score = useMemo(() => combineScore(product, reviews), [product, reviews])
    return {reviews, rating: score.rating, count: score.count}
}
