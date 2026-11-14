import {useMemo} from 'react'
import {useAppSelector} from '../store/hooks.ts'
import {selectCartLines} from '../store/cartSlice.ts'
import {selectProducts} from '../store/productsSlice.ts'
import {buildEntries, savingsOf, subtotalOf, totalQuantity} from '../lib/cart/pricing.ts'

export function useCartEntries() {
    const lines = useAppSelector(selectCartLines)
    const products = useAppSelector(selectProducts)
    const entries = useMemo(() => buildEntries(lines, products), [lines, products])
    const subtotal = useMemo(() => subtotalOf(entries), [entries])
    const quantity = useMemo(() => totalQuantity(entries), [entries])
    const savings = useMemo(() => savingsOf(entries), [entries])
    return {entries, subtotal, quantity, savings}
}
