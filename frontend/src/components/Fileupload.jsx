import React, { useState } from "react";
import { Button, Typography, Box, Modal, Backdrop, Fade } from "@mui/material";

const FileUpload = ({ onChangeValue }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);


  // Thiết lập in
  const [pagesToPrint, setPagesToPrint] = useState("all"); // Lựa chọn mặc định là "all"

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
      {!selectedFile ? (
        <label htmlFor="file-input">
          <Button
            variant="contained"
            component="span"
            sx={{ width: "100%", height: "100%" }}
          >
            Select File
          </Button>
        </label>
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreview}
            sx={{ width: "100%", height: "100%" }}
          >
            Preview & Configure print
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setSelectedFile(null);
              setFileContent(null);
              onChangeValue(100, null);
            }}
            sx={{ width: "100%", height: "100%" }}
          >
            Delete File
          </Button>
        </>
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
              height: "80%",
              bgcolor: "background.paper",
              boxShadow: 24,
              padding: "20px",
              outline: "none",
              display: "flex",
              borderRadius: "8px",
              overflow: "scroll"
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
                flexDirection: "column",
              }}
            >
              {/* Thông tin file */}
              <Box
                sx={{
                  marginBottom: "10px",
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

                {/* Num of copies */}
                <Box
                  sx={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" sx={{ marginRight: "10px", flex: "1" }}>
                    Number of copies:
                  </Typography>
                  <input
                    type="number"
                    placeholder="From"
                    min={1}
                    defaultValue={1}
                    style={{
                      flex: "1",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      fontSize: "14px",
                      outline: "none",
                      backgroundColor: "#fff",
                      transition: "border-color 0.3s ease",
                      marginBottom: "10px",
                    }}
                    onChange={(e) => {
                      onChangeValue(6, e.target.value);
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
                    onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                  />
                </Box>
                {/* Paper Size */}
                <Box
                  sx={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" sx={{ marginRight: "10px", flex: "1" }}>
                    Paper Size:
                  </Typography>
                  <select
                    style={{
                      flex: "1",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      fontSize: "14px",
                      backgroundColor: "#fff",
                      outline: "none",
                      transition: "border-color 0.3s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
                    onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                    onChange={(e) => {
                      onChangeValue(1, e.target.value);
                    }}
                  >
                    <option value="A4">A4</option>
                    <option value="A3">A3</option>
                  </select>
                </Box>

                {/* Pages to Print */}
                <Box
                  sx={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" sx={{ marginRight: "10px", flex: "1" }}>
                    Pages to Print:
                  </Typography>
                  <select
                    value={pagesToPrint}
                    onChange={(e) => setPagesToPrint(e.target.value)}
                    style={{
                      flex: "1",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      fontSize: "14px",
                      backgroundColor: "#fff",
                      outline: "none",
                      transition: "border-color 0.3s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
                    onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                    con
                  >
                    <option value="all">All</option>
                    <option value="odd">Odd Pages</option>
                    <option value="even">Even Pages</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </Box>

                {pagesToPrint === "custom" && (
                  <Box sx={{ marginTop: "5px", display: "flex", gap: "10px" }}>
                    <input
                      type="number"
                      placeholder="From"
                      min={1}
                      style={{
                        flex: "1",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        fontSize: "14px",
                        outline: "none",
                        backgroundColor: "#fff",
                        transition: "border-color 0.3s ease",
                        marginBottom: "10px",

                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
                      onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                    />
                    <input
                      type="number"
                      placeholder="To"
                      min={1}
                      style={{
                        flex: "1",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        fontSize: "14px",
                        outline: "none",
                        backgroundColor: "#fff",
                        transition: "border-color 0.3s ease",
                        marginBottom: "10px",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
                      onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                    />
                  </Box>
                )}

                {/* Printing Side */}
                <Box
                  sx={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" sx={{ marginRight: "10px", flex: "1" }}>
                    Printing Side:
                  </Typography>
                  <select
                    style={{
                      flex: "1",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      fontSize: "14px",
                      backgroundColor: "#fff",
                      outline: "none",
                      transition: "border-color 0.3s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
                    onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                    onChange={(e) => {
                      onChangeValue(3, e.target.value);
                    }}
                  >
                    <option value="two">Double-sided</option>
                    <option value="one">Single-sided</option>
                  </select>
                </Box>

                {/* Print Type */}
                <Box
                  sx={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" sx={{ marginRight: "10px", flex: "1" }}>
                    Print Type:
                  </Typography>
                  <select
                    style={{
                      flex: "1",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      fontSize: "14px",
                      backgroundColor: "#fff",
                      outline: "none",
                      transition: "border-color 0.3s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
                    onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                    onChange={(e) => {
                      onChangeValue(4, e.target.value);
                    }}
                  >
                    <option value="Color">Color</option>
                    <option value="Non Color">Non Color</option>
                  </select>
                </Box>
                {/* Chieu in */}
                <Box
                  sx={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" sx={{ marginRight: "10px", flex: "1" }}>
                    Orientation:
                  </Typography>
                  <select
                    style={{
                      flex: "1",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      fontSize: "14px",
                      backgroundColor: "#fff",
                      outline: "none",
                      transition: "border-color 0.3s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
                    onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                    onChange={(e) => {
                      onChangeValue(5, e.target.value);
                    }}
                  >
                    <option value="Horizontal">Horizontal</option>
                    <option value="Vertical">Vertical</option>
                  </select>
                </Box>
              </Box>
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
