import {useCallback, useReducer} from 'react'
import type {Product} from '../types/Product.ts'
import {initOptions, optionsReducer} from '../lib/productDetail/options.ts'

export function useProductOptions(product: Product) {
    const [state, dispatch] = useReducer(optionsReducer, product, initOptions)

    const selectImage = useCallback((index: number) => dispatch({type: 'selectImage', index}), [])
    const selectColor = useCallback((color: string) => dispatch({type: 'selectColor', color}), [])
    const selectSize = useCallback((size: string) => dispatch({type: 'selectSize', size}), [])
    const setQuantity = useCallback((quantity: number) => dispatch({type: 'setQuantity', quantity}), [])

    return {...state, selectImage, selectColor, selectSize, setQuantity}
}
