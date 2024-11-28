import React from 'react';
import { Button, Typography, Box, Container, AppBar, Toolbar, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate(); // Hook để điều hướng

  // Hàm điều hướng cho các mục trong thanh điều hướng
  const handleNavigation = (path) => {
    navigate(path);
  };
  const handleLogout = () => {
    // Logic đăng xuất (xóa token, session nếu có)
    console.log("Đăng xuất thành công!");

    // Điều hướng về trang chủ
    navigate('/');
  };

  // Giả sử tên người dùng và ảnh đại diện
  const userName = 'Nguyễn Văn A';
  const userAvatar = 'https://i.pravatar.cc/150?img=3'; // Hình ảnh avatar giả

  return (
    <>
      {/* Đặt lại margin và padding của html, body */}
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
          }
        `}
      </style>

      {/* Thanh điều hướng */}
      <AppBar position="fixed" sx={{ backgroundColor: '#000', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Thanh bên trái: Logo và các nút điều hướng */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" edge="start" sx={{ mr: 0 }}>
              <MenuIcon />
            </IconButton>
            <img
              src="https://hcmut.edu.vn/img/nhanDienThuongHieu/01_logobachkhoatoi.png"
              alt="HCMUT Logo"
              style={{ width: '100px', marginRight: '20px' }} // Tăng khoảng cách giữa logo và các nút
            />
            <Typography variant="h3" sx={{ flexGrow: 1, fontSize: '30px' }}>
              SPSS
            </Typography>

            {/* Các nút điều hướng */}
            <Button
              color="inherit"
              sx={{ marginLeft: '60px', fontSize: '20px', marginRight: '30px' }} // Tăng kích thước font và khoảng cách
              onClick={() => handleNavigation('/student-dashboard')}
            >
              Trang chủ
            </Button>
            <Button
              color="inherit"
              sx={{ fontSize: '20px', marginRight: '30px' }} // Tăng kích thước font và khoảng cách
              onClick={() => handleNavigation('/print')}
            >
              In tài liệu
            </Button>
            <Button
              color="inherit"
              sx={{ fontSize: '20px', marginRight: '30px' }} // Tăng kích thước font và khoảng cách
              onClick={() => handleNavigation('/printhistory')}
            >
              Lịch sử in
            </Button>
            <Button
              color="inherit"
              sx={{ fontSize: '20px', marginRight: '30px' }} // Tăng kích thước font và khoảng cách
              onClick={() => handleNavigation('/payment')}
            >
              Mua trang in
            </Button>
          </Box>

          {/* Thanh bên phải: Tên người dùng và nút đăng xuất */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ marginRight: '15px', color: 'white', fontSize: '16px' }}>
              {userName}
            </Typography>
            <Avatar src={userAvatar} sx={{ marginRight: '15px' }} />
            <Button color="inherit" sx={{ fontSize: '16px' }} onClick={handleLogout}>
              Đăng xuất
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Nội dung trang - Chào mừng */}
      <Box
        sx={{
          backgroundImage: 'url(https://img.pikbest.com/ai/illus_our/20230426/8e6dd0984b9ce2006e9906471398531d.jpg!w700wp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          marginTop: '64px', // Bỏ khoảng cách của AppBar
        }}
      >
        <Container
          sx={{
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ
            borderRadius: '8px',
            padding: '30px',
            width: '100%',
            maxWidth: '500px', // Giới hạn chiều rộng của container
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: '10px', fontSize: '40px' }}>
            Chào mừng đến với Student Dashboard
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '40px', fontSize: '20px' }}>
            Hệ thống cung cấp các dịch vụ in ấn thông minh cho sinh viên và giảng viên tại trường ĐH Bách Khoa TP.HCM
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default StudentDashboard;
