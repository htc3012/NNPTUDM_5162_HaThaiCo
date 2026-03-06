# Kế hoạch thực hiện bài tập: CRUD cho User và Role, với các hàm Enable/Disable

## Tổng quan dự án
Dự án là một REST API e-commerce sử dụng Node.js, Express.js, và MongoDB (Mongoose). Hiện tại đã có schemas và routes cho Products và Categories. Cần thêm User và Role với các chức năng CRUD và enable/disable.

## Yêu cầu chi tiết
### Object User
- username: string, unique, required
- password: string, required
- email: string, required, unique
- fullName: string, default: ""
- avatarUrl: string, default: "https://i.sstatic.net/l60Hf.png"
- status: boolean, default: false
- role: ObjectID (ref đến Role)
- loginCount: int, default: 0, min=0
- timestamp (createdAt, updatedAt từ Mongoose)

### Object Role
- name: string, unique, required
- description: string, default: ""
- timestamp (createdAt, updatedAt từ Mongoose)

### Chức năng cần thực hiện
1. **CRUD cho User và Role:**
   - Get all (danh sách, filter nếu cần)
   - Get by ID
   - Create (POST)
   - Update (PUT)
   - Delete mềm (set isDeleted: true)

2. **POST /enable:** Nhận email và username, kiểm tra và set status = true nếu đúng.

3. **POST /disable:** Nhận email và username, kiểm tra và set status = false nếu đúng.

## Kế hoạch thực hiện từng bước

### Bước 1: Tạo Schemas cho User và Role
- Tạo file `schemas/users.js` với schema User, thêm `isDeleted: {type: Boolean, default: false}` cho soft delete.
- Tạo file `schemas/roles.js` với schema Role, thêm `isDeleted: {type: Boolean, default: false}`.
- Đảm bảo validation: unique cho username, email, name; min cho loginCount.

### Bước 2: Cập nhật Routes cho Users
- Mở file `routes/users.js` (hiện tại chỉ có placeholder).
- Thêm các route:
  - `GET /`: Get all users (filter theo status, role nếu cần, exclude isDeleted: true).
  - `GET /:id`: Get user by ID (kiểm tra isDeleted: false).
  - `POST /`: Create user mới (validate dữ liệu, hash password nếu cần, nhưng yêu cầu không đề cập nên giữ plain text).
  - `PUT /:id`: Update user (chỉ update các trường cho phép).
  - `DELETE /:id`: Soft delete (set isDeleted: true).
  - `POST /enable`: Nhận {email, username}, tìm user với email và username khớp, set status: true.
  - `POST /disable`: Tương tự, set status: false.
- Sử dụng try-catch cho error handling, trả về JSON với message và status code phù hợp.

### Bước 3: Cập nhật Routes cho Roles
- Tạo file `routes/roles.js` với các route tương tự Users:
  - GET /, GET /:id, POST /, PUT /:id, DELETE /:id (soft delete).
- Thêm vào `app.js`: `app.use('/api/v1/roles', require('./routes/roles'))`.

### Bước 4: Cập nhật app.js
- Đảm bảo import và sử dụng routes mới.
- Kiểm tra kết nối MongoDB.

### Bước 5: Test và Validation
- Chạy server: `npm start`.
- Sử dụng Postman hoặc curl để test từng endpoint.
- Kiểm tra database MongoDB để đảm bảo dữ liệu được lưu đúng.
- Fix lỗi nếu có (ví dụ: validation errors, ref không tồn tại).

### Bước 6: Tối ưu hóa (nếu cần)
- Thêm middleware cho authentication (JWT), nhưng yêu cầu không đề cập nên bỏ qua.
- Thêm pagination cho GET all nếu danh sách lớn.
- Validate email format (sử dụng regex hoặc thư viện).

## Lưu ý
- Sử dụng soft delete cho tất cả (thêm isDeleted vào schemas và filter trong queries).
- Trả về JSON chuẩn: {success: true/false, message: "...", data: ...}.
- Đảm bảo unique constraints không bị vi phạm.
- Nếu cần hash password, sử dụng bcrypt, nhưng yêu cầu không yêu cầu nên giữ đơn giản.

## Thời gian ước tính
- Bước 1-3: 2-3 giờ.
- Bước 4-5: 1-2 giờ.
- Tổng: 3-5 giờ tùy kinh nghiệm.</content>
<parameter name="filePath">c:/Users/hatha/Tung_NNUDM/NNPTUD-C6/plan.md

Yêu cầu quan trọng cần lưu ý : bạn hãy thực hiện từng bước theo kế hoạch và luôn luôn chạy lệnh test kiểm tra trước khi làm thêm chức năng mới. Đặc biệt là mỗi lần muốn làm thêm chức năng là phải vào file plan.md view lại logic và chức của dự án.