# CLAUDE.md

Website **măm** — review quán ăn & quán cà phê ở TP. Hồ Chí Minh theo từng quận, phong cách **"độc lạ"** (bảng hiệu Sài Gòn × neo-brutalism). Bản thiết kế gốc đã duyệt: `landing/quirky.html`.

Toàn bộ hướng dẫn nằm trong `.claude/rules/` (Claude Code tự nạp). File không có `paths` luôn được nạp; file có `paths` chỉ nạp khi làm việc với file khớp.

| File | Chủ đề | Phạm vi |
|---|---|---|
| `screenshot-verification.md` | ⚠️ Bắt buộc chụp & so sánh với design gốc | Luôn nạp |
| `project-overview.md` | Mục tiêu, ngôn ngữ, giai đoạn hiện tại, quy ước quận/phường | Luôn nạp |
| `tech-stack.md` | Stack, lệnh npm, PowerShell, cấu trúc thư mục | Luôn nạp |
| `workflow.md` | Quy trình làm việc chung | Luôn nạp |
| `content-model.md` | Frontmatter review, loại món, dữ liệu mẫu | `content/`, `lib/`, `app/` |
| `design-principles.md` | Viền dày, bóng cứng, bảng màu bảng hiệu, responsive | File giao diện |
| `typography.md` | Montserrat 900 IN HOA, kicker, highlight | File giao diện |
| `ui-components.md` | Thứ tự section, heo măm, hàng icon kéo, easter egg, Góc bếp | File giao diện |
| `motion.md` | Chuyển động, reduced-motion | CSS/JS/TSX |
| `code-conventions.md` | Quy ước code, slug, định dạng tiền/ngày, alt | TS/JS/HTML |
| `seo-accessibility.md` | Metadata, JSON-LD, WCAG, bàn phím | HTML/CSS/app/components |

## Sub-agents (`.claude/agents/`)

| Agent | Dùng khi |
|---|---|
| `researcher` | Cần tra cứu web/tài liệu nhiều nguồn, chỉ cần bản tóm tắt có nguồn |
| `code-reviewer` | Sau thay đổi code quan trọng — review độc lập, chỉ báo cáo, không sửa |
| `qa-tester` | Sau thay đổi giao diện/tương tác lớn — chụp màn hình, chạy Playwright, báo lỗi kèm bằng chứng |
