---
paths:
  - "**/*.css"
  - "**/*.js"
  - "**/*.tsx"
---

# Chuyển động

- Tính cách: **nảy, lắc, giật** kiểu đồ chơi — easing có độ vọt (`cubic-bezier(.2, 1.4, .4, 1)`), hover nút nhấc lên + xoay nhẹ, nhấn thì "lún" xuống (bóng mất), biển quận đung đưa, `.wiggle` lắc.
- Marquee (ticker, dải băng chữ, dải heo) chạy bằng CSS `@keyframes slide` trên `.marquee__track` gồm 2 nhóm giống nhau; nhóm nhân bản `aria-hidden`.
- Luôn tôn trọng `prefers-reduced-motion`: tắt marquee, lắc, chớp neon, reveal, tự trôi hàng icon, mưa heo (thay bằng toast).
- Animation chạy bằng `requestAnimationFrame` phải dừng khi phần tử ra khỏi màn hình (IntersectionObserver).
- Nội dung ẩn chờ reveal phải hiện khi không có JS (`.js .reveal`) và khi chụp màn hình (`.is-screenshot`).
- Không dùng thư viện animation nặng nếu CSS/JS thuần làm được.
