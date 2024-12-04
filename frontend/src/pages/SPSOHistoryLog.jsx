import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography, FormControl, Card, CardContent } from '@mui/material';
import axios from 'axios';
import Navbar from "/components/spsonavbar";

const SPSOHistoryLog = () => {
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
      const requestBody = {
        sid: studentId,
        pid: printerId,
        startDate: startDate,
        endDate: endDate,
      };
      
      const response = await axios.get('http://localhost:8000/api/printing/viewLog', { params: requestBody });
  
      if (response.data && response.data.data && response.data.data.data && Array.isArray(response.data.data.data)) {
        setHistory(response.data.data.data);
      } else {
        setError('Dữ liệu trả về không hợp lệ.');
      }
    } catch (err) {
      setError('Không thể lấy lịch sử in.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container>
      <Navbar />
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
            sx={{ borderRadius: '8px' }}
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
            InputLabelProps={{ shrink: true }}
            sx={{ borderRadius: '8px' }}
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
            InputLabelProps={{ shrink: true }}
            sx={{ borderRadius: '8px' }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            label="Printer ID"
            variant="outlined"
            value={printerId}
            onChange={(e) => setPrinterId(e.target.value)}
            fullWidth
            sx={{ borderRadius: '8px' }}
          />
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={fetchPrintHistory}
          fullWidth
          sx={{
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }}
        >
          Lấy lịch sử in
        </Button>
      </Box>

      {loading && <Typography variant="body1">Đang tải...</Typography>}

      {error && <Typography variant="body1" color="error">{error}</Typography>}

      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6" gutterBottom>Kết quả</Typography>
        <Box sx={{ marginTop: 2 }}>
          {history.length === 0 ? (
            <Typography variant="body1">Không có dữ liệu.</Typography>
          ) : (
            <div>
              {history.map((item, index) => (
                <Card key={index} sx={{ marginBottom: 2, borderRadius: '8px' }}>
                  <CardContent>
                    <Typography variant="body1">
                      <strong>TID:</strong> {item.TID} <br />
                      <strong>Số trang mỗi bản sao:</strong> {item.Tpages_per_copy} <br />
                      <strong>Số bản sao:</strong> {item.Tcopies} <br />
                      <strong>Trạng thái:</strong> {item.Tstatus} <br />
                      <strong>Kích thước trang:</strong> {item.Tpage_size} <br />
                      <strong>Thời gian bắt đầu:</strong> {new Date(item.Tstart_time).toLocaleString()} <br />
                      <strong>Thời gian kết thúc:</strong> {new Date(item.Tend_time).toLocaleString()} <br />
                      <strong>Kích thước gấp đôi:</strong> {item.Tis_double_size ? 'Có' : 'Không'} <br />
                      <strong>Horizon:</strong> {item.isHorizon ? 'Có' : 'Không'} <br />
                      <strong>Màu sắc:</strong> {item.isColoring ? 'Có' : 'Không'} <br />
                      <strong>SID (Student ID):</strong> {item.SID} <br />
                      <strong>DID (Device ID):</strong> {item.DID} <br />
                      <strong>PID (Printer ID):</strong> {item.PID}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SPSOHistoryLog;
