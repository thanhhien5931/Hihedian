---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.mjs"
  - "**/*.html"
---

# Quy ước code

- Component dạng function, TypeScript, named export; một component chính mỗi file, tên file `PascalCase.tsx`.
- Mặc định là Server Component; chỉ thêm `"use client"` khi cần tương tác (hover state phức tạp, form, filter, kéo).
- Text UI tiếng Việt dùng lại ở nhiều nơi thì đặt tập trung (vd `lib/copy.ts`).
- URL/slug: tiếng Việt **không dấu**, kebab-case (`quan-binh-thanh`, `ca-phe-sach`). Hàm `slugify` phải xử lý cả `đ` → `d`.
- Tiền tệ hiển thị dạng `50.000đ`; ngày dạng `14/10/2026` (dùng `Intl` với locale `vi-VN`).
- Mọi ảnh phải có `alt` tiếng Việt mô tả nội dung; ảnh/SVG trang trí dùng `alt=""` hoặc `aria-hidden="true"`.
- Viết code giống code xung quanh: cùng mật độ comment, cách đặt tên, idiom.
