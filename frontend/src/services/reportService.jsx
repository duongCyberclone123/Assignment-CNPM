import axios from 'axios';

// Hàm GET để lấy báo cáo tổng hợp theo năm và tháng
export const getOverallReport = async (year, month) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/report/overal?year=${year}&month=${month}`);
    return response.data;  
  } catch (error) {
    console.error('Error fetching overall report:', error.response ? error.response.data : error.message);
    throw error;  // Ném lỗi lên để xử lý ngoài
  }
};

// Hàm GET để lấy báo cáo chi tiết theo năm và tháng
export const getDetailReport = async (year, month) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/report/detail?year=${year}&month=${month}`);
    return response.data;  
  } catch (error) {
    console.error('Error fetching detail report:', error.response ? error.response.data : error.message);
    throw error;  // Ném lỗi lên để xử lý ngoài
  }
};
