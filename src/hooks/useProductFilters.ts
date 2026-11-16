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

    const filtered = useMemo(
        () => sortProducts(applyFilters(products, state.filters), state.sort),
        [products, state.filters, state.sort],
    )
    const activeFilters = useMemo(() => listActiveFilters(state.filters), [state.filters])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const page = Math.min(state.page, totalPages)
    const pageItems = useMemo(
        () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        [filtered, page],
    )

    const update = useCallback((change: (current: ListState) => ListState) => {
        setSearchParams((previous) => buildSearchParams(change(parseSearch(previous))))
    }, [setSearchParams])

    const toggle = useCallback((groupKey: string, value: string) => {
        const group = FILTER_GROUPS.find((g) => g.key === groupKey)
        if (group) update((s) => ({...s, page: 1, filters: toggleOption(s.filters, group, value)}))
    }, [update])

    const remove = useCallback((groupKey: string, value: string) => {
        update((s) => ({...s, page: 1, filters: removeOption(s.filters, groupKey, value)}))
    }, [update])

    const clear = useCallback(() => update((s) => ({...s, page: 1, filters: {}})), [update])
    const setSort = useCallback((sort: SortKey) => update((s) => ({...s, page: 1, sort})), [update])

    const searchFor = useCallback((target: number) => {
        const query = buildSearchParams({...state, page: target}).toString()
        return query ? `?${query}` : ''
    }, [state])

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
