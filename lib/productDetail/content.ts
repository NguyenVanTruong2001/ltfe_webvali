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
