import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="../../public/logo.png" alt="Logo" className="logo" />
        <span className="logo-text">PrintHub</span>
      </div>
      <ul className="navbar-menu">
        <li><a href="#trang-chu">Trang Chủ</a></li>
        <li><a href="#in-tai-lieu">In Tài Liệu</a></li>
        <li><a href="#lich-su-in">Lịch Sử In</a></li>
        <li><a href="#mua-trang-in">Mua Trang In</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
