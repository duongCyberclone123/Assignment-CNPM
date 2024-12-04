import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, Card, CardContent, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from 'axios';

import PR from "../assets/printer.png";
import printerView from "../assets/printerView.png";
import search from "../assets/search.png";

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

    const [Base, setBase] = useState("");
    const [Building, setBuilding] = useState("");
    const [Room, setRoom] = useState("");


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

    const getPrinter = async () => {
        try {
            console.log({ Base, Building, Room, });
            const response = await axios.get("http://localhost:8000/api/printing/getPrinters", {
                params: {
                    place: Base,
                    building: Building,
                    room: Room
                }
            });
            
            if (response.status === 200) {
                setPrinters(response.data.data);
            }
        } catch (error) {
            console.error("Error while fetching printers:", error.message);
        }
    };


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


                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: "10px",
                        }}
                    >
                        <Typography variant="h6">
                            Chọn máy in
                        </Typography>

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
                                    justifyContent: "space-between",
                                    gap: "10px"
                                }}
                            >
                                <Typography variant="h7" sx={{ alignContent: "center", width: "70px" }}>
                                    Cơ sở
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
                                        maxWidth: "200px",
                                        width: "100%"
                                    }}
                                    onChange={(e) => {
                                        setBase(e.target.value);
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
                                    Tòa
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
                                        maxWidth: "200px",
                                        width: "100%"
                                    }}
                                    onChange={(e) => {
                                        setBuilding(e.target.value);
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
                                    Phòng
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
                                        maxWidth: "200px",
                                        width: "100%"
                                    }}
                                    onChange={(e) => {
                                        setRoom(e.target.value);
                                    }}
                                    onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
                                    onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                                />
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={getPrinter}
                                sx={{
                                    height: "100%",
                                    backgroundColor: "white",
                                    display: "flex",
                                    flexDirection: "column",
                                    color: "black",
                                    border: "brown",
                                    borderRadius: "8px",
                                    padding: "0",
                                }}
                            >
                                <img src={search} style={{ width: "17px" }} />
                            </Button>
                        </Box>
                    </Box>
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
                <Typography variant="body2" sx={{ justifySelf: "flex-start" }}>ID: {selectedPrinter?.PID}</Typography>
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
