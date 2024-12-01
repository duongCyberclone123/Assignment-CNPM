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
import axios from "axios";

const Navbar = ({ title, menuItems, routes, active }) => {
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile menu visibility
  const userName = "Nguyễn Văn A";
  const userAvatar = "https://i.pravatar.cc/150?img=3"; // Sample Avatar

  // Toggle the drawer (mobile menu)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const Logout = async () => {
    // Clear user data from localStorage
    localStorage.removeItem("ID");
    localStorage.removeItem("token");
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#000", boxShadow: "none" }}>
        <Toolbar>
          {/* Menu Icon */}
          <IconButton
            color="inherit"
            edge="start"
            sx={{ display: { xs: "block", lg: "none" }, mr: "5px" }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <img
            src="https://hcmut.edu.vn/img/nhanDienThuongHieu/01_logobachkhoatoi.png"
            alt="HCMUT Logo"
            style={{
              width: "80px", // Reduced size for smaller screens
              marginRight: "10px",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              flex: 1,
              fontSize: { xs: "1.2rem", sm: "1.5rem" }, // Adjust font size for smaller screens
            }}
          >
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
                display: { xs: "none", lg: "inline-flex" }, // Show only on larger screens
                margin: "0 7px",
                padding: "8px 10px", // Reduced padding
                color: active === item ? "#000000" : "#ffffff",
                fontWeight: active === item ? "bold" : "normal",
                backgroundColor: active === item ? "#ffffff" : "transparent",
                letterSpacing: "1.1px",
                fontSize: { xs: "0.9rem", sm: "1rem" }, // Adjust font size for smaller screens
              }}
            >
              {item}
            </Button>
          ))}

          {/* User Info */}
          <Typography
            variant="body1"
            sx={{
              marginRight: "10px",
              color: "white",
              fontSize: { xs: "0.9rem", sm: "1rem" }, // Adjust font size for smaller screens
              display: { xs: "none", sm: "inline-flex" }, // Hide on small screens
            }}
          >
            {userName}
          </Typography>
          <Avatar
            src={userAvatar}
            sx={{
              marginRight: "10px",
              display: { xs: "none", sm: "inline-flex" }, // Hide on small screens
              width: 30, height: 30, // Reduced avatar size
            }}
          />

          {/* Logout Button */}
          <Button
            color="inherit"
            sx={{
              margin: "0 10px",
              padding: "8px 15px", // Reduced padding
              backgroundColor: "#1E90FF",
              color: "#ffffff",
              ml: "auto",
              letterSpacing: "1.5px",
              display: { xs: "none", lg: "inline-flex" }, // Show only on larger screens
              fontSize: { xs: "0.9rem", sm: "1rem" }, // Adjust font size
            }}
            onClick={Logout}
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
          display: { xs: "block", xl: "none" }, // Show only on small screens
          "& .MuiDrawer-paper": { width: 200, backgroundColor: "#000", color: "#fff" },
        }}
      >
        <List sx={{ padding: "80px 0 0 0" }}>
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
