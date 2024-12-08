# CNPM_HCMUT_SSPS
Chaò mừng đến với HCMUT_SSPS.

## Overview
HCMUT_SSPS là dịch vụ in thông minh dành cho sinh viên Đại học Bách Khoa TP.HCM, giúp tối ưu hóa việc sử dụng các thiết bị in trong khuôn viên trường. Sinh viên có thể dễ dàng đặt trước nhu cầu in ấn của mình, loại bỏ việc phải xếp hàng như phương pháp truyền thống. Hệ thống còn cho phép lưu trữ thông tin chi tiết về mỗi lần in, bao gồm metadata của tài liệu, số lượng bản in, thời gian, địa điểm, và các thông tin khác liên quan đến đơn hàng. Sinh viên có thể tra cứu lịch sử sử dụng dịch vụ in ấn của mình bất cứ lúc nào.

Hệ thống được quản lý bởi Nhân viên Dịch vụ In ấn Sinh viên (SPSO), người có trách nhiệm cấu hình hệ thống, quản lý các máy in, và theo dõi hiệu suất hoạt động của HCMUT_SSPS. SPSO cũng có quyền xem lịch sử in ấn của người dùng và thống kê về tình hình sử dụng dịch vụ.
## Technology Stack
- Front-end: ReactJS, and other additional libraries provided by npm.
- Back-end: NodeJS (v20).
- Database: MySQL.

## Installation
Trước khi cài đặt, hãy đảm bảo bạn đã cài đặt các công cụ sau:

- **Node.js** (v20 hoặc mới hơn) - Tải tại [Node.js](https://nodejs.org/).
- **MySQL** - Cài đặt từ [MySQL Downloads](https://dev.mysql.com/downloads/).
### Clone the repository
Open a terminal at a directory of your choice and enter these commands (change the folder name if you want to):
```
  git clone https://github.com/duongCyberclone123/Assignment-CNPM.git
```

### Install dependencies
Cài đặt front-end dependencies:
```
  cd frontend
  yarn add react-router-dom
  yarn add @mui/material @emotion/react @emotion/styled
  yarn add @mui/icons-material
  yarn add axios
  yarn 
  yarn dev
```

Cài đặt back-end dependencies:
```
  cd backend
  npm install
```


### Set up a database server
Ứng dụng sử dụng railway để setup database MySQL


### Run the application
Sau khi chạy thành công, bạn có thể truy cập ứng dụng tại http://localhost:5173 bạn có thể dùng:

Sinh viên: Đăng nhập vào hệ thống để đặt in tài liệu, xem lịch sử in ấn và kiểm tra thông tin in của mình.
SPSO: Đăng nhập vào trang quản trị để quản lý máy in, theo dõi hiệu suất và xem thống kê sử dụng dịch vụ.

