---
paths:
  - "**/*.html"
  - "**/*.css"
  - "app/**"
  - "components/**"
---

# SEO & Accessibility

## SEO
- Mỗi trang có metadata (title, description) tiếng Việt; trang review có Open Graph image là ảnh cover.
- Trang review thêm JSON-LD `Restaurant` / `CafeOrCoffeeShop` kèm `Review` và `aggregateRating`.

## Accessibility
- `<html lang="vi">`.
- Độ tương phản chữ xám đạt WCAG AA — không dùng xám quá nhạt cho body text.
- Điều hướng được bằng bàn phím; focus ring rõ ràng (`:focus-visible`).
- Phần tử nhân bản để tạo vòng lặp (carousel) phải có `aria-hidden="true"` và `tabindex="-1"`.
