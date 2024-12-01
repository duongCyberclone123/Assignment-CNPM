import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import Navbar from '../../components/Navbar'

import time from '../../assets/time.png';
import location from '../../assets/location.png';
import axios from 'axios';

const History = () => {
    const menuItems = ['Trang chủ', 'In tài liệu', 'Lịch sử in', 'Mua trang in'];
    const routes = ['/home', '/print', '/history', '/purchase'];


    const [historyData, sethistoryData] = useState([]);


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
                const sID = localStorage.getItem("ID");
                console.log(sID);
                const response = await axios.get("http://localhost:8000/api/printing/viewHistoryLog", {
                    params: { sid: sID },
                });
                
                if (response.status === 200) {
                    sethistoryData(response.data.data.data);
                    console.log(response.data.data.data);
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

            <Box
                sx={{
                    padding: '90px 15px',
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
                                    maxWidth: '300px'
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
