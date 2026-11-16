import type {Product} from '../../types/Product.ts'
import {FILTER_GROUPS} from './filterConfig.ts'
import type {FilterGroup, FilterOption, SortKey} from './filterConfig.ts'

export type FilterState = Record<string, string[]>

export interface ActiveFilter {
    groupKey: string
    value: string
    label: string
}

export function selectedOf(state: FilterState, group: FilterGroup): string[] {
    return state[group.key] ?? []
}

export function isChecked(state: FilterState, group: FilterGroup, option: FilterOption): boolean {
    const selected = selectedOf(state, group)
    if (group.input === 'radio' && option.value === 'all') return selected.length === 0
    return selected.includes(option.value)
}

function matchesGroup(product: Product, group: FilterGroup, selected: string[]): boolean {
    if (selected.length === 0) return true
    return group.options.some((o) => selected.includes(o.value) && (o.test ? o.test(product) : true))
}


export function applyFilters(products: Product[], state: FilterState, skipKey?: string): Product[] {
    return products.filter((product) =>
        FILTER_GROUPS.every((group) => group.key === skipKey || matchesGroup(product, group, selectedOf(state, group))),
    )
}


export function countOption(products: Product[], state: FilterState, group: FilterGroup, option: FilterOption): number {
    const pool = applyFilters(products, state, group.key)
    return option.test ? pool.filter(option.test).length : pool.length
}

export function toggleOption(state: FilterState, group: FilterGroup, value: string): FilterState {
    const selected = selectedOf(state, group)

    if (group.input === 'radio') {

        const next = value === 'all' || selected.includes(value) ? [] : [value]
        return {...state, [group.key]: next}
    }

    const next = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]
    return {...state, [group.key]: next}
}

export function removeOption(state: FilterState, groupKey: string, value: string): FilterState {
    return {...state, [groupKey]: (state[groupKey] ?? []).filter((v) => v !== value)}
}

export function listActiveFilters(state: FilterState): ActiveFilter[] {
    return FILTER_GROUPS.flatMap((group) =>
        selectedOf(state, group).flatMap((value) => {
            const option = group.options.find((o) => o.value === value)
            return option ? [{groupKey: group.key, value, label: chipLabel(group, option)}] : []
        }),
    )
}

function chipLabel(group: FilterGroup, option: FilterOption): string {
    if (group.key === 'size') return `Size ${option.value}`
    if (group.key === 'color') return `Màu ${option.label.toLowerCase()}`
    return option.label
}

const comparators: Record<SortKey, (a: Product, b: Product) => number> = {

    'newest': (a, b) => Number(b.isNewArrival) - Number(a.isNewArrival) || b.id - a.id,
    'bestseller': (a, b) => Number(b.isBestSeller) - Number(a.isBestSeller) || b.reviewCount - a.reviewCount,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'discount': (a, b) => b.discountPercent - a.discountPercent,
    'rating': (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
}

export function sortProducts(products: Product[], sort: SortKey): Product[] {
    return [...products].sort(comparators[sort])
}
