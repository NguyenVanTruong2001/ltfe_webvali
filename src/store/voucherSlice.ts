import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

const STORAGE_KEY = 'valigo:voucher'

export interface VoucherState {
    code: string | null
}

export function loadVoucher(): string | null {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        return stored ? stored : null
    } catch {
        return null
    }
}

export function saveVoucher(code: string | null): void {
    try {
        if (code) window.localStorage.setItem(STORAGE_KEY, code)
        else window.localStorage.removeItem(STORAGE_KEY)
    } catch {
        return
    }
}

const voucherSlice = createSlice({
    name: 'voucher',
    initialState: {code: loadVoucher()} as VoucherState,
    reducers: {
        applyVoucher(state, action: PayloadAction<string>) {
            state.code = action.payload
        },
        removeVoucher(state) {
            state.code = null
        },
    },
})

export const {applyVoucher, removeVoucher} = voucherSlice.actions
export default voucherSlice.reducer

type WithVoucher = {voucher: VoucherState}

export const selectVoucherCode = (state: WithVoucher) => state.voucher.code
