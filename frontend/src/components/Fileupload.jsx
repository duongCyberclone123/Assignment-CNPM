import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);

  // Xử lý khi người dùng chọn file
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Kiểm tra loại file là PDF
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setFileContent(null); // Reset nội dung khi có file mới
      } else {
        alert("Chỉ được chọn file PDF.");
        event.target.value = null; // Reset input nếu loại file không phải PDF
      }
    }
  };

  // Hiển thị nội dung file PDF
  const handleUpload = () => {
    if (selectedFile) {
      console.log("File uploaded:", selectedFile);
      alert(`File ${selectedFile.name} uploaded successfully!`);

      // Đọc nội dung file PDF
      const reader = new FileReader();

      reader.onload = () => {
        setFileContent(reader.result); // Đặt Data URL cho PDF
      };

      reader.readAsDataURL(selectedFile); // Đọc dưới dạng Data URL cho file PDF
    } else {
      alert("No file selected!");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".pdf" // Chỉ cho phép chọn file PDF
      />
      <label htmlFor="file-input">
        <Button variant="contained" component="span">
          Select File
        </Button>
      </label>

      {/* Hiển thị tên file đã chọn */}
      {selectedFile && (
        <Typography variant="body1" sx={{ margin: "10px 0" }}>
          Selected File: {selectedFile.name}
        </Typography>
      )}

      {/* Nút upload */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ marginTop: "10px" }}
      >
        Upload
      </Button>

      {/* Hiển thị khung nội dung file PDF */}
      {fileContent && (
        <embed
          src={fileContent} // Sử dụng Data URL của file PDF
          type="application/pdf"
          frameBorder="0"
          scrolling="auto"
          height="700px"
          width="100%"
        ></embed>
      )}
    </div>
  );
};

export default FileUpload;
