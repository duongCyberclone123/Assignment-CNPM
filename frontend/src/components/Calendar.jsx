import React from "react";

const Calendar = () => {
  // Lấy thông tin tháng hiện tại
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" }); // Tên tháng
  const year = today.getFullYear(); // Năm
  const startDate = new Date(year, today.getMonth(), 1); // Ngày đầu tháng
  const endDate = new Date(year, today.getMonth() + 1, 0); // Ngày cuối tháng
  const startDay = startDate.getDay(); // Ngày đầu tuần (0 = Chủ nhật)

  // Các thứ trong tuần
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Tạo danh sách ngày trong tháng
  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(""); // Thêm ô trống cho các ngày trước ngày 1
  }
  for (let i = 1; i <= endDate.getDate(); i++) {
    days.push(i); // Thêm ngày thực tế
  }

  return (
    <div style={{ fontFamily: "'Comic Sans MS', cursive", textAlign: "center", width: "280px"}}>
      {/* Tên tháng */}
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
        {month} {year}
      </h1>

      {/* Các thứ trong tuần */}
      <div style={{ display: "flex", justifyContent: "center", fontWeight: "bold", marginBottom: "10px" }}>
        {daysOfWeek.map((day) => (
          <div key={day} style={{ width: "40px" }}>
            {day}
          </div>
        ))}
      </div>

      {/* Ngày trong tháng */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {days.map((date, index) => (
          <div
            key={index}
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            //   margin: "5px",
              borderRadius: date === today.getDate() ? "50%" : "none",
              backgroundColor: date === today.getDate() ? "#fba" : "transparent",
              color: date === today.getDate() ? "#fff" : "#000",
              fontWeight: date === today.getDate() ? "bold" : "normal",
            }}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
