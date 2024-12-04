import React, { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography, Dialog, DialogTitle, DialogActions } from "@mui/material";
import checked from "../../assets/checked.png";
import axios from "axios";
import Navbar from "../../components/Navbar";
const PrintPurchasePage = () => {
    const menuItems = ['Trang chủ', 'In tài liệu', 'Lịch sử in', 'Mua trang in'];
    const routes = ['/student-dashboard', '/print', '/history', '/purchase'];

    const [paperCount, setPaperCount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [paymentDetails, setPaymentDetails] = useState({});
    const [errors, setErrors] = useState({});
    const [successModalOpen, setSuccessModalOpen] = useState(false);

    const validate = () => {
        const newErrors = {};

        // Kiểm tra số lượng giấy
        if (!paperCount || isNaN(paperCount) || parseInt(paperCount) <= 0) {
            newErrors.paperCount = "Please enter a valid number of sheets.";
        }

        // Kiểm tra các trường dựa trên phương thức thanh toán
        if (paymentMethod === "bank_transfer") {
            if (!paymentDetails.accountNumber) {
                newErrors.accountNumber = "Bank account number is required.";
            }
            if (!paymentDetails.bankName) {
                newErrors.bankName = "Bank name is required.";
            }
        }

        if (paymentMethod === "credit_card") {
            if (!paymentDetails.cardNumber || !/^\d{16}$/.test(paymentDetails.cardNumber)) {
                newErrors.cardNumber = "Card number must be 16 digits.";
            }
            if (!paymentDetails.cardholderName) {
                newErrors.cardholderName = "Cardholder name is required.";
            }
            if (!paymentDetails.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
                newErrors.expiryDate = "Expiry date must be in MM/YY format.";
            }
        }

        if (paymentMethod === "e_wallet") {
            if (!paymentDetails.walletId) {
                newErrors.walletId = "E-Wallet ID is required.";
            }
        }

        setErrors(newErrors);

        // Nếu không có lỗi, trả về true
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = async () => {
        if (validate()) {
            setSuccessModalOpen(true);
            const res = await axios.post("http://localhost:8000/api/printing/buyPage",
                { sid: JSON.parse(localStorage.getItem("userData")).ID, numbersOfPages: paperCount, PMmethod: paymentMethod, }
            )
        }
    };

    const handlePaymentDetailsChange = (field) => (event) => {
        setPaymentDetails({ ...paymentDetails, [field]: event.target.value });
    };

    const handleCloseModal = () => {
        setSuccessModalOpen(false);
        setPaperCount("");
        setPaymentMethod("");
        setPaymentDetails({});
        setErrors({});
    };

    return (<>
        <style>
            {`html, body {margin: 0; padding: 0; width: 100%; overflow-x: hidden;}`}
        </style>

        <Navbar
            title="STUDENT PORTAL"
            menuItems={menuItems}
            routes={routes}
            active={"Mua trang in"}
        />
        <Box sx={{ maxWidth: 600, mx: "auto", mt: "90px", p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
                Purchase Printing Sheets
            </Typography>
            <TextField
                label="Number of Sheets"
                type="number"
                fullWidth
                margin="normal"
                value={paperCount}
                onChange={(e) => setPaperCount(e.target.value)}
                error={!!errors.paperCount}
                helperText={errors.paperCount}
            />
            <TextField
                label="Payment Method"
                select
                fullWidth
                margin="normal"
                value={paymentMethod}
                onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    setPaymentDetails({});
                    setErrors({});
                }}
            >
                <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                <MenuItem value="credit_card">Credit Card</MenuItem>
                <MenuItem value="e_wallet">E-Wallet</MenuItem>
            </TextField>

            {/* Payment Method Details */}
            {paymentMethod === "bank_transfer" && (
                <Box>
                    <TextField
                        label="Bank Account Number"
                        fullWidth
                        margin="normal"
                        value={paymentDetails.accountNumber || ""}
                        onChange={handlePaymentDetailsChange("accountNumber")}
                        error={!!errors.accountNumber}
                        helperText={errors.accountNumber}
                    />
                    <TextField
                        label="Bank Name"
                        fullWidth
                        margin="normal"
                        value={paymentDetails.bankName || ""}
                        onChange={handlePaymentDetailsChange("bankName")}
                        error={!!errors.bankName}
                        helperText={errors.bankName}
                    />
                </Box>
            )}
            {paymentMethod === "credit_card" && (
                <Box>
                    <TextField
                        label="Card Number"
                        fullWidth
                        margin="normal"
                        value={paymentDetails.cardNumber || ""}
                        onChange={handlePaymentDetailsChange("cardNumber")}
                        error={!!errors.cardNumber}
                        helperText={errors.cardNumber}
                    />
                    <TextField
                        label="Cardholder Name"
                        fullWidth
                        margin="normal"
                        value={paymentDetails.cardholderName || ""}
                        onChange={handlePaymentDetailsChange("cardholderName")}
                        error={!!errors.cardholderName}
                        helperText={errors.cardholderName}
                    />
                    <TextField
                        label="Expiry Date"
                        placeholder="MM/YY"
                        fullWidth
                        margin="normal"
                        value={paymentDetails.expiryDate || ""}
                        onChange={handlePaymentDetailsChange("expiryDate")}
                        error={!!errors.expiryDate}
                        helperText={errors.expiryDate}
                    />
                </Box>
            )}
            {paymentMethod === "e_wallet" && (
                <Box>
                    <TextField
                        label="E-Wallet ID"
                        fullWidth
                        margin="normal"
                        value={paymentDetails.walletId || ""}
                        onChange={handlePaymentDetailsChange("walletId")}
                        error={!!errors.walletId}
                        helperText={errors.walletId}
                    />
                </Box>
            )}

            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handlePayment}
                disabled={!paymentMethod || !paperCount}
            >
                Pay Now
            </Button>

            {/* Success Modal */}
            <Dialog open={successModalOpen} onClose={handleCloseModal} >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 3,
                    }}
                >
                    <Box
                        component="img"
                        src={checked}
                        alt="Success"
                        sx={{
                            maxHeight: "80px",
                            maxWidth: "80px",
                            objectFit: "contain",
                        }}
                    />
                    <DialogTitle sx={{ textAlign: "center", fontSize: "30px", padding: "10px 0 0 0" }}>Thanh toán thành công</DialogTitle>
                    <DialogTitle sx={{ textAlign: "center", fontSize: "14px", padding: "10px 0" }}>Số giấy đã được thêm vào  ví của bạn. Nếu có sự cố gì hãy liên hệ với chúng tôi để có thể được phản hồi và giải quyết.</DialogTitle>
                </Box>
            </Dialog>
        </Box>
    </>
    );
};

export default PrintPurchasePage;