const PrinterService = require('../services/printerManage.Service');

class PrinterController {
    async getPrinter(req, res) {
        try {
            const pid = req.params.pid ? parseInt(req.params.pid, 10) : null;

            if (pid && isNaN(pid)) {
                return res.status(400).json({ status: 400, msg: 'Invalid PID' });
            }

            // Nếu có PID -> lấy thông tin máy in cụ thể, nếu không -> lấy danh sách máy in
            const result = pid
                ? await PrinterService.getPrinterById(pid)
                : await PrinterService.getAllPrinters();

            if (result.length === 0) {
                return res.status(404).json({ status: 404, msg: 'No printers found' });
            }

            res.status(200).json({ status: 200, data: result });
        } catch (error) {
            console.error('Error fetching printer(s):', error);
            res.status(500).json({ status: 500, msg: 'An error occurred', error: error.message });
        }
    }

    async addPrinter(req, res) {
        try {
            const printerData = req.body; // Dữ liệu từ request body

            const result = await PrinterService.createPrinter(printerData);

            res.status(200).json({
                status: 200,
                msg: 'Printer added successfully',
                data: result,
            });
        } catch (err) {
            res.status(err.status || 500).json({
                status: err.status || 500,
                msg: err.message || 'An error occurred',
                data: err.data || null,
            });
        }
    }

    async updatePrinter(req, res) {
        try {
            const pid = req.params.pid; // Lấy PID từ URL
            const printerData = req.body; // Dữ liệu sửa từ request body

            // Gọi service để cập nhật thông tin máy in
            const result = await PrinterService.updatePrinter(pid, printerData);

            // Trả về kết quả thành công
            res.status(200).json({
                status: 200,
                msg: 'Printer updated successfully',
                data: result,
            });
        } catch (err) {
            res.status(err.status || 500).json({
                status: err.status || 500,
                msg: err.message || 'An error occurred',
                data: err.data || null,
            });
        }
    }

    async deletePrinter(req, res) {
        const { pid } = req.params;  // Lấy PID từ tham số URL
    
        try {
            // Gọi phương thức xóa máy in từ service
            const result = await PrinterService.deletePrinter(pid);
            
            // Trả về kết quả thành công
            res.status(200).json({
                status: 200,
                message: 'Printer deleted successfully',
                data: result
            });
        } catch (error) {
            // Nếu có lỗi, trả về thông báo lỗi
            res.status(error.status || 500).json({
                status: error.status || 500,
                message: error.message || 'An error occurred while deleting the printer',
            });
        }
    };
}

module.exports = new PrinterController();
