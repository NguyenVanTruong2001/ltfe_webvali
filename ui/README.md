# Valigo - giao diện trang chủ (HTML/CSS thuần)

Mở `ui/index.html` bằng trình duyệt là xem được (cần mạng để tải phông Google Fonts).
Khi chạy `npm run dev` cũng xem được tại `http://localhost:5173/ui/index.html`.

```
ui/
  index.html      toàn bộ trang chủ
  css/style.css   toàn bộ CSS
```

Không có JavaScript. Chỉ có hai thứ hoạt động bằng CSS: mega menu (rê chuột hoặc Tab vào mục Vali, Balo, Tin tức)
và menu trên điện thoại (bấm biểu tượng ba gạch ở màn hình hẹp).

## Quy ước đặt tên

Class, id và biến CSS đều viết theo camelCase, ví dụ `heroTitle`, `productCard`, `--inkSoft`, `#sanPham`.

## Các khối sẽ thành component React

| Khối trong trang | Component dự kiến |
|---|---|
| Thanh liên hệ phía trên cùng | `Topbar` |
| Header: logo, tìm kiếm, tài khoản, yêu thích, giỏ hàng | `Header`, `Logo`, `SearchBox` |
| Thanh điều hướng có mega menu | `MainNav` |
| Banner dạng vé hành lý (`.hero`) | `HeroSlider` |
| 4 ô cam kết (`.policy`) | `PolicyBar` |
| Chọn size theo số ngày (`.finder`) | `SizeFinder` |
| Tab, lọc size, lưới sản phẩm (`#sanPham`) | `ProductSection`, `ProductCard` |
| Flash sale (`#flashSale`) | `FlashSale` |
| Hai ô gợi ý (`.tiles`) | `PromoTiles` |
| Tin tức (`.newsGrid`) | `NewsSection`, `NewsCard` |
| Đăng ký nhận tin (`.newsletter`) | `Newsletter` |
| Chân trang (`.footer`) | `Footer` |

## Các phần đang tĩnh, sẽ thành state ở bước React

- Class `isActive` (tab, chip lọc size, màu, dấu chấm banner, nút yêu thích, size đang chọn)
- Số trên biểu tượng yêu thích và giỏ hàng, đồng hồ flash sale, thanh trượt số ngày
- Nút "Sao chép", "Xem nhanh", "Thêm vào giỏ", "Xem thêm" và form đăng ký nhận tin
