import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';
import Navbar from '../components/Navbar'

const SPSOHistoryLog = () => {
  const menuItems = ['Trang chủ', 'Quản lí máy in', 'Lịch sử in', 'Báo cáo'];
  const routes = ['/spsodashboard', '/manageprinter', '/spsohistory', '/report'];
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

      const response = await axios.post('http://localhost:8000/api/printing/viewLog', requestBody);

      if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
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
        <Navbar
                title="SPSO"
                menuItems={menuItems}
                routes={routes}
                active={"Quản lí lịch sử in"}
            />
      <Box sx={{ marginTop: '80px' }}></Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' ,color: '#1e88e5'}}>Lịch sử in</Typography>

      <Box sx={{ marginBottom: 3 }}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            label="Student ID"
            variant="outlined"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            fullWidth
            sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { backgroundColor: '#f5f5f5' }}}
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
            sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { backgroundColor: '#f5f5f5' }}}
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
            sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { backgroundColor: '#f5f5f5' }}}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            label="Printer ID"
            variant="outlined"
            value={printerId}
            onChange={(e) => setPrinterId(e.target.value)}
            fullWidth
            sx={{ borderRadius: '8px', '& .MuiOutlinedInput-root': { backgroundColor: '#f5f5f5' }}}
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
            marginTop: 2,
            padding: '10px 0',
            fontWeight: 'bold',
          }}
        >
          Lấy lịch sử in
        </Button>
      </Box>

      {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
      {error && <Typography variant="body1" color="error" sx={{ textAlign: 'center', fontWeight: 'bold' }}>{error}</Typography>}

      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>Kết quả</Typography>
        <Box sx={{ marginTop: 2 }}>
          {history.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', fontStyle: 'italic' }}>Không có dữ liệu.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="history table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#1976d2' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' , border: '1px solid #ddd'}}>TID</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' , border: '1px solid #ddd'}}>Số trang mỗi bản sao</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' , border: '1px solid #ddd'}}>Số bản sao</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' , border: '1px solid #ddd'}}>Trạng thái</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' , border: '1px solid #ddd'}}>Kích thước trang</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' , border: '1px solid #ddd'}}>Thời gian bắt đầu</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' , border: '1px solid #ddd'}}>Thời gian kết thúc</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' , border: '1px solid #ddd'}}>Kích thước gấp đôi</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' , border: '1px solid #ddd'}}>Horizon</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' , border: '1px solid #ddd'}}>Màu sắc</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' , border: '1px solid #ddd'}}>SID (Student ID)</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' , border: '1px solid #ddd'}}>DID (Device ID)</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' , border: '1px solid #ddd'}}>PID (Printer ID)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{border: '1px solid #ddd'}}>{item.TID}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{item.Tpages_per_copy}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{item.Tcopies}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{item.Tstatus}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{item.Tpage_size}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{new Date(item.Tstart_time).toLocaleString()}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{new Date(item.Tend_time).toLocaleString()}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{item.Tis_double_size ? 'Có' : 'Không'}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{item.isHorizon ? 'Có' : 'Không'}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{item.isColoring ? 'Có' : 'Không'}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{item.SID}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{item.DID}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{item.PID}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SPSOHistoryLog;
