import {useAppSelector} from '../store/hooks.ts'
import {selectReviewEligibility} from '../store/ordersSlice.ts'

export function useReviewEligibility(productId: number) {
    return useAppSelector((state) => selectReviewEligibility(state, productId))
}
