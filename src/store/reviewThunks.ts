import type {OrdersState} from './ordersSlice.ts'
import {selectReviewEligibility} from './ordersSlice.ts'
import {addReview} from './reviewsSlice.ts'
import type {StoredReview} from './reviewsSlice.ts'
import type {AppDispatch} from './index.ts'

export const submitReview = (review: StoredReview) =>
    (dispatch: AppDispatch, getState: () => {orders: OrdersState}): boolean => {
        if (selectReviewEligibility(getState(), review.productId) !== 'allowed') return false
        dispatch(addReview(review))
        return true
    }
