---
paths:
  - "**/*.html"
  - "**/*.css"
  - "**/*.tsx"
  - "main.js"
  - "components/**"
---

# Nguyên tắc thiết kế — phong cách "độc lạ"

Bảng hiệu quán Sài Gòn × neo-brutalism × zine cắt dán. Bản thiết kế gốc đã được chủ dự án duyệt: `landing/quirky.html` (giữ nguyên làm tham chiếu, không sửa).

## Nguyên tắc chung
- **Nền giấy** `--paper` (#fff3d6) có chấm lưới kiểu photocopy; chữ đen `--ink`.
- **Viền đen dày** `--border` (3px) cho mọi khối: nút, thẻ, ảnh, input, biển.
- **Bóng đổ cứng lệch**, không blur: `--shadow` (6px 6px 0) và `--shadow-lg` (10px 10px 0). Hover thì nhấc lên và bóng dài ra; nhấn thì bóng biến mất.
- **Góc vuông** (border-radius 0) cho nút/thẻ/input. Chỉ hình tròn (icon, con dấu, sticker) mới bo.
- **Xoay nhẹ có chủ đích** (−3° đến 3°) cho thẻ, sticker, nhãn, highlight — bố cục lệch nhưng vẫn đọc được.
- **Bảng màu bảng hiệu**: đỏ `--red`, vàng `--yellow`, xanh biển tên đường `--blue`, xanh lá `--green`, hồng heo `--pink`, tím `--lilac`, đêm `--night`. Pastel `--c-*` dùng cho vòng tròn icon và game.
- Mỗi section có một **mảng màu nền** riêng khi cần nhấn (quận = xanh biển, bài viết = giấy đậm, Góc bếp = đêm neon, CTA cuối = vàng).
- Chi tiết zine: băng keo dán (`::before` màu mờ), con dấu tròn viền nét đứt, tem điểm số, polaroid.
- Neon glow chỉ dùng cho tiêu đề Góc bếp (ngoại lệ duy nhất cho text-shadow mờ).
- Mọi giá trị màu, viền, bóng lấy từ token trong `:root` của `styles.css` — không hard-code.

## Responsive
- Mobile-first, lề `--gutter` 16px mobile / 32px từ 768px, nội dung tối đa `--max` 1320px.
- Không tràn ngang ở 390px: marquee và dải băng chữ luôn nằm trong khung `overflow: hidden`; vật trang trí xoay/nhô ra phải được kiểm tra ở mép phải.
