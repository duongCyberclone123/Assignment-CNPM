import React, { useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import Navbar from '../../components/Navbar'

import time from '../../assets/time.png';
import location from '../../assets/location.png';
import axios from 'axios';

const History = () => {
    const menuItems = ['Trang chủ', 'In tài liệu', 'Lịch sử in', 'Mua trang in'];
    const routes = ['/home', '/print', '/history', '/purchase'];


    const historyData = [
        {
            title: 'Document A',
            time: '13:26-13:45 25/10/2024',
            pages: 2,
            pageSize: 'A4',
            copies: 3,
            color: true,
            twoSided: false,
            orientation: true,
            fileSize: '200 KB',
            location: 'A2 Bach Khoa tp Ho Chi Minh',
            status: 'Pending',
        },
        {
            title: 'Document B',
            time: '14:00-14:20 26/10/2024',
            pages: 4,
            pageSize: 'A3',
            copies: 2,
            color: false,
            twoSided: true,
            orientation: false,
            fileSize: '500 KB',
            location: 'A3 Bach Khoa tp Ho Chi Minh',
            status: 'Success',
        },
        {
            title: 'Document C',
            time: '15:10-15:40 27/10/2024',
            pages: 10,
            pageSize: 'A4',
            copies: 1,
            color: true,
            twoSided: true,
            orientation: true,
            fileSize: '1.2 MB',
            location: 'A4 Bach Khoa tp Ho Chi Minh',
            status: 'Failed',
        },
        {
            title: 'Document C',
            time: '15:10-15:40 27/10/2024',
            pages: 10,
            pageSize: 'A4',
            copies: 1,
            color: true,
            twoSided: true,
            orientation: true,
            fileSize: '1.2 MB',
            location: 'A4 Bach Khoa tp Ho Chi Minh',
            status: 'Failed',
        },
    ];


    useEffect(() => {
        const run = async () => {
            try {
                const sID = localStorage.getItem("ID");
                const response = await axios.get("http://localhost:8000/api/printing/viewHistoryLog", { studentID: sID });
                if (response.status === 200) {
                    console.log(response);
                }
            } catch (error) {
                console.error("Error while fetching printers:", error.message);
            }
        }
        run();
    }), [];

    const getBackgroundColor = (status) => {
        switch (status) {
            case 'Pending':
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
                    {historyData.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card
                                sx={{
                                    backgroundColor: getBackgroundColor(item.status),
                                    borderRadius: '12px',
                                    padding: '16px 16px 0 16px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    maxWidth: '300px'
                                }}
                            >
                                <CardContent>
                                    {/* Title */}
                                    <Typography
                                        variant="h5"
                                        sx={{ fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center' }}
                                    >
                                        {item.title}
                                    </Typography>

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
                                        {item.time}
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
                                            <strong>Pages:</strong> {item.pages} ({item.pageSize})
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>No copies:</strong> {item.copies}
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
                                            <strong>Color:</strong> {item.color ? 'yes' : 'no'}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Two-sided:</strong> {item.twoSided ? 'yes' : 'no'}
                                        </Typography>
                                    </Box>


                                    {/* Orientation */}
                                    <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                                        <strong>Orientation:</strong> {item.orientation ? 'yes' : 'no'}
                                    </Typography>

                                    {/* File Size */}
                                    <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                                        <strong>File size:</strong> {item.fileSize}
                                    </Typography>

                                    {/* Location */}
                                    <Typography
                                        variant="body2"
                                        sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                                    >
                                        {/* Image as icon */}
                                        <img
                                            src={location} // Assuming time.png is in 'public/assets'
                                            alt="Time Icon"
                                            style={{ width: '18px', height: '18px', marginRight: '6px' }}
                                        />
                                        {item.location}
                                    </Typography>
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
