import axios from 'axios';
import React, { useState, useEffect,useRef  } from 'react';
import { Button, Dialog, DialogTitle, Box, LinearProgress, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import Calendar from '../../components/Calendar';
import FileUpload from '../../components/Fileupload';
import PrinterList from '../../components/Printerlist';
import checked from "../../assets/checked.png";

const Print = () => {
    const menuItems = ['Trang chủ', 'In tài liệu', 'Lịch sử in', 'Mua trang in'];
    const routes = ['/home', '/print', '/history', '/purchase'];
    const [seFile, setSeFile] = useState(false);
    const [seFilePage, setSeFilePage] = useState(false);
    const [sePrinter, setSePrinter] = useState(false);

    const [pID, setPID] = useState(-1);
    const [pageSize, setPageSize] = useState("A4");
    const [isDoubleside, setIsDoubleside] = useState(true);
    const [isColor, setIsColor] = useState(true);
    const [isHorizon, setIsHorizon] = useState(true);
    const [numberOfCopies, setNumberOfCopies] = useState(1);
    const [numOfPages, setNumOfPages] = useState(0);
    const [docSize, setDocSize] = useState(0);
    let dID = -1;
    const [docName, setDocName] = useState("");
    const studentID = JSON.parse(localStorage.getItem("userData")).ID;

    const [loaddone, setLoaddone] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const handleCloseModal = () => {
        setSuccessModalOpen(false);
        navigate('/home');
    }


    const handleFileConfigure = (id, value) => {
        switch (id) {
            case 1:
                setPageSize(value);
                break;
            case 2:
                setNumOfPages(value);
                break
            case 3:
                setIsDoubleside((value == "two") ? true : false);
                break
            case 4:
                setIsColor((value == "Color") ? true : false);
                break
            case 5:
                setIsHorizon((value == "Horizontal") ? true : false);
                break
            case 6:
                setNumberOfCopies(value);
                break
            case 100:
                setPageSize("A4");
                setIsDoubleside(true);
                setIsColor(true);
                setIsHorizon(true);
                setNumberOfCopies(1);
                break;
            case 10:
                setDocSize(value + 1);
                break
            case 11:
                setDocName(value);
                break
            case 20:
                setSeFile(true);
                break
            case 21:
                setSeFilePage(true);
                break
        }
    }
    const handlePrinterConfigure = (id, value) => {
        switch (id) {
            case 1:
                setPID(value);
                break;
            case 2:
                setSePrinter(true);
                break;
        }
    }
    const uploadFile = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/printing/uploadFile", {
                dname: docName,
                dsize: docSize,
                dformat: "PDF",
                dpage_num: numOfPages
            },
                { params: { uid: studentID }, }
            );
            dID = response.data.data.did;
        } catch (error) {
            console.error("Error while upload document", error.message);
        }
    };

    const makeTransition = async () => {
        try {
            const responseMakeTran = await axios.post("http://localhost:8000/api/printing/receivePrintingRequest",
                {
                    isdoublesize: isDoubleside ? 1 : 0,
                    ishorizon: isHorizon ? 1 : 0,
                    iscoloring: isColor ? 1 : 0,
                    tpagesize: pageSize,
                    tpages_per_copy: numOfPages,
                    tcopies: numberOfCopies,
                    pid: pID,
                    did: dID,
                    sid: parseInt(studentID),
                }
            );
        } catch (error) {
            console.error("Error while upload document", error.message);
        }
    }
    // loading box
    const [progress, setProgress] = useState(0); // Trạng thái cho tiến trình
    useEffect(() => {
        if (progress === 100) {
            setLoaddone(true); // Đánh dấu là tải xong
        }
    }, [progress])
    const timerRef = useRef(null); // Lưu trữ ID của timer

    const startLoad = () => {
      setProgress(0);
      setLoaddone(false);
      
      // Hủy bỏ interval cũ nếu có
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
  
      // Tạo interval mới và lưu ID vào useRef
      timerRef.current = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress < 100 ? prevProgress + 1 : 100
        );
      }, 50); // Cập nhật mỗi 50ms
    };

    return (<>
        <style>
            {`html, body {margin: 0; padding: 0; width: 100%; overflow-x: hidden;}`}
        </style>

        <Navbar
            title="STUDENT PORTAL"
            menuItems={menuItems}
            routes={routes}
            active={"In tài liệu"}
        />

        <div style={{
            padding: '90px 15px',
            maxWidth: '1500px',
            display: 'flex',       // Flexbox for alignment
            justifyContent: 'center', // Horizontal alignment with space between items
            margin: '0 auto',      // Center the Box horizontally in the viewport
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
                <div style={{ flex: 1, height: '157px', display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
                    <FileUpload onChangeValue={handleFileConfigure} />
                    <PrinterList onChangeValue={handlePrinterConfigure} />
                    <div style={{
                        padding: "20px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                        <Button

                            variant="contained"
                            // component="span"
                            sx={{
                                height: "100%",
                                backgroundColor: "green"
                            }}
                            disabled={!(seFile && sePrinter && seFilePage)}
                            onClick={async () => {
                                await uploadFile();
                                await makeTransition();
                                setSuccessModalOpen(true);
                                startLoad();
                            }}
                        >
                            PRINT
                        </Button>

                    </div>
                </div>
                <div style={{ marginLeft: '20px', width: "50%", display: 'flex', justifyContent: 'center' }}>
                    <Calendar scale={1.2} />
                </div>
            </div>

        </div>

        <Dialog open={successModalOpen} onClose={handleCloseModal}>
            {!loaddone && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",  // Căn giữa các phần tử
                        // padding: "20px",
                        width: "500px",
                        height: "240px",
                    }}
                >
                    {/* Thanh tiến trình */}
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                width: "80%",  // Đảm bảo thanh tiến trình chiếm 80% chiều rộng của box
                                height: "10px",  // Chiều cao của thanh tiến trình
                                borderRadius: "5px",  // Bo góc cho thanh tiến trình
                                backgroundColor: "#ddd",  // Màu nền của thanh tiến trình
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: "#1E90FF",  // Màu sắc của thanh tiến trình
                                },
                            }}
                        />
                    </Box>
                    {/* Hiển thị phần trăm */}
                    <Typography
                        variant="body1"
                        sx={{
                            marginTop: "10px",
                            fontWeight: "bold",
                        }}
                    >
                        Loading... {progress}%
                    </Typography>
                </Box>
            )}

            {loaddone && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",  // Căn giữa các phần tử
                        padding: "20px",
                    }}
                >
                    <Box
                        component="img"
                        src={checked}
                        alt="Success"
                        sx={{
                            maxHeight: "80px",
                            maxWidth: "80px",  // Giới hạn kích thước của hình ảnh
                            objectFit: "contain",  // Giữ nguyên tỷ lệ ảnh
                        }}
                    />
                    <DialogTitle
                        sx={{
                            textAlign: "center",
                            fontSize: "30px",
                            padding: "10px 0 0 0",
                        }}
                    >
                        In thành công
                    </DialogTitle>
                    <DialogTitle
                        sx={{
                            textAlign: "center",
                            fontSize: "14px",
                            padding: "10px 0",
                            maxWidth: "100%",
                            wordWrap: "break-word",
                            whiteSpace: "normal"
                        }}
                    >
                        Tài liệu của bạn sẽ được in. Nếu có sự cố gì hãy liên hệ với chúng tôi để có thể được phản hồi và giải quyết.
                    </DialogTitle>
                </Box>
            )}
        </Dialog>

    </>
    );
}

export default Print;