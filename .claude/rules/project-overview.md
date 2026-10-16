# Tổng quan dự án

Website **măm** — review quán ăn và quán cà phê tại TP. Hồ Chí Minh, tổ chức theo từng quận.
Phong cách thiết kế: **"độc lạ"** — bảng hiệu quán Sài Gòn × neo-brutalism × zine cắt dán (viền đen dày, bóng đổ cứng, chữ 900 IN HOA, heo măm là nhân vật chính). Bản gốc đã duyệt: `landing/quirky.html`.
Lịch sử: phong cách tối giản theo dirtverse.co (`dirtverse.co_.png`) đã được thay thế ngày 16/10/2026; ảnh này không còn là chuẩn thiết kế. `landing/cute.html` và `landing/modern.html` là hai phương án không được chọn, chỉ để tham khảo.

## Ngôn ngữ & người đọc
- Nội dung website: **tiếng Việt** có dấu đầy đủ.
- Code, tên biến, tên file, commit message: **tiếng Anh**.
- Người đọc: người trẻ ở TP.HCM tìm chỗ ăn uống theo khu vực, phần lớn dùng điện thoại.

## Giai đoạn hiện tại: prototype HTML tĩnh
- Trang chủ là `index.html` + `styles.css` + `main.js` (không có build step).
- Trang **Góc bếp** (`games.html` + `games.css` + `games.js`): mini game nấu ăn, thắng thì mở khóa công thức. Dùng chung `styles.css` và `main.js` với trang chủ; liên kết qua nút "Góc bếp" (`.btn--pink`) trên header, section Góc bếp và footer.
- `main.js` dùng chung cho mọi trang: mỗi khối tự kiểm tra phần tử tồn tại trước khi chạy.
- Ảnh trong `images/` (ảnh Unsplash, tên file tiếng Việt không dấu).
- Design token nằm trong `:root` của `styles.css`.
- Khi chuyển sang Next.js: mang token và cấu trúc section sang, giữ nguyên tên class/section để dễ đối chiếu.

## Địa giới hành chính (quy ước quan trọng)
Từ 07/2025 TP.HCM đã bỏ cấp quận/huyện (chỉ còn phường/xã) và sáp nhập thêm Bình Dương, Bà Rịa–Vũng Tàu.
- Website vẫn dùng **tên quận cũ** làm cách điều hướng chính vì người dùng vẫn quen gọi như vậy.
- Địa chỉ chi tiết ghi theo **phường mới**.
- Không tự ý thay đổi quy ước này khi chưa hỏi.

Các quận dùng cho điều hướng: Quận 1, 3, 4, 5, 6, 7, 8, 10, 11, 12, Bình Thạnh, Phú Nhuận, Gò Vấp, Tân Bình, Tân Phú, Bình Tân, TP. Thủ Đức.
