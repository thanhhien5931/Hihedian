# ⚠️ Bắt buộc: chụp màn hình và so sánh với design gốc

Sau mỗi thay đổi giao diện lớn phải chụp màn hình và so sánh với **bản thiết kế đã duyệt** `landing/quirky.html` (phong cách "độc lạ"), cùng các nguyên tắc trong `design-principles.md`.

## Thế nào là "thay đổi lớn"
Thêm/sửa một section hoặc một trang, đổi layout, typography, khoảng cách, màu sắc, hoặc component dùng chung (header, footer, nút, thẻ, hàng icon...).

## Cách làm
1. Giai đoạn HTML tĩnh: không cần server. Khi đã chuyển sang Next.js: chạy `npm run dev` trước.
2. Chạy `npm run screenshot -- index.html games.html` (có thể truyền file hoặc URL khác, vd `npm run screenshot -- http://localhost:3000/quan/quan-1`).
   Script chụp full-page ở **desktop 1440px** và **mobile 390px**, lưu vào `screenshots/<tên-trang>-<desktop|mobile>.png`, và báo nếu trang bị tràn ngang.
3. Khi cần đối chiếu: chụp luôn bản gốc `npm run screenshot -- landing/quirky.html` rồi mở (Read) các ảnh để so trực tiếp.

## Những điểm phải đối chiếu
- Viền đen 3px và bóng đổ cứng còn đúng trên mọi khối; không có bóng mờ ngoài chữ neon Góc bếp
- Tiêu đề 900 IN HOA, khối highlight `.hl` không che dấu tiếng Việt
- Màu nền section đúng (giấy / xanh biển / đêm / vàng) và tương phản chữ đạt AA
- Thẻ xoay nhẹ nhưng không đè lên nhau, không bị cắt ở mép phải
- Hàng icon heo, heo hero, dải băng chữ hiển thị đủ
- Không có scroll ngang trên mobile

## Báo cáo
- Ngắn gọn: chỗ nào **đã đúng**, chỗ nào **còn lệch**; sửa các chỗ lệch trước khi coi việc là xong.
- Nếu cố ý khác bản gốc, nói rõ lý do.
- **Không được báo "hoàn thành"** một thay đổi giao diện lớn khi chưa thực hiện bước so sánh này.
