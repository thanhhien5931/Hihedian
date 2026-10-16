# Tech stack & lệnh

## Stack mục tiêu (sau giai đoạn HTML tĩnh)
- **Next.js (App Router) + TypeScript** (strict mode)
- **Tailwind CSS**; design token khai báo trong `tailwind.config.ts` / CSS variables — không hard-code màu rải rác
- **MDX** cho nội dung bài review, dữ liệu quán dạng frontmatter
- `next/image` cho mọi ảnh (lazy load, kích thước responsive)
- Package manager: `npm`

## Môi trường dev
- Windows + PowerShell 5.1: không dùng `&&`, dùng `;` (hoặc `A; if ($?) { B }`).

## Lệnh thường dùng
```powershell
npm install          # cài dependencies
npm run dev          # dev server tại http://localhost:3000
npm run build        # build production — phải pass trước khi coi một việc là xong
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run screenshot   # chụp các trang (desktop + mobile) vào screenshots/
```

`npm run screenshot` chạy `scripts/screenshot.mjs`, dùng `playwright-core` điều khiển **Microsoft Edge có sẵn trên máy** (không cần tải browser riêng). Script ép tải hết ảnh lazy trước khi chụp. Thư mục `screenshots/` nằm trong `.gitignore`.

## Cấu trúc thư mục dự kiến (Next.js)
```
app/
  page.tsx                     # Trang chủ
  quan/[district]/page.tsx     # Danh sách quán theo quận (vd: /quan/quan-1)
  review/[slug]/page.tsx       # Chi tiết một bài review
  danh-muc/[category]/page.tsx # Lọc theo loại món
  gioi-thieu/page.tsx
  lien-he/page.tsx
components/
  layout/                      # Header, Footer, BigWordmark
  ui/                          # Button, Tag, Eyebrow, Card...
  sections/                    # Các section của trang chủ
content/
  reviews/*.mdx                # Mỗi quán một file
  districts.ts                 # Danh sách quận + mô tả
lib/                           # Hàm đọc/lọc nội dung, helpers
public/images/                 # Ảnh quán, tên file kebab-case
```
