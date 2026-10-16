---
paths:
  - "**/*.html"
  - "**/*.css"
  - "**/*.tsx"
  - "components/**"
---

# Typography

- Font duy nhất: **Montserrat** (Google Fonts, 400–900 + nghiêng 600/800/900, hỗ trợ đầy đủ tiếng Việt). Không thêm font khác khi chưa hỏi.
- Kiểm tra dấu tiếng Việt sau mọi thay đổi chữ — đặc biệt khi chữ nằm trong khối highlight có viền (dấu không được bị viền/khối che).
- **Tiêu đề lớn (h1/h2)**: 900, IN HOA, tracking âm (−.035em), line-height ~1–1.08. Cụm nhấn bọc `<span class="hl">` (khối màu có viền + bóng, xoay nhẹ).
- **Kicker** đầu section: nền đen chữ vàng, IN HOA, giãn chữ, dạng `№ 01 Tên section`.
- **Nút**: 900, IN HOA, 16px (nhỏ 13px).
- **Body**: 500, 16–17px, độ dài dòng tối đa ~34–38em; dùng `text-wrap: pretty/balance`.
- **Nhãn phụ, meta**: 700–800, IN HOA, giãn chữ .06–.12em.
- Chữ trên nền màu phải đạt tương phản AA (chữ trắng trên đỏ/xanh/đen; chữ đen trên vàng/hồng/giấy).
- Chữ viền bằng SVG text (nếu dùng) phải có `paint-order: stroke` để không lộ contour chồng nhau của Montserrat.
