import React, { useEffect, useState } from "react";
import { Button, Typography, Box, Modal, Backdrop, Fade, TextField } from "@mui/material";
import Upload from "../assets/upload.png";
import Setting from "../assets/setting.png";

const FileUpload = ({ onChangeValue }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);

  const [pageCount, setPageCount] = useState("");
  const [error, setError] = useState("");

  // Thiết lập in
  const [pagesToPrint, setPagesToPrint] = useState("all"); // Lựa chọn mặc định là "all"

  let startPage = 1, endPage = 1;
  const [errorPage, seterrorPage] = useState("");

  const handlePageCountChange = (value) => {
    // Kiểm tra nếu giá trị nhập vào không phải số hoặc nhỏ hơn hoặc bằng 0
    if (isNaN(value) || value <= 0) {
      setError("Số trang phải là một số và lớn hơn 0.");
    } else {
      switch (pagesToPrint) {
        case "all":
          onChangeValue(2, parseInt(value));
          break;
        case "odd":
          onChangeValue(2, parseInt(Math.ceil(value / 2)));
          break;
        case "even":
          onChangeValue(2, parseInt(Math.floor(value / 2)));
          break;
        case "custom":
          setPagesToPrint("all");
          onChangeValue(2, parseInt(value));
          break;
      }
      setPageCount(value);
      setError("");
    }
  };

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
        onChangeValue(20, null);
        onChangeValue(11, file.name); 
        onChangeValue(10, parseFloat((file.size / 1024 / 1024)));
        setOpenPreview(true);
      } else {
        alert("Chỉ được chọn file PDF.");
        event.target.value = null; // Reset input nếu loại file không phải PDF
      }
    }
  };

  // Mở modal preview
  const handlePreview = () => {
    if (!fileContent) {
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
            sx={{
              //width: "100%",
              height: "100%",
              backgroundColor: "white",
              display:"flex",
              flexDirection:"column",
              color : "black",
              border :"brown",
              borderRadius:"20px"
            }}
          >
            <img src={Upload} style={{maxWidth:"80px"}} />
            Select File
          </Button>
        </label>
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreview}
            sx={{
              //width: "100%",
              height: "100%",
              backgroundColor: "white",
              display:"flex",
              flexDirection:"column",
              color : "black",
              border :"brown",
              borderRadius:"20px",
              marginBottom: "10px"
            }}
          >
            <img src={Setting} style={{maxWidth:"80px"}} />
            Preview & Configure print
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSelectedFile(null);
              setFileContent(null);
              onChangeValue(100, null);
            }}
            sx={{
              //width: "100%",
              height: "100%",
              backgroundColor: "#f54949",
              display:"flex",
              flexDirection:"column",
              color : "black",
              border :"brown",
              borderRadius:"20px"
            }}
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

              {/* Nhập số trang */}
              <Box sx={{ margin: "10px 0", display: "flex", flexDirection: "column" }}>
                <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                  <strong>Number of Pages:</strong>
                  <span style={{ fontSize: "12px", color: "red" }}>
                    (Ensure the page count is correct for the file)
                  </span>
                </Typography>
                <TextField
                  fullWidth
                  defaultValue={pageCount}

                  onChange={(e) => {
                    handlePageCountChange(e.target.value);
                    onChangeValue(21, null);
                  }}
                  error={!!error}
                  helperText={error || null}
                  label="Enter Number of Pages"
                  variant="outlined"
                  sx={{
                    borderColor: error ? "red" : "#ddd",
                  }}
                />
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
                      onChangeValue(6, parseInt(e.target.value));
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
                    onChange={(e) => {
                      setPagesToPrint(e.target.value);
                      switch (e.target.value) {
                        case "all":
                          onChangeValue(2, pageCount);
                          break;
                        case "odd":
                          onChangeValue(2, Math.ceil(pageCount / 2));
                          break;
                        case "even":
                          onChangeValue(2, Math.floor(pageCount / 2));
                          break;
                      }
                    }}
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
                      defaultValue={startPage}
                      min={1}
                      style={{
                        width: "50%",
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
                      onChange={(e) => {
                        startPage = e.target.value;
                        if (startPage > endPage)
                          seterrorPage("loi");
                        else
                          onChangeValue(2, parseInt(endPage - startPage + 1))
                      }}
                      sx={{
                        borderColor: errorPage ? "red" : "#ddd",
                      }}
                    />
                    <input
                      type="number"
                      placeholder="To"
                      min={1}
                      defaultValue={endPage}
                      style={{
                        width: "50%",
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
                      onChange={(e) => {
                        endPage = e.target.value;
                        if (startPage > endPage)
                          seterrorPage("loi");
                        else
                          onChangeValue(2, parseInt(endPage - startPage + 1))
                      }}
                      sx={{
                        borderColor: errorPage ? "red" : "#ddd",
                      }}
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
