const SystemService = require('../services/systemManage.Service');

class SystemController {
    async getParameter(req, res) {
        try {
            const config_key = req.query.config_key;

            if (config_key != 'allowed_file_types' && config_key != 'free_print_limit' && config_key != 'reset_interval' &&  config_key != null) {
                return res.status(400).json({ status: 400, msg: 'Invalid config_key' });
            }

            // Nếu có config_key -> lấy thông tin của thông số hệ thống cụ thể, nếu không -> lấy tất cả thông số
            const result = config_key
                ? await SystemService.getParameterByConfig_key(config_key)
                : await SystemService.getAllParameters();

            if (result.length === 0) {
                return res.status(404).json({ status: 404, msg: 'No parameters found' });
            }

            res.status(200).json({ status: 200, data: result });
        } catch (error) {
            console.error('Error fetching printer(s):', error);
            res.status(500).json({ status: 500, msg: 'An error occurred', error: error.message });
        }
    }

    async updateParameter(req, res) {
        try {
            const config_key = req.query.config_key; // Lấy config_key từ URL
            const systemData = req.body; // Dữ liệu sửa từ request body

            // Gọi service để cập nhật thông tin hệ thống
            const result = await SystemService.updateParameter(config_key, systemData);

            // Trả về kết quả thành công
            res.status(200).json({
                status: 200,
                msg: 'system parameters updated successfully',
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
}

module.exports = new SystemController();
