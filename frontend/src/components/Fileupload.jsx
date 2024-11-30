import React, { useState } from "react";
import { Button, Typography, Box, Modal, Backdrop, Fade } from "@mui/material";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);

  // Xử lý khi người dùng chọn file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onload = () => {
          setFileContent(reader.result); // Đặt Data URL cho PDF
        };
        reader.readAsDataURL(file);
      } else {
        alert("Chỉ được chọn file PDF.");
        event.target.value = null; // Reset input nếu loại file không phải PDF
      }
    }
  };

  // Mở modal preview
  const handlePreview = () => {
    if (!fileContent) {
      alert("No file to preview!");
      return;
    }
    setOpenPreview(true);
  };

  // Đóng modal
  const handleClosePreview = () => {
    setOpenPreview(false);
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
        accept=".pdf"
      />
      <label htmlFor="file-input">
        <Button variant="contained" component="span">
          Select File
        </Button>
      </label>

      {selectedFile && (
        <Typography variant="body1" sx={{ margin: "10px 0" }}>
          Selected File: {selectedFile.name}
        </Typography>
      )}

      {fileContent && (
        <Button variant="contained" color="primary" onClick={handlePreview}>
          Preview
        </Button>
      )}

      <Modal
        open={openPreview}
        onClose={handleClosePreview}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openPreview}>
          <Box
            sx={{
              position: "absolute",
              top: "70px",
              left: "50%",
              transform: "translate(-50%, 0)",
              width: "80%",
              height: "calc(100% - 70px)",
              bgcolor: "background.paper",
              boxShadow: 24,
              padding: "20px",
              outline: "none",
              display: "flex",
              borderRadius: "8px",
            }}
          >
            {/* Bên trái: Preview PDF */}
            <Box
              sx={{
                width: "60%",
                height: "100%",
                marginRight: "10px",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <embed
                src={fileContent}
                type="application/pdf"
                frameBorder="0"
                scrolling="auto"
                height="100%"
                width="100%"
                style={{ borderRadius: "5px" }}
              ></embed>
            </Box>

            {/* Bên phải: Thông tin và thiết lập in */}
            <Box
              sx={{
                width: "40%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Thông tin file */}
              <Box
                sx={{
                  marginBottom: "20px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography variant="h6" component="h3" sx={{ marginBottom: "10px" }}>
                  File Information
                </Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {selectedFile?.name || "Unknown"}
                </Typography>
                <Typography variant="body1">
                  <strong>Size:</strong> {(selectedFile?.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {/* Add logic for page count if needed */}
                </Typography>
              </Box>

              {/* Thiết lập in */}
              <Box
                sx={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography variant="h6" component="h3" sx={{ marginBottom: "10px" }}>
                  Print Settings
                </Typography>
                <Box sx={{ marginBottom: "10px" }}>
                  <Typography variant="body2" sx={{ marginBottom: "5px" }}>
                    Paper Size:
                  </Typography>
                  <select>
                    <option value="A4">A4</option>
                    <option value="A3">A3</option>
                  </select>
                </Box>
                <Box sx={{ marginBottom: "10px" }}>
                  <Typography variant="body2" sx={{ marginBottom: "5px" }}>
                    Pages to Print:
                  </Typography>
                  <select>
                    <option value="all">All</option>
                    <option value="odd">Odd Pages</option>
                    <option value="even">Even Pages</option>
                    <option value="custom">Custom Range</option>
                  </select>
                  <Box sx={{ marginTop: "5px", display: "flex", gap: "5px" }}>
                    <input type="number" placeholder="From" min={1} style={{ width: "50%" }} />
                    <input type="number" placeholder="To" min={1} style={{ width: "50%" }} />
                  </Box>
                </Box>
                <Box sx={{ marginBottom: "10px" }}>
                  <Typography variant="body2" sx={{ marginBottom: "5px" }}>
                    Printing Side:
                  </Typography>
                  <select>
                    <option value="one">Single-sided</option>
                    <option value="two">Double-sided</option>
                  </select>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ marginBottom: "5px" }}>
                    Print Type:
                  </Typography>
                  <select>
                    <option value="simplex">1-sided</option>
                    <option value="duplex">2-sided</option>
                  </select>
                </Box>
              </Box>

              {/* Nút OK */}
              <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClosePreview}
                >
                  OK
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default FileUpload;
