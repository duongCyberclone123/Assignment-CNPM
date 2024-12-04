import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Navbar from '../../components/Navbar'

import time from '../../assets/time.png';
import location from '../../assets/location.png';
import axios from 'axios';

const History = () => {
    const menuItems = ['Trang chủ', 'In tài liệu', 'Lịch sử in', 'Mua trang in'];
    const routes = ['/home', '/print', '/history', '/purchase'];


    const [historyData, setHistoryData] = useState([]);


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
                const sID =JSON.parse(localStorage.getItem("userData")).ID;
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


    const [sortOption, setSortOption] = useState('Tstart_time'); // mặc định sắp xếp theo thời gian
    const [sortOrder, setSortOrder] = useState('desc'); // mặc định sắp xếp giảm dần

    const handleSortChange = (option) => {
        setSortOption(option);
        sortData(option, sortOrder);
    };

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
        sortData(sortOption, order);
    };

    // Hàm sắp xếp
    const sortData = (option, order) => {
        const sortedData = [...historyData];
        switch (option) {
            case 'Tpages_per_copy':
                sortedData.sort((a, b) => order === 'asc' ? a.Tpages_per_copy - b.Tpages_per_copy : b.Tpages_per_copy - a.Tpages_per_copy);
                break;
            case 'Tcopies':
                sortedData.sort((a, b) => order === 'asc' ? a.Tcopies - b.Tcopies : b.Tcopies - a.Tcopies);
                break;
            case 'status':
                sortedData.sort((a, b) => order === 'asc' ? a.Tstatus.localeCompare(b.Tstatus) : b.Tstatus.localeCompare(a.Tstatus));
                break;
            case 'Tstart_time':
                sortedData.sort((a, b) => order === 'asc' ? new Date(a.Tstart_time) - new Date(b.Tstart_time) : new Date(b.Tstart_time) - new Date(a.Tstart_time));
                break;
            default:
                break;
        }
        setHistoryData(sortedData);
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

                {/* Sort Section */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "15px",
                        padding: "15px 0",
                    }}
                >
                    <p style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>Sort:</p>

                    {/* Sort by Dropdown */}
                    <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                        <InputLabel id="sort-by-label">Sort by</InputLabel>
                        <Select
                            labelId="sort-by-label"
                            value={sortOption}
                            onChange={(e) => handleSortChange(e.target.value)}
                            label="Sort by"
                        >
                            <MenuItem value="Tstart_time">Time</MenuItem>
                            <MenuItem value="Tpages_per_copy">Pages per Copy</MenuItem>
                            <MenuItem value="Tcopies">Copies</MenuItem>
                            <MenuItem value="status">Status</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Sort Order Dropdown */}
                    <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                        <InputLabel id="sort-order-label">Order</InputLabel>
                        <Select
                            labelId="sort-order-label"
                            value={sortOrder}
                            onChange={(e) => handleSortOrderChange(e.target.value)}
                            // label="Order"
                        >
                            <MenuItem value="asc">Ascending</MenuItem>
                            <MenuItem value="desc">Descending</MenuItem>
                        </Select>
                    </FormControl>
                </div>
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
