import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import Navbar from "/components/navbar"
const PrintHistory = () => {
  const [studentId, setStudentId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [printerId, setPrinterId] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPrintHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/api/prints/history', {
        params: {
          studentId,
          startDate,
          endDate,
          printerId,
        },
      });
      setHistory(response.data.data);
    } catch (err) {
      setError('Không thể lấy lịch sử in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Navbar />  {/* Dùng lại thanh điều hướng ở đây */}
      <Box sx={{ marginTop: '80px' }}></Box>
      <Typography variant="h4" gutterBottom>Lịch sử in</Typography>

      <Box sx={{ marginBottom: 3 }}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            label="Student ID"
            variant="outlined"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            fullWidth
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            type="date"
            label="Từ ngày"
            variant="outlined"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            type="date"
            label="Đến ngày"
            variant="outlined"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            label="Printer ID"
            variant="outlined"
            value={printerId}
            onChange={(e) => setPrinterId(e.target.value)}
            fullWidth
          />
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={fetchPrintHistory}
          fullWidth
        >
          Lấy lịch sử in
        </Button>
      </Box>

      {loading && <Typography variant="body1">Đang tải...</Typography>}

      {error && <Typography variant="body1" color="error">{error}</Typography>}

      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6">Kết quả</Typography>
        <Box sx={{ marginTop: 2 }}>
          {history.length === 0 ? (
            <Typography variant="body1">Không có dữ liệu.</Typography>
          ) : (
            <ul>
              {history.map((item, index) => (
                <li key={index}>
                  <Typography variant="body2">
                    <strong>ID: </strong>{item.studentId} - <strong>Ngày: </strong>{new Date(item.date).toLocaleDateString()} - <strong>Printer: </strong>{item.printerId}
                  </Typography>
                </li>
              ))}
            </ul>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default PrintHistory;
