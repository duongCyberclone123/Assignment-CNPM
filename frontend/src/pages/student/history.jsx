import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Navbar from '../../components/Navbar'

import time from '../../assets/time.png';
import search from "../../assets/search.png";

import axios from 'axios';

const History = () => {
    const menuItems = ['Trang chủ', 'In tài liệu', 'Lịch sử in', 'Mua trang in'];
    const routes = ['/student-dashboard', '/print', '/history', '/purchase'];


    const [historyData, setHistoryData] = useState([]);

    const [printerID, setPrinterID] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const sID = JSON.parse(localStorage.getItem("userData")).ID;


    function formatTimeRange(startTime, endTime) {
        // Chuyển đổi chuỗi thời gian ISO 8601 thành đối tượng Date
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);

        // Lấy giờ và phút từ Date
        const startHour = startDate.getUTCHours().toString().padStart(2, '0');
        const startMinute = startDate.getUTCMinutes().toString().padStart(2, '0');
        const endHour = endDate.getUTCHours().toString().padStart(2, '0');
        const endMinute = endDate.getUTCMinutes().toString().padStart(2, '0');

        // Lấy ngày và tháng từ Date
        const day = startDate.getUTCDate().toString().padStart(2, '0');
        const month = (startDate.getUTCMonth() + 1).toString().padStart(2, '0');  // Tháng bắt đầu từ 0
        const year = startDate.getUTCFullYear();

        // Trả về chuỗi định dạng theo yêu cầu
        return `${(startHour === "00" && startMinute === "00") ? '__' : startHour}:${(startHour === "00" && startMinute === "00") ? '__' : startMinute}-${(endHour === "00" && endMinute === "00") ? '__' : endHour}:${(endHour === "00" && endMinute === "00") ? '__' : endMinute} ${day}-${month}-${year}`;
    }


    useEffect(() => {
        const run = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/printing/viewHistoryLog", {
                    params: { sid: sID },
                });


                if (response.status === 200) {
                    setHistoryData(response.data.data.data);
                }
            } catch (error) {
                console.error("Error while fetching printers:", error.message);
            }
        };
        run();


    }, []);

    const getHistory = async () => {
        try {
            const params = {
                sid: sID,
            };
            const formatDate = (dateString) => {
                if (!dateString) return null;
                const [day, month, year] = dateString.split("-");
                return `${year}-${month}-${day} 00:00:00`;
            };
    
            if (startTime) {
                params.startTime = formatDate(startTime);
            }
            if (endTime) {
                params.endTime = formatDate(endTime);
            }
            if (printerID) {
                params.endTime = endTime;
                params.pid = parseInt(printerID);
            }

            const response = await axios.get("http://localhost:8000/api/printing/viewHistoryLog", { params });
            if (response.status === 200) {
                setHistoryData(response.data.data.data);
            }
        } catch (error) {
            console.error("Error while fetching history:", error.message);
        }
    };


    const getBackgroundColor = (status) => {
        switch (status) {
            case 'pending':
                return '#dbe7ff'; // Light blue
            case 'Success':
                return '#d8f3dc'; // Light green
            case 'Failed':
                return '#fff4e6'; // Light orange
            default:
                return '#ffffff'; // Default white
        }
    };


    return (
        <>{/* Đặt lại margin và padding của html, body */}
            <style>
                {`html, body {margin: 0; padding: 0; width: 100%; overflow-x: hidden;}`}
            </style>

            <Navbar
                title="STUDENT PORTAL"
                menuItems={menuItems}
                routes={routes}
                active={"Lịch sử in"}
            />
            <div
                style={{
                    margin: "0 auto",
                    maxWidth: "1500px",
                    padding: "90px 20px 0 20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "30px",
                }}
            >
                {/* Print Summary */}
                <h2 style={{ fontSize: "24px", fontWeight: "bold", }}>
                    You have printed <span style={{ color: "#1E90FF" }}>{historyData.length}</span> times!
                </h2>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        flex: "1",
                        justifyContent: "right",
                        gap: "20px"
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "right",
                            gap: "10px"
                        }}
                    >
                        <Typography variant="h7" sx={{ alignContent: "center", }}>
                            ID máy in
                        </Typography>
                        <input
                            type="text"
                            style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                fontSize: "14px",
                                outline: "none",
                                backgroundColor: "#fff",
                                transition: "border-color 0.3s ease",
                                maxWidth: "150px",
                                width: "100%"
                            }}
                            onChange={(e) => {
                                setPrinterID(e.target.value);
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
                            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "right",
                            gap: "10px"
                        }}
                    >
                        <Typography variant="h7" sx={{ alignContent: "center", }}>
                            Khoảng thời gian
                        </Typography>
                        <input
                            type="text"
                            placeholder="From (dd-mm-yyyy)"
                            style={{

                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                fontSize: "14px",
                                outline: "none",
                                backgroundColor: "#fff",
                                transition: "border-color 0.3s ease",
                                maxWidth: "150px",
                                width: "100%"
                            }}
                            onChange={(e) => {
                                setStartTime(e.target.value);
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
                            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                        />
                        <input
                            type="text"
                            placeholder="To (dd-mm-yyyy)"
                            style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                fontSize: "14px",
                                outline: "none",
                                backgroundColor: "#fff",
                                transition: "border-color 0.3s ease",
                                maxWidth: "150px",
                                width: "100%"
                            }}
                            onChange={(e) => {
                                setEndTime(e.target.value);
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
                            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={getHistory}
                        sx={{
                            height: "100%",
                            backgroundColor: "white",
                            display: "flex",
                            flexDirection: "column",
                            color: "black",
                            border: "brown",
                            borderRadius: "8px",
                            padding: "5px 0",
                        }}
                    >
                        <img src={search} style={{ width: "29px" }} />
                    </Button>
                </Box>
            </div>

            <Box
                sx={{
                    padding: '0 15px',
                    maxWidth: '1500px',
                    display: 'flex',       // Flexbox for alignment
                    justifyContent: 'space-between', // Horizontal alignment with space between items
                    margin: '0 auto',      // Center the Box horizontally in the viewport
                }}
            >
                <Grid container spacing={3} justifyContent="left">
                    {historyData.length > 0 && historyData.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card
                                sx={{
                                    backgroundColor: getBackgroundColor(item.Tstatus),
                                    borderRadius: '12px',
                                    padding: '16px 16px 0 16px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <CardContent>
                                    {/* Title */}
                                    {/* <Typography
                                        variant="h5"
                                        sx={{ fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center' }}
                                    >
                                        {item.title}
                                    </Typography> */}

                                    {/* Time */}
                                    <Typography
                                        variant="body2"
                                        sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                                    >
                                        {/* Image as icon */}
                                        <img
                                            src={time} // Replace with the actual image path
                                            alt="Time Icon"
                                            style={{ width: '18px', height: '18px', marginRight: '6px' }} // Size and margin for the image
                                        />
                                        {formatTimeRange(item.Tstart_time, item.Tend_time)}
                                    </Typography>


                                    {/* Pages and Copies */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        <Typography variant="body2">
                                            <strong>PrinterID:</strong> {item.PID}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Pages:</strong> {item.Tpages_per_copy}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>No copies:</strong> {item.Tcopies}
                                        </Typography>
                                    </Box>

                                    {/* Color and Two-sided */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        <Typography variant="body2">
                                            <strong>Color:</strong> {item.isColoring ? 'yes' : 'no'}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Two-sided:</strong> {item.Tis_double_size ? 'yes' : 'no'}
                                        </Typography>
                                    </Box>


                                    {/* Orientation */}
                                    <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                                        <strong>Orientation:</strong> {item.isHorizon ? 'Horizontial' : 'Vertical'}
                                    </Typography>

                                    {/* File Size */}
                                    <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                                        <strong>Pages size:</strong> {item.Tpage_size}
                                    </Typography>

                                    {/* Location */}
                                    {/* <Typography
                                        variant="body2"
                                        sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                                    >
                                        <img
                                            src={location} 
                                            alt="Time Icon"
                                            style={{ width: '18px', height: '18px', marginRight: '6px' }}
                                        />
                                        {item.location}
                                    </Typography> */}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default History;