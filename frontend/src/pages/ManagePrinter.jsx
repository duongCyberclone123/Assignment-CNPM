import React, { useState, useEffect } from 'react';
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Grid,TextField, Button, Box, Container, Typography, List, ListItem, ListItemText,CircularProgress } from '@mui/material';
import { getPrinters, addPrinter, updatePrinter, deletePrinter, getAllowedFileTypes, updateAllowedFileTypes } from '../services/printerService';
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';

const ManagePrinter = () => {
  const menuItems = ['Trang chủ', 'Quản lí máy in', 'Quản lí lịch sử in', 'Báo cáo'];
  const routes = ['/spsodashboard', '/manageprinter', '/spsohistory', '/report'];
  const navigate = useNavigate();
  const [allowedFileTypes, setAllowedFileTypes] = useState([]);
  const [printers, setPrinters] = useState([]); 
  const [selectedPrinter, setSelectedPrinter] = useState(null); 
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [status, setStatus] = useState('');
  const [facility, setFacility] = useState('');
  const [building, setBuilding] = useState('');
  const [room, setRoom] = useState('');
  const [maintenanceDate, setMaintenanceDate] = useState('');
  const [provideColoring, setProvideColoring] = useState('');
  const [EID, setEID] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const result = await getPrinters();
        setPrinters(result.data || []);
      } catch (error) {
        console.error('Error fetching printers:', error);
      }
    };
    
    const fetchAllowedFileTypes = async () => {
      try {
        setLoading(true);
        const response = await getAllowedFileTypes();  
    
        // Kiểm tra và tách config_value thành mảng nếu có giá trị
        if (response.data && response.data.length > 0) {
          const fileTypes = response.data[0].config_value.split(',').map(item => item.trim());
          setAllowedFileTypes(fileTypes);
        } else {
          setAllowedFileTypes([]); // Nếu không có dữ liệu, trả về mảng rỗng
        }
      } catch (error) {
        console.error('Lỗi khi tải các loại file cho phép', error);
        setAllowedFileTypes([]); // Nếu có lỗi, cũng trả về mảng rỗng
      } finally {
        setLoading(false);
      }
    };
    fetchPrinters();
    fetchAllowedFileTypes();
  }, []);

  const handleAddPrinter = async () => {
    const printerData = { 
      Pname: name, 
      Pmodel: model, 
      Pstatus: status, 
      Pfacility: facility, 
      Pbuilding: building, 
      Proom: room, 
      Pprovide_coloring: provideColoring, 
      Plast_maintenance: maintenanceDate,
      EID: EID  
    };
  
    try {
      const result = await addPrinter(printerData);
      alert('Máy in đã được thêm');
      setName('');
      setModel('');
      setStatus('');
      setFacility('');
      setBuilding('');
      setRoom('');
      setProvideColoring('');
      setEID('');
      setPrinters((prevPrinters) => [...prevPrinters, result.data]);
    } catch (error) {
      alert('Lỗi khi thêm máy in');
    }
  };

  const handleSaveAllowedFileTypes = async () => {
    try {
      setLoading(true);
      await updateAllowedFileTypes(allowedFileTypes);  // Cập nhật các loại file
      alert('Các loại file đã được cập nhật');
    } catch (error) {
      alert('Lỗi khi cập nhật các loại file');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPrinter = async () => {
    if (selectedPrinter && selectedPrinter.PID) {
      const printerData = { 
        Pname: name, 
        Pmodel: model, 
        Pstatus: status, 
        Pfacility: facility, 
        Pbuilding: building, 
        Proom: room, 
        Plast_maintenance: maintenanceDate,
        Pprovide_coloring: provideColoring, 
        EID: EID  
      };
  
      try {
        const result = await updatePrinter(selectedPrinter.PID, printerData);  
        alert('Máy in đã được cập nhật');
        setPrinters((prevPrinters) =>
          prevPrinters.map((printer) =>
            printer.PID === selectedPrinter.PID ? { ...printer, ...printerData } : printer
          )
        );
        setSelectedPrinter(null);
        setName('');
        setModel('');
        setStatus('');
        setFacility('');
        setBuilding('');
        setRoom('');
        setMaintenanceDate('');
        setProvideColoring('');
        setEID('');
      } catch (error) {
        alert('Lỗi khi cập nhật máy in');
      }
    } else {
      alert('Vui lòng chọn máy in để cập nhật.');
    }
  };

  const handleDelete = async (pid) => {
    if (!pid || isNaN(pid)) {
      alert('Lỗi: PID không hợp lệ.');
      return;
    }
  
    try {
      await deletePrinter(pid);
      alert('Máy in đã được xóa');
      setPrinters((prevPrinters) => prevPrinters.filter((printer) => printer.PID !== pid));
    } catch (error) {
      alert('Lỗi khi xóa máy in');
    }
  };

  return (
    <Container
    sx={{
      backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8bjDr2_k6Lkdu1_RZuWAzNWt-MziZxXCU6A&s)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh', 
    }}
  >
      <Navbar
                title="SPSO"
                menuItems={menuItems}
                routes={routes}
                active={"Quản lí máy in"}
            />
      <Box sx={{ marginTop: '80px' }}></Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          color: '#3f51b5',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        Quản lý cấu hình hệ thống
      </Typography>
  
      <Grid container spacing={2} sx={{ marginTop: 4 }}>
      <Grid item xs={12} md={4}>
  <Typography
    variant="h5"
    gutterBottom
    sx={{
      color: '#3f51b5',
      fontFamily: 'Arial, sans-serif',
    }}
  >
    Các loại file hiện tại:
  </Typography>

  {/* Hiển thị các loại file dưới dạng bảng */}
  {loading ? (
    <CircularProgress />
  ) : allowedFileTypes.length > 0 ? (
    <Table sx={{ minWidth: 650 }} aria-label="Các loại file hiện tại">
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}>STT</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Loại File</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {allowedFileTypes.map((fileType, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{fileType.trim()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <Typography variant="body1">Chưa có loại file nào được phép.</Typography>
  )}
</Grid>


      {/* Cột giữa - Cập nhật các loại file */}
      <Grid item xs={12} md={4}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: '#3f51b5',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Cập nhật các loại file được phép
        </Typography>

        {/* Trường nhập liệu để sửa các loại file */}
        <TextField
          label="Các loại file được phép (cách nhau bằng dấu phẩy)"
          variant="outlined"
          value={allowedFileTypes.join(', ')} // Hiển thị danh sách các loại file dưới dạng chuỗi
          onChange={(e) =>
            setAllowedFileTypes(
              e.target.value.split(',').map((file) => file.trim())
            ) // Cập nhật lại state khi người dùng thay đổi
          }
          fullWidth
          sx={{ marginBottom: '16px', fontFamily: 'Arial, sans-serif' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveAllowedFileTypes}
          disabled={loading}
          sx={{ marginTop: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Lưu các loại file'}
        </Button>
      </Grid>

      {/* Cột bên phải - Ảnh */}
      <Grid item xs={14} md={4} sx={{ display: 'flex', justifyContent: 'right' , paddingRight: '1px' }}>
        <Box
          component="img"
          src="https://cdn.tgdd.vn/Files/2019/01/05/1142789/huong-dan-su-dung-may-in-khi-moi-mua-ve-12.jpg"
          alt="Printer Guide"
          sx={{
            maxWidth: '80%',
            height: 'auto',
            borderRadius: '5px',
          }}
        />
      </Grid>
    </Grid>
  
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#3f51b5' }}>
        Quản lý máy in
      </Typography>
  
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
        <TextField
          label="Tên máy in"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Mô hình máy in"
          variant="outlined"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          fullWidth
        />
        <TextField
          label="Trạng thái"
          variant="outlined"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
        />
        <TextField
          label="Vị trí"
          variant="outlined"
          value={facility}
          onChange={(e) => setFacility(e.target.value)}
          fullWidth
        />
        <TextField
          label="Tòa nhà"
          variant="outlined"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
          fullWidth
        />
        <TextField
          label="Phòng"
          variant="outlined"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          fullWidth
        />
        <TextField
          label="Ngày bảo trì cuối cùng"
          type="date"
          variant="outlined"
          value={maintenanceDate}
          onChange={(e) => setMaintenanceDate(e.target.value)}
          fullWidth
        />
        <TextField
          label="Cung cấp màu"
          variant="outlined"
          value={provideColoring}
          onChange={(e) => setProvideColoring(e.target.value)}
          fullWidth
        />
        <TextField
          label="Mã người dùng (EID)"
          variant="outlined"
          value={EID}
          onChange={(e) => setEID(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={selectedPrinter ? handleEditPrinter : handleAddPrinter}>
          {selectedPrinter ? 'Cập nhật máy in' : 'Thêm máy in'}
        </Button>
      </Box>
  
      <Typography variant="h5" gutterBottom sx={{ marginTop: 4, color: '#3f51b5' }}>
        Danh sách máy in
      </Typography>
      <List sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '10px' }}>
        {printers.length === 0 ? (
          <Typography variant="body1">Không có máy in nào</Typography>
        ) : (
          printers.map((printer) => (
            <ListItem
              key={printer.PID}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px',
                backgroundColor: '#fff',
                marginBottom: '10px',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <ListItemText
                primary={printer.Pname}
                secondary={`Vị trí: ${printer.Pfacility}, ${printer.Pbuilding}, PID: ${printer.PID}`}
              />
              <Box>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setSelectedPrinter(printer);
                    setName(printer.Pname);
                    setModel(printer.Pmodel);
                    setStatus(printer.Pstatus);
                    setFacility(printer.Pfacility);
                    setBuilding(printer.Pbuilding);
                    setRoom(printer.Proom);
                    setMaintenanceDate(printer.Plast_maintenance.split('T')[0]);
                    setProvideColoring(printer.Pprovide_coloring);
                    setEID(printer.EID);
                  }}
                >
                  Sửa
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(printer.PID)}
                  sx={{ marginLeft: 2 }}
                >
                  Xóa
                </Button>
              </Box>
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
};
export default ManagePrinter;
