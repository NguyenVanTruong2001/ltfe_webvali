import {useCallback, useMemo} from 'react'
import {useSearchParams} from 'react-router-dom'
import type {Product} from '../types/Product.ts'
import {FILTER_GROUPS} from '../lib/productList/filterConfig.ts'
import type {SortKey} from '../lib/productList/filterConfig.ts'
import {
    applyFilters,
    listActiveFilters,
    removeOption,
    sortProducts,
    toggleOption,
} from '../lib/productList/filtering.ts'
import {buildSearchParams, PAGE_SIZE, parseSearch} from '../lib/productList/urlState.ts'
import type {ListState} from '../lib/productList/urlState.ts'

export function useProductFilters(products: Product[]) {
    const [searchParams, setSearchParams] = useSearchParams()
    const state = useMemo(() => parseSearch(searchParams), [searchParams])
    const keyword = searchParams.get('q') ?? ''

    const filtered = useMemo(
        () => sortProducts(applyFilters(products, state.filters, undefined, keyword), state.sort),
        [products, state.filters, state.sort, keyword],
    )
    const activeFilters = useMemo(() => listActiveFilters(state.filters), [state.filters])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const page = Math.min(state.page, totalPages)
    const pageItems = useMemo(
        () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        [filtered, page],
    )

    const update = useCallback(
        (change: (current: ListState) => ListState) => {
            setSearchParams((previous) => {
                const nextParams = buildSearchParams(change(parseSearch(previous)))
                const currentQ = previous.get('q')
                if (currentQ) {
                    nextParams.set('q', currentQ)
                }
                return nextParams
            })
        },
        [setSearchParams],
    )

    const toggle = useCallback(
        (groupKey: string, value: string) => {
            const group = FILTER_GROUPS.find((g) => g.key === groupKey)
            if (group) update((s) => ({...s, page: 1, filters: toggleOption(s.filters, group, value)}))
        },
        [update],
    )

    const remove = useCallback(
        (groupKey: string, value: string) => {
            update((s) => ({...s, page: 1, filters: removeOption(s.filters, groupKey, value)}))
        },
        [update],
    )

    const clear = useCallback(() => {
        setSearchParams({})
    }, [setSearchParams])

    const setSort = useCallback((sort: SortKey) => update((s) => ({...s, page: 1, sort})), [update])

    const searchFor = useCallback(
        (target: number) => {
            const nextParams = buildSearchParams({...state, page: target})
            if (keyword) {
                nextParams.set('q', keyword)
            }
            const query = nextParams.toString()
            return query ? `?${query}` : ''
        },
        [state, keyword],
    )

    return {
        filters: state.filters,
        sort: state.sort,
        setSort,
        total: filtered.length,
        pageItems,
        page,
        totalPages,
        pageSize: PAGE_SIZE,
        searchFor,
        activeFilters,
        toggle,
        remove,
        clear,
    }
}