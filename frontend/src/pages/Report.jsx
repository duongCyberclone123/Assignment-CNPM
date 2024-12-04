import React, { useState } from 'react';
import { getOverallReport, getDetailReport } from '../services/reportService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, Typography } from '@mui/material';
import Navbar from '../components/Navbar'
const Report = () => {
  const menuItems = ['Trang chủ', 'Quản lí máy in', 'Quản lí lịch sử in', 'Báo cáo'];
    const routes = ['/spsodashboard', '/manageprinter', '/spsohistory', '/report'];
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [overallReport, setOverallReport] = useState(null);
  const [detailReport, setDetailReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hàm xử lý khi người dùng thay đổi năm
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  // Hàm xử lý khi người dùng thay đổi tháng
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  // Hàm gọi API khi người dùng bấm vào nút tìm kiếm
  const handleSearch = async () => {
    if (!year || !month) {
      setError('Vui lòng nhập đầy đủ năm và tháng.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Gọi API để lấy báo cáo tổng hợp
      const overallData = await getOverallReport(year, month);
      if (overallData.status === 'success') {
        setOverallReport(overallData.data[0]); // Lưu báo cáo tổng hợp vào state
      } else {
        setError('Dữ liệu báo cáo tổng hợp không hợp lệ.');
      }

      // Gọi API để lấy báo cáo chi tiết
      const detailData = await getDetailReport(year, month);
      if (detailData.status === 'success') {
        setDetailReport(detailData.data);
      } else {
        setError('Dữ liệu báo cáo chi tiết không hợp lệ.');
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra khi tải báo cáo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Hàm render báo cáo tổng hợp
  const renderOverallReport = (data) => {
    if (!data) {
      return <p>Không có dữ liệu báo cáo tổng hợp.</p>;
    }

    return (
      <div style={styles.report}>
        <h2 style={styles.heading}>Báo cáo tổng hợp</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={styles.tableHeader}>
                <TableCell align="center"><strong>Tổng số giao dịch</strong></TableCell>
                <TableCell align="center"><strong>Tổng số giấy đã dùng</strong></TableCell>
                <TableCell align="center"><strong>Tổng số máy in đã dùng</strong></TableCell>
                <TableCell align="center"><strong>Tổng số học sinh đã dùng</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{data.total_transactions}</TableCell>
                <TableCell align="center">{data.total_papers_used}</TableCell>
                <TableCell align="center">{data.total_printers_used}</TableCell>
                <TableCell align="center">{data.total_students_used}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  const renderDetailReport = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      // Hiển thị hình ảnh khi không có dữ liệu báo cáo chi tiết
      return (
        <div style={styles.imageContainer}>
          <img 
            src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2021/12/how-to-write-a-report.jpeg" 
            style={styles.instructionImage} 
          />
        </div>
      );
    }
    return (
      <div style={styles.report}>
        <h2 style={styles.heading}>Báo cáo chi tiết</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={styles.tableHeader}>
                <TableCell align="center"><strong>ID Máy In</strong></TableCell>
                <TableCell align="center"><strong>Số Sinh Viên Sử Dụng</strong></TableCell>
                <TableCell align="center"><strong>Số Giao Dịch</strong></TableCell>
                <TableCell align="center"><strong>Số Giấy Đã Dùng</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.printer_id} style={styles.tableRow}>
                  <TableCell align="center">{item.printer_id}</TableCell>
                  <TableCell align="center">{item.num_students_used}</TableCell>
                  <TableCell align="center">{item.num_transactions}</TableCell>
                  <TableCell align="center">{item.total_papers_used}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  return (
    <div style={styles.container}>
       <Navbar
                title="SPSO"
                menuItems={menuItems}
                routes={routes}
                active={"Báo cáo"}
            />

      <Typography variant="h4" align="center" gutterBottom style={styles.pageTitle}>Báo cáo</Typography>  {/* Tiêu đề giữa trang */}

      <Grid container spacing={2} justifyContent="center" alignItems="center" style={styles.filters}>
        <Grid item>
          <label htmlFor="year" style={styles.label}>Năm:</label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={handleYearChange}
            min="2000"
            max="2100"
            placeholder="Nhập năm"
            style={styles.inputField}
          />
        </Grid>

        <Grid item>
          <label htmlFor="month" style={styles.label}>Tháng:</label>
          <input
            id="month"
            type="number"
            value={month}
            onChange={handleMonthChange}
            min="1"
            max="12"
            placeholder="Nhập tháng"
            style={styles.inputField}
          />
        </Grid>

        <Grid item>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSearch}
            disabled={!year || !month || loading}  // Vô hiệu hóa nút nếu chưa nhập năm/tháng hoặc đang tải
            style={styles.searchButton}
          >
            Tìm kiếm
          </Button>
        </Grid>
      </Grid>

      {loading && <p>Đang tải dữ liệu...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Hiển thị hình ảnh hướng dẫn nếu chưa tìm kiếm */}
      {(!year || !month) && !loading && !overallReport && !detailReport && (
        <div style={styles.imageContainer}>
          <img 
            src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2021/12/how-to-write-a-report.jpeg" 
            alt="Hướng dẫn viết báo cáo" 
            style={styles.instructionImage} 
          />
        </div>
      )}

      <div>
        {overallReport && renderOverallReport(overallReport)}  {/* Hiển thị báo cáo tổng hợp */}
        {detailReport && renderDetailReport(detailReport)}   {/* Hiển thị báo cáo chi tiết */}
      </div>
    </div>
  );
};

// CSS nhúng
const styles = {
    container: {
      margin: '20px',
      padding: '20px',
      fontFamily: "Arial, sans-serif", // Thay đổi phông chữ toàn bộ
    },
    filters: {
      marginBottom: '20px',
    },
    inputField: {
      padding: '8px',
      marginRight: '10px',
      width: '150px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px', // Đổi kích thước font chữ
    },
    inputFieldFocus: {
      borderColor: '#3f51b5',
    },
    report: {
      marginTop: '20px',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      fontWeight: 'bold',
      fontSize: '24px',
      color: '#1e88e5',  
    },
    tableHeader: {
      backgroundColor: '#f5f5f5',
      fontWeight: 'bold',
      borderBottom: '2px solid #1e88e5', 
      border: '1px solid #ddd'
    },
    tableRow: {
      '&:hover': {
        backgroundColor: '#f2f2f2',  
      },
      borderBottom: '1px solid #ccc', 
      border: '1px solid #ddd'
    },
  searchButton: {
    marginTop: '7px',
    padding: '5px 10px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  pageTitle: {
    marginTop: '60px',
    fontWeight: 'bold',
    color: '#1e88e5',
  },
  label: {
    marginRight: '10px',
    fontSize: '16px',
  },
  imageContainer: {
    textAlign: 'center',
    marginTop: '10px',
  },
  instructionImage: {
    maxWidth: '850px',
    borderRadius: '8px',
  },
};

export default Report;
