import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, AppBar, Toolbar, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
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
    <AppBar position="fixed" sx={{ backgroundColor: '#000', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Menu Icon */}
          <IconButton color="inherit" edge="start" sx={{ mr: 0 }}>
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <img
            src="https://hcmut.edu.vn/img/nhanDienThuongHieu/01_logobachkhoatoi.png"
            alt="HCMUT Logo"
            style={{ width: '100px', marginRight: '20px' }}
          />
          
          {}
          <Typography variant="h3" sx={{ flexGrow: 1, fontSize: '30px' }}>
            Student
          </Typography>

          {/* Navigation Buttons */}
          <Button color="inherit" sx={{ marginLeft: '60px', fontSize: '20px', marginRight: '30px' }} onClick={() => handleNavigation('/student-dashboard')}>
            Trang chủ
          </Button>
          <Button color="inherit" sx={{ fontSize: '20px', marginRight: '30px' }} onClick={() => handleNavigation('/print')}>
            In tài liệu
          </Button>
          <Button color="inherit" sx={{ fontSize: '20px', marginRight: '30px' }} onClick={() => handleNavigation('/history')}>
            Lịch sử in
          </Button>
          <Button color="inherit" sx={{ fontSize: '20px', marginRight: '30px' }} onClick={() => handleNavigation('/purchase')}>
            Thanh toán
          </Button>
        </Box>

        {/* User Info and Logout */}
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
  );
};

export default Navbar;
