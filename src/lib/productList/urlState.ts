import {FILTER_GROUPS, SORT_OPTIONS} from './filterConfig.ts'
import type {SortKey} from './filterConfig.ts'
import type {FilterState} from './filtering.ts'

export const PAGE_SIZE = 9
export const DEFAULT_SORT: SortKey = 'newest'

export interface ListState {
    filters: FilterState
    sort: SortKey
    page: number
}

const LEGACY_VALUES: Record<string, Record<string, string>> = {
    size: {'20': 'S', '24': 'M', '28': 'L'},
}

export function parseSearch(params: URLSearchParams): ListState {
    const filters: FilterState = {}

    for (const group of FILTER_GROUPS) {
        const raw = (params.get(group.key) ?? '').split(',').filter(Boolean)
        const values = raw
            .map((value) => LEGACY_VALUES[group.key]?.[value] ?? value)
            .filter((value) => value !== 'all' && group.options.some((option) => option.value === value))
        const unique = [...new Set(values)]

        if (unique.length > 0) {
            filters[group.key] = group.input === 'radio' ? unique.slice(0, 1) : unique
        }
    }

    const sort = SORT_OPTIONS.find((option) => option.value === params.get('sort'))?.value ?? DEFAULT_SORT

    const page = Number.parseInt(params.get('page') ?? '', 10)

    return {filters, sort, page: Number.isInteger(page) && page > 0 ? page : 1}
}

export function buildSearchParams({filters, sort, page}: ListState): URLSearchParams {
    const params = new URLSearchParams()

    for (const group of FILTER_GROUPS) {
        const selected = filters[group.key] ?? []
        if (selected.length > 0) params.set(group.key, selected.join(','))
    }
    if (sort !== DEFAULT_SORT) params.set('sort', sort)
    if (page > 1) params.set('page', String(page))

    return params
}
