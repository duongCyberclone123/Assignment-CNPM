import React from 'react';
import { Button, Typography, Box, Container, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Home = () => {
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
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 0 }}>
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <img
            src="https://hcmut.edu.vn/img/nhanDienThuongHieu/01_logobachkhoatoi.png"
            alt="HCMUT Logo"
            style={{ width: '100px', marginRight: '10px' }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SPSS
          </Typography>

          {/* Các nút điều hướng */}
          <Button color="inherit" sx={{ marginLeft: '20px' }}>Trang chủ</Button>
          <Button color="inherit">Giới thiệu</Button>
          <Button color="inherit">Liên hệ</Button>
        </Toolbar>
      </AppBar>

      {/* Nội dung trang */}
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
          <Typography variant="h4" sx={{ marginBottom: '10px' }}>
            Chào mừng đến với hệ thống HCMUT Smart Printing
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '40px' }}>
            Hệ thống cung cấp dịch vụ in ấn thông minh, tiện lợi cho sinh viên và giảng viên tại trường ĐH Bách Khoa TP.HCM
          </Typography>

          {/* Điều hướng tới trang đăng nhập */}
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontSize: '16px',
                padding: '10px 20px',
                borderRadius: '25px',
              }}
            >
              Đăng nhập
            </Button>
          </Link>
        </Container>
      </Box>
    </>
  );
};

export default Home;
