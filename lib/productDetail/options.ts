import type {Product} from '../../types/Product.ts'

export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 10

export interface OptionsState {
    imageIndex: number
    color: string
    size: string
    quantity: number
}

export type OptionsAction =
    | {type: 'selectImage', index: number}
    | {type: 'selectColor', color: string}
    | {type: 'selectSize', size: string}
    | {type: 'setQuantity', quantity: number}

export function clampQuantity(quantity: number): number {
    return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Math.trunc(quantity)))
}

export function initOptions(product: Product): OptionsState {
    return {
        imageIndex: 0,
        color: product.colors[0]?.name ?? '',
        size: product.sizes.includes('M') ? 'M' : product.sizes[0] ?? '',
        quantity: MIN_QUANTITY,
    }
}

export function optionsReducer(state: OptionsState, action: OptionsAction): OptionsState {
    switch (action.type) {
        case 'selectImage':
            return {...state, imageIndex: action.index}
        case 'selectColor':
            return {...state, color: action.color}
        case 'selectSize':
            return {...state, size: action.size}
        case 'setQuantity':
            return Number.isFinite(action.quantity) ? {...state, quantity: clampQuantity(action.quantity)} : state
    }
}
