import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../store/hooks.ts'
import {loadProducts, selectProducts, selectProductsError, selectProductsStatus} from '../store/productsSlice.ts'

export function useProducts() {
    const dispatch = useAppDispatch()
    const products = useAppSelector(selectProducts)
    const status = useAppSelector(selectProductsStatus)
    const error = useAppSelector(selectProductsError)

    useEffect(() => {
        dispatch(loadProducts())
    }, [dispatch])

    return {products, status, error, reload: () => dispatch(loadProducts())}
}
