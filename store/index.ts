import {configureStore} from '@reduxjs/toolkit'
import cartReducer, {saveCart} from './cartSlice.ts'
import productsReducer from './productsSlice.ts'
import reviewsReducer, {saveHelpful, saveReviews} from './reviewsSlice.ts'
import wishlistReducer, {saveWishlist} from './wishlistSlice.ts'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
        reviews: reviewsReducer,
    },
})

function persistOnChange<T>(select: (state: ReturnType<typeof store.getState>) => T, save: (value: T) => void) {
    let saved = select(store.getState())
    store.subscribe(() => {
        const current = select(store.getState())
        if (current !== saved) {
            saved = current
            save(current)
        }
    })
}

persistOnChange((state) => state.wishlist.ids, saveWishlist)
persistOnChange((state) => state.cart.lines, saveCart)
persistOnChange((state) => state.reviews.items, saveReviews)
persistOnChange((state) => state.reviews.helpful, saveHelpful)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
