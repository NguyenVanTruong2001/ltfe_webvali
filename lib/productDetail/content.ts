export interface Perk {
    icon: string
    title: string
    text: string
}

export const PERKS: Perk[] = [
    {icon: 'iTruck', title: 'Miễn phí vận chuyển', text: 'Cho đơn từ 1.000.000₫'},
    {icon: 'iRefresh', title: 'Đổi trả trong 7 ngày', text: 'Nếu sản phẩm lỗi do nhà sản xuất'},
    {icon: 'iShield', title: 'Bảo hành chính hãng', text: 'Sửa bánh xe, tay kéo, khóa tại mọi cửa hàng'},
]

export interface PolicySection {
    title: string
    text: string
}

export const WARRANTY_POLICY: PolicySection[] = [
    {
        title: 'Bảo hành chính hãng',
        text: 'Bảo hành miễn phí các lỗi do nhà sản xuất như bánh xe, tay kéo, khóa và đường may, tại mọi cửa hàng trong hệ thống.',
    },
    {
        title: 'Đổi trả trong 7 ngày',
        text: 'Đổi sản phẩm mới nếu có lỗi do nhà sản xuất. Sản phẩm cần còn đủ phụ kiện, tem và chưa qua sử dụng sai cách.',
    },
    {
        title: 'Không áp dụng bảo hành khi',
        text: 'Vali móp méo, trầy xước do va đập hoặc tự ý sửa chữa, tháo lắp bởi nơi không thuộc hệ thống.',
    },
]

export const TABS = [
    {key: 'desc', label: 'Mô tả'},
    {key: 'spec', label: 'Thông số kỹ thuật'},
    {key: 'review', label: 'Đánh giá'},
    {key: 'warranty', label: 'Bảo hành và đổi trả'},
] as const

export type TabKey = typeof TABS[number]['key']

export const DEFAULT_TAB: TabKey = 'desc'

export function parseTab(value: string | null): TabKey {
    return TABS.find((tab) => tab.key === value)?.key ?? DEFAULT_TAB
}
