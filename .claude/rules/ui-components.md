---
paths:
  - "**/*.html"
  - "**/*.css"
  - "**/*.tsx"
  - "main.js"
  - "components/**"
---

# Thành phần giao diện

## Trang chủ (`index.html`) — thứ tự section
1. **Thanh tin chạy** (ticker đen chữ vàng) + **header bảng hiệu** (logo đỏ xoay, nav, nút "Góc bếp" hồng).
2. **Hero**: câu "Ăn gì cũng được" bị gạch đỏ → "để măm chọn!"; heo khổng lồ ngồi ghế nhựa đỏ trên nền tia nắng, mắt theo chuột, bấm để nói (5 lần = mưa heo); sticker "0đ tiền PR", "17 quận".
3. **Hai dải băng chữ** đỏ/vàng bắt chéo chạy marquee tên món.
4. `#an-gi` **Ăn món gì?** — hàng icon heo theo loại món (kéo được, quán tính, vòng cung, con trỏ đuôi heo) + nút "Bí quá, heo chọn giùm!" quay hàng icon tới một món ngẫu nhiên.
5. `#luat` **Vì sao tin măm** — 3 "điều luật" giấy dán băng keo + 4 con dấu số liệu.
6. `#theo-quan` **Theo quận** — biển tên đường xanh treo trên cột, hover lắc như gió thổi.
7. `#quan-noi-bat` **Quán nổi bật** — polaroid cắt dán, tem điểm, nhãn nhận xét, trích dẫn.
8. `#bai-viet` **Bài viết** — xấp giấy kéo ngang (chuột kéo được, cảm ứng vuốt).
9. `#goc-bep` **Góc bếp** — nền đêm, chữ neon, 3 thẻ game.
10. `#goi-y` **Gợi ý quán** — "phiếu order" có form + email.
11. **CTA cuối** "Đói rồi? Đi ăn!" + dải heo chạy, rồi **footer** đen.

Header và footer giống hệt nhau trên mọi trang (copy nguyên khối). Link trong footer luôn trỏ `index.html#...` để dùng được từ trang con.

## Linh vật: heo măm
- Heo hồng `--pink`, mõm `--snout`, viền đen 3.4, đội **nón lá** `--hat`.
- SVG symbol dùng chung: `#pig`, `#pig-hat`, `#pig-chef`, `#pig-face` (mặt heo hoàn chỉnh: logo, dải băng, mưa heo). Mỗi class `.pg-*` tự khai báo `stroke` (bản sao do `<use>` tạo ra không khớp selector theo tổ tiên).
- Heo được phép biến tấu mạnh (khổng lồ, lặp lại, ngồi ghế nhựa, làm con trỏ) nhưng giữ đúng nét: viền đen tròn đầu, màu phẳng.
- Con trỏ chuột toàn trang là **mõm heo** nhỏ; trên hàng icon là **mũi heo lớn** khịt khịt (`.snout`, khịt nhanh khi đang kéo) + nhãn vàng "‹ Kéo ›".

## Hàng icon loại món
- 11 loại: Món nước, Cơm, Món Âu, Món chay, Cà phê, Trà sữa, Bánh mì, Lẩu & nướng, Hải sản, Chè & tráng miệng, Ăn vặt — mỗi icon là heo đang ăn món đó, trong vòng tròn pastel có viền + bóng cứng.
- Kéo trái/phải có quán tính theo tốc độ kéo; tự trôi chậm, dừng khi hover; kéo không mở nhầm link. Con trỏ khi rê: mũi heo (không dùng đuôi heo nữa).
- `carousel.spinTo(i)` (trong `main.js`) quay tới món i và đánh dấu `.is-picked`.
- Thông số trong `main.js`: `arc` (độ cong), `autoSpeed` (tốc độ tự trôi), hệ số ma sát `1.8`.

## Easter egg
- Bấm heo hero 5 lần hoặc gõ "mam" (ngoài ô nhập liệu) → mưa heo; khi `prefers-reduced-motion` thì chỉ hiện toast.

## Trang Góc bếp (`games.html`)
- Mỗi game là `section.game[data-game]`: bảng chơi (`.game__board`, viền + bóng cứng, nền accent pha giấy), heo hướng dẫn (`.coach` + bong bóng `.say[data-say]`), thẻ công thức (`.recipe`) làm mờ tới khi thắng.
- Game: `pho` (xếp bước), `coffee` (giữ để rót đúng vạch), `canh` (chọn nguyên liệu). Sai thì heo **giải thích vì sao**.
- Sao: 3 = không sai, 2 = sai 1–2 lần, 1 = sai nhiều hơn. Tiến độ lưu `localStorage` (`mam-kitchen`), luôn bọc try/catch.
- Công thức là bản nấu tại nhà đã giản lược; thứ tự bước trong game xếp bước phải là thứ tự duy nhất hợp lý.
- Game mới phải chơi được bằng chuột, cảm ứng và bàn phím.
