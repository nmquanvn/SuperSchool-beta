# SuperSchool
Project môn học Các Công Nghệ Lập Trình Hiện Đại

# Branch structure
- Main(release)
- Feature/

# Page Structure
## Phân hệ Guest:
- Trang chủ (Hiển thị 10 khoá học nổi bật, 10 khoá xem nhiều nhất, 10 khoá mới nhất, Danh sách lĩnh vực được quan tâm nhất trong tuần).
- Trang xem danh sách khoá học (GroupBy Category, Có phân trang).
- Chức năng tìm kiếm khoá học (tìm theo tên hoặc lĩnh vực - có phân trang).
- Chức năng sắp xếp theo đánh giá hoặc giá tiền tăng dần hoặc giảm dần (có phân trang).
- Chức năng xem trước một số chương của khoá học.
- Trang xem chi tiết khoá học + đánh giá về khoá học.
- Trang đăng ký.
- Trang đăng nhập.
## Phân hệ Student:
- Trang Profile (Thay đổi thông tin: email, họ tên, mật khẩu)
- Trang quản lý watchlist.
- Trang xem danh sách khoá học đã đăng ký.
- Chức năng mua khoá học.
- Chức năng theo dõi, lưu trạng thái các bài giảng(video) giúp học viên dễ dàng bám sát quá trình học.
- Chức năng đánh giá các khoá mà học viên đang theo học.
## Phân hệ Teacher:
- Trang Profile.
- Trang đăng khoá học.
- Trang edit khoá học.
- Trang xem danh sách khoá học mình đã đăng.
## Phân hệ Admin:
- Trang Profile.
- Trang quản lý danh sách Category.
- Trang quản lý danh sách khoá học (Gỡ bỏ khoá học)
- Trang quản lý danh sách các User.
- Trang đăng ký tài khoản Teacher.

# Commit policy
- Mọi người tạo 1 branch feature dựa trên branch gốc là Main.
- Mọi commit sẽ push lên branch của mọi người.
- Nếu có 2 người cùng làm 1 feature, thì commit phải đưa vào trong cùng branch này.
- Khi push lên, phải tạo Pull Request(PR).
- Phải có người review PR.
- Người review sẽ là người chịu trách nhiệm merge.
