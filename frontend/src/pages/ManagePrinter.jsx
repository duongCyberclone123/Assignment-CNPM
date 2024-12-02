import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getPrinters, addPrinter, updatePrinter, deletePrinter } from '../services/printerService';
import Navbar from '../components/Navbar';
const ManagePrinter = () => {
  const menuItems = ['Trang chủ', 'Quản lí máy in', 'Lịch sử in', 'Báo cáo sử dụng'];
  const routes = ['/spsodashboard', '/manageprinter', '/printhistory', '/purchase'];

  const [printers, setPrinters] = useState([]); // Lưu trữ danh sách máy in
  const [selectedPrinter, setSelectedPrinter] = useState(null); // Lưu trữ máy in đang được chọn
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [status, setStatus] = useState('');
  const [facility, setFacility] = useState('');
  const [building, setBuilding] = useState('');
  const [room, setRoom] = useState('');
  const [maintenanceDate, setMaintenanceDate] = useState('');
  const [provideColoring, setProvideColoring] = useState('');
  const [EID, setEID] = useState('');  // Thêm state cho EID
  // Hàm điều hướng cho các mục trong thanh điều hướng
  const handleNavigation = (path) => {
    navigate(path);
  };
  // Hàm lấy danh sách máy in
  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const result = await getPrinters();  // Gọi API để lấy danh sách máy in
        setPrinters(result.data || []);  // Cập nhật state printers với kết quả từ API
      } catch (error) {
        console.error('Error fetching printers:', error);
      }
    };
    fetchPrinters();  // Gọi hàm lấy danh sách máy in
  }, []);  // Chỉ gọi khi component mount lần đầu tiên

  // Hàm thêm máy in mới
  const handleAddPrinter = async () => {
    const printerData = {
      Pname: name,
      Pmodel: model,
      Pstatus: status,
      Pfacility: facility,
      Pbuilding: building,
      Proom: room,
      Pprovide_coloring: provideColoring,
      Plast_maintenance: maintenanceDate, // Đảm bảo ngày bảo trì cuối cùng được gửi đúng
      EID: EID  // Sử dụng giá trị EID người dùng nhập
    };

    try {
      const result = await addPrinter(printerData);  // Gọi API để thêm máy in
      alert('Máy in đã được thêm');
      setName('');
      setModel('');
      setStatus('');
      setFacility('');
      setBuilding('');
      setRoom('');
      setProvideColoring('');
      setEID('');  // Reset EID
      setPrinters((prevPrinters) => [...prevPrinters, result.data]);  // Cập nhật state với máy in mới
    } catch (error) {
      alert('Lỗi khi thêm máy in');
    }
  };

  // Hàm cập nhật máy in
  const handleEditPrinter = async () => {
    if (selectedPrinter && selectedPrinter.PID) {
      // Tạo dữ liệu máy in để gửi đi
      const printerData = {
        Pname: name,
        Pmodel: model,
        Pstatus: status,
        Pfacility: facility,
        Pbuilding: building,
        Proom: room,
        Plast_maintenance: maintenanceDate, // Đảm bảo ngày bảo trì cuối cùng có định dạng "yyyy-mm-dd"
        Pprovide_coloring: provideColoring,
        EID: EID  // Cập nhật giá trị EID khi sửa máy in
      };

      try {
        // Gọi API để cập nhật máy in
        const result = await updatePrinter(selectedPrinter.PID, printerData);

        // Thông báo khi cập nhật thành công
        alert('Máy in đã được cập nhật');

        // Cập nhật lại danh sách máy in sau khi cập nhật
        setPrinters((prevPrinters) =>
          prevPrinters.map((printer) =>
            printer.PID === selectedPrinter.PID ? { ...printer, ...printerData } : printer
          )
        );

        // Đặt lại selectedPrinter để chuẩn bị cho việc thêm máy in mới
        setSelectedPrinter(null);

        // Reset các trường nhập liệu
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
        // Thông báo lỗi khi không thể cập nhật máy in
        alert('Lỗi khi cập nhật máy in');
      }
    } else {
      alert('Vui lòng chọn máy in để cập nhật.');
    }
  };


  // Hàm xóa máy in
  const handleDelete = async (pid) => {
    if (!pid || isNaN(pid)) {
      alert('Lỗi: PID không hợp lệ.');
      return;
    }

    try {
      await deletePrinter(pid);  // Gọi API để xóa máy in
      alert('Máy in đã được xóa');
      setPrinters((prevPrinters) => prevPrinters.filter((printer) => printer.PID !== pid));  // Cập nhật lại danh sách máy in
    } catch (error) {
      alert('Lỗi khi xóa máy in');
    }
  };


  return (<>
  <Navbar
        title="SPSO"
        menuItems={menuItems}
        routes={routes}
        active={"Quản lí máy in"}
      />
    <Container sx={{ padding: '20px' }}>
      
      <Box sx={{ marginTop: '80px' }}></Box>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#3f51b5' }}>
        Quản lý máy in
      </Typography>

      {/* Form thêm hoặc sửa máy in */}
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
          onChange={(e) => setMaintenanceDate(e.target.value)}  // Đảm bảo giá trị là kiểu "yyyy-mm-dd"
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

      {/* Danh sách máy in */}
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
                secondary={`Vị trí: ${printer.Pfacility}, ${printer.Pbuilding}, PID: ${printer.PID}`} // Hiển thị PID
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
                    setMaintenanceDate(printer.Plast_maintenance.split('T')[0]); // Đảm bảo đúng định dạng yyyy-mm-dd
                    setProvideColoring(printer.Pprovide_coloring);
                    setEID(printer.EID); // Cập nhật giá trị EID khi sửa
                  }}
                >
                  Sửa
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(printer.PID)}  // Truyền PID chính xác để xóa
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
    </>
  );
};

export default ManagePrinter;
