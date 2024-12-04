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
    const [selectedIndex, setSelectedIndex] = useState(-1);
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
                padding: "10px 0",
                textAlign: "center",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "20px"
            }}
        >
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{
                    width: "160px",
                    height: "148px",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    color: "black",
                    border: "brown",
                    borderRadius: "8px",
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


                    <Typography variant="h6">
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
                                    onClick={() => {
                                        selectPrinter(printer);
                                        selectedIndex(index);
                                    }}
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
                                                width: "100%",
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
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

            <Box sx={{
                height: "128px",
                width: "200px",
                display: selectedPrinter ? "flex" : "none",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "space-between",
                border: "2px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
            }}>
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{
                        // width: "100%",
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                    }}
                    title={selectedPrinter?.Pname + ' (' + selectedPrinter?.Pmodel + ')'} // Hiển thị thông tin đầy đủ khi hover
                >
                    {selectedPrinter?.Pname + ' (' + selectedPrinter?.Pmodel + ')'}
                </Typography>
                <Typography variant="body2" sx={{ justifySelf: "flex-start"}}>ID: {selectedPrinter?.PID}</Typography>
                <Typography variant="body2" sx={{ justifySelf: "flex-start" }}>
                    <strong>Base:</strong> {selectedPrinter?.Pfacility}
                </Typography>
                <Typography variant="body2" sx={{ justifySelf: "flex-start" }}>
                    <strong>Building:</strong> {selectedPrinter?.Pbuilding}
                </Typography>
                <Typography variant="body2" sx={{ justifySelf: "flex-start" }}>
                    <strong>Room:</strong> {selectedPrinter?.Proom}
                </Typography>
                <Typography
                    variant="body2"
                    color={selectedPrinter?.Pstatus === "Active" ? "green" : "red"}
                    sx={{ justifySelf: "flex-start" }}
                >
                    {selectedPrinter?.Pstatus === "Active" ? "Ready" : "Not Ready"}
                </Typography>
            </Box>
        </div>
    );
};

export default PrinterList;
