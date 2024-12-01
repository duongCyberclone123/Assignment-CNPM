import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Typography,
    Modal,
    Card,
    CardContent,
    Grid,
} from "@mui/material";
import axios from 'axios';

import PR from "../assets/printer.png"; // Path to the printer image

const PrinterList = ({onChangeValue}) => {
    // thong tin tra ve tu api
    const [printers, setPrinters] = useState([]);
    // Chon may
    const [selectedPrinter, setSelectedPrinter] = useState(null);
    // Cho moral
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const selectPrinter = (printer) => {
        setSelectedPrinter(printer);
        onChangeValue(printer.PID);
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
            <Button variant="contained" color="primary" onClick={handleOpen}>
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
                                    <CardContent sx={{ padding: 0 }}>
                                        <Typography variant="subtitle1" fontWeight="bold">
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
                        {/* <Button
                            variant="contained"
                            color="success"
                            disabled={!selectedPrinter}
                        >
                            Select
                        </Button> */}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default PrinterList;
