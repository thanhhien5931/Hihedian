---
paths:
  - "content/**"
  - "lib/**"
  - "app/**"
---

# Mô hình dữ liệu nội dung

Frontmatter của mỗi file `content/reviews/<slug>.mdx`:

```yaml
title: "Tên quán"
slug: "ten-quan-quan-1"
category: "ca-phe"            # slug loại món, khớp với hàng icon loại món
district: "quan-1"            # slug quận, phải tồn tại trong districts.ts
ward: "Phường Bến Thành"      # phường theo địa giới mới (tùy chọn)
address: "123 Lê Lợi, ..."
priceRange: "50.000–100.000đ"
openingHours: "7:00 – 22:00"
rating: 4.5                   # thang 5
tags: ["view đẹp", "làm việc", "món Bắc"]
coverImage: "/images/ten-quan/cover.jpg"
gallery: []
mapUrl: ""
publishedAt: "2026-10-14"
featured: false
draft: false                  # true = dữ liệu mẫu
```

## Loại món (category)
Khớp với hàng icon trên trang chủ: `mon-nuoc`, `com`, `mon-au`, `mon-chay`, `ca-phe`, `tra-sua`, `banh-mi`, `lau-nuong`, `hai-san`, `che-trang-mieng`, `an-vat`.

## Dữ liệu mẫu
- Được phép tạo dữ liệu mẫu để dựng giao diện, nhưng đánh dấu rõ (`draft: true`).
- Không bịa thông tin có thể gây hiểu nhầm về quán có thật: số điện thoại, địa chỉ cụ thể, giá.
