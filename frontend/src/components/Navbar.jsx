import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = ({ title, menuItems, routes, active }) => {
  const [mobileOpen, setMobileOpen] = useState(false); // Trạng thái cho menu thu gọn
  const userName = "Nguyễn Văn A";
  const userAvatar = "https://i.pravatar.cc/150?img=3"; // Avatar giả

  // Toggle menu khi ở chế độ thu gọn
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#000", boxShadow: "none" }}>
        <Toolbar>
          {/* Menu Icon */}
          <IconButton
            color="inherit"
            edge="start"
            sx={{ display: { xs: "block", xl: "none" }, mr: "5px" }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <img
            src="https://hcmut.edu.vn/img/nhanDienThuongHieu/01_logobachkhoatoi.png"
            alt="HCMUT Logo"
            style={{ width: "100px", marginRight: "10px" }}
          />
          <Typography variant="h6" sx={{ flex: 1 }}>
            {title}
          </Typography>

          {/* Menu Buttons */}
          {menuItems.map((item, index) => (
            <Button
              key={index}
              component={Link}
              to={routes[index]}
              color="inherit"
              sx={{
                display: { xs: "none", xl: "inline-flex" }, // Chỉ hiển thị trên màn hình lớn
                margin: "0 15px",
                padding: "10px 20px",
                color: active === item ? "#000000" : "#ffffff",
                fontWeight: active === item ? "bold" : "normal",
                backgroundColor: active === item ? "#ffffff" : "transparent",
                letterSpacing: "1.5px",
              }}
            >
              {item}
            </Button>
          ))}

          {/* User Info */}
          <Typography
            variant="body1"
            sx={{
              marginRight: "15px",
              color: "white",
              fontSize: "16px",
              display:  "inline-flex" , // Chỉ hiển thị trên màn hình lớn
            }}
          >
            {userName}
          </Typography>
          <Avatar
            src={userAvatar}
            sx={{
              marginRight: "15px",
              display: "inline-flex" , // Chỉ hiển thị trên màn hình lớn
            }}
          />

          {/* Logout Button */}
          <Button
            color="inherit"
            sx={{
              margin: "0 15px",
              padding: "10px 20px",
              backgroundColor: "#1E90FF",
              color: "#ffffff",
              ml: "auto",
              letterSpacing: "1.5px",
              display: "inline-flex" , // Chỉ hiển thị trên màn hình lớn
            }}
          >
            Đăng xuất
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Menu */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", xl: "none" }, // Chỉ hiển thị trên màn hình nhỏ
          "& .MuiDrawer-paper": { width: 200, backgroundColor: "#000", color: "#fff" },
        }}
      >
        <List sx ={{padding:"90px 0 0 0"}}>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={routes[index]}
              onClick={handleDrawerToggle}
            >
              <ListItemText
                primary={item}
                sx={{
                  color: active === item ? "#000000" : "#fff",
                  fontWeight: active === item ? "bold" : "normal",
                  backgroundColor: active === item ? "#ffffff" : "transparent",
                  padding: "10px 20px",
                  borderRadius: "10px"
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
