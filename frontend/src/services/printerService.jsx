import axios from 'axios';

const API_URL = 'http://localhost:8000/api/printers'; // Đảm bảo URL chính xác cho API của bạn

// Hàm lấy danh sách máy in
export const getPrinters = async () => {
  try {
    const response = await axios.get(API_URL); // Gọi API lấy tất cả máy in
    return response.data;  // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Error fetching printers:', error);
    throw error;  // Ném lỗi lên để frontend có thể xử lý
  }
};

// Hàm thêm máy in mới
export const addPrinter = async (printerData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, printerData); // Gửi POST request để thêm máy in
    return response.data;  // Trả về kết quả thêm máy in
  } catch (error) {
    console.error('Error adding printer:', error);
    throw error;  // Ném lỗi lên
  }
};

// Hàm cập nhật thông tin máy in
export const updatePrinter = async (pid, printerData) => {
  try {
    const response = await axios.put(`${API_URL}/update/${pid}`, printerData); // Gửi PUT request để cập nhật
    return response.data;  // Trả về kết quả cập nhật
  } catch (error) {
    console.error('Error updating printer:', error);
    throw error;  // Ném lỗi lên
  }
};

// Hàm xóa máy in
export const deletePrinter = async (pid) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${pid}`); // Gửi DELETE request để xóa máy in
    return response.data;  // Trả về kết quả xóa
  } catch (error) {
    console.error('Error deleting printer:', error);
    throw error;  // Ném lỗi lên
  }
};
