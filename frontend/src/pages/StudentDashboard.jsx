import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, Container, AppBar, Toolbar, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  // Hàm lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUserName(parsedData.username);  
      setUserAvatar(parsedData.avatar || 'https://i.pravatar.cc/150?img=3'); 
    }
  }, []);

  // Hàm điều hướng cho các mục trong thanh điều hướng
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token
    localStorage.removeItem('userData'); // Xóa thông tin người dùng

    console.log("Đăng xuất thành công!");

    navigate('/'); // Điều hướng về trang chủ hoặc trang đăng nhập
  };

  return (
    <>
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

      <AppBar position="fixed" sx={{ backgroundColor: '#000', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" edge="start" sx={{ mr: 0 }}>
              <MenuIcon />
            </IconButton>
            <img
              src="https://hcmut.edu.vn/img/nhanDienThuongHieu/01_logobachkhoatoi.png"
              alt="HCMUT Logo"
              style={{ width: '100px', marginRight: '20px' }}
            />
            <Typography variant="h3" sx={{ flexGrow: 1, fontSize: '30px' }}>
              SPSS
            </Typography>

            <Button
              color="inherit"
              sx={{ marginLeft: '60px', fontSize: '20px', marginRight: '30px' }}
              onClick={() => handleNavigation('/spsodashboard')}
            >
              Trang chủ
            </Button>
            <Button
              color="inherit"
              sx={{ fontSize: '20px', marginRight: '30px' }}
              onClick={() => handleNavigation('/print')}
            >
              In tài liệu
            </Button>
            <Button
              color="inherit"
              sx={{ fontSize: '20px', marginRight: '30px' }}
              onClick={() => handleNavigation('/printhistory')}
            >
              Lịch sử in
            </Button>
            <Button
              color="inherit"
              sx={{ fontSize: '20px', marginRight: '30px' }}
              onClick={() => handleNavigation('/payment')}
            >
              Mua trang in
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ marginRight: '15px', color: 'white', fontSize: '16px' }}>
              {userName || 'Người dùng'}
            </Typography>
            <Avatar src={userAvatar} sx={{ marginRight: '15px' }} />
            <Button color="inherit" sx={{ fontSize: '16px' }} onClick={handleLogout}>
              Đăng xuất
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

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
          marginTop: '64px',
        }}
      >
        <Container
          sx={{
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '8px',
            padding: '30px',
            width: '100%',
            maxWidth: '500px',
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
