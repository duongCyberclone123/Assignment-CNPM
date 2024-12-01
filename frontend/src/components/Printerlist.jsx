import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, Card, CardContent, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from 'axios';

import PR from "../assets/printer.png"; // Path to the printer image
import printerView from "../assets/printerView.png"; // Path to the printer image

const PrinterList = ({ onChangeValue }) => {
    // thong tin tra ve tu api
    const [printers, setPrinters] = useState([]);
    // Chon may
    const [selectedPrinter, setSelectedPrinter] = useState(null);
    // Cho moral
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleNext = () => {
        setOpen(false);

    };

    const selectPrinter = (printer) => {
        setSelectedPrinter(printer);
        onChangeValue(1, printer.PID);
        onChangeValue(2, null);
    };
    useEffect(() => {
        const fetchPrinters = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/printing/getPrinters");
                if (response.status === 200) {
                    setPrinters(response.data.data);
                }
            } catch (error) {
                console.error("Error while fetching printers:", error.message);
            }
        };

        fetchPrinters();
    }, []);


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
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{
                    //width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    color: "black",
                    border: "brown",
                    borderRadius: "20px",
                    marginBottom: "10px"
                }}
            >
                <img src={printerView} style={{ maxWidth: "80px" }} />
                Select Printer
            </Button>

            {/* Modal for Printer Selection */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
                        maxHeight: "80vh",
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        overflowY: "scroll",
                        overflowX: "hidden",
                    }}
                >


                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Select Printer
                    </Typography>

                    <Grid container spacing={2}>
                        {printers && printers.map((printer) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={printer.PID}>
                                <Card
                                    sx={{
                                        border: selectedPrinter?.PID === printer.PID ? "2px solid #1976d2" : "1px solid #ddd",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        "&:hover": { boxShadow: 4 },
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        width: "100%"
                                    }}
                                    onClick={() => selectPrinter(printer)}
                                >
                                    {/* Printer Image */}
                                    <Box
                                        component="img"
                                        src={PR}
                                        alt="Printer"
                                        sx={{
                                            maxHeight: "80px",
                                            maxWidth: "80px",
                                            marginRight: 2,
                                            objectFit: "contain",
                                        }}
                                    />
                                    {/* Printer Details */}
                                    <CardContent sx={{ padding: 0, maxWidth: "calc(100% -96px)" }}>
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight="bold"
                                            sx={{
                                                width: "100%",                    // Đảm bảo sử dụng hết chiều rộng của CardContent
                                                overflow: 'hidden',               // Ẩn nội dung tràn ra ngoài
                                                whiteSpace: 'nowrap',             // Ngăn văn bản xuống dòng
                                                textOverflow: 'ellipsis',         // Hiển thị dấu ba chấm khi quá dài
                                            }}
                                            title={printer.Pname + ' (' + printer.Pmodel + ')'} // Hiển thị thông tin đầy đủ khi hover
                                        >
                                            {printer.Pname + ' (' + printer.Pmodel + ')'}
                                        </Typography>
                                        <Typography variant="body2">ID: {printer.PID}</Typography>
                                        <Typography variant="body2">
                                            <strong>Base:</strong> {printer.Pfacility}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Building:</strong> {printer.Pbuilding}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Room:</strong> {printer.Proom}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color={printer.Pstatus === "Active" ? "green" : "red"}
                                        >
                                            {printer.Pstatus === "Active" ? "Ready" : "Not Ready"}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
                        <Button variant="outlined" color="error" onClick={handleClose} sx={{ marginRight: 2 }}>
                            Exit
                        </Button>
                        {selectedPrinter &&
                            <Button variant="outlined" color="success" onClick={handleClose} sx={{ marginRight: 2 }}>
                                Done
                            </Button>
                        }
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default PrinterList;
