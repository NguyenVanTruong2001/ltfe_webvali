import {configureStore} from '@reduxjs/toolkit'
import productsReducer from './productsSlice.ts'
import wishlistReducer, {saveWishlist} from './wishlistSlice.ts'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        wishlist: wishlistReducer,
    },
})

let savedWishIds = store.getState().wishlist.ids
store.subscribe(() => {
    const {ids} = store.getState().wishlist
    if (ids !== savedWishIds) {
        savedWishIds = ids
        saveWishlist(ids)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
