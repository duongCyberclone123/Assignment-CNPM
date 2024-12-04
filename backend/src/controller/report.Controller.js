const ReportService = require('../services/report.Service.js');

class ReportController {
    async getOveralReport(req, res) {
        try {
            const { year, month } = req.query;
            const report = !month 
                ? await ReportService.getOveralYearlyReport(year)
                : await ReportService.getOveralMonthlyReport(month, year);
            res.status(200).json({
                status: 'success',
                data: report
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async getDetailReport(req, res) {
        try {
            const { year, month } = req.query;
            const report = !month 
                ? await ReportService.getDetailYearlyReport(year)
                : await ReportService.getDetailMonthlyReport(month, year);
            res.status(200).json({
                status: 'success',
                data: report
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = new ReportController();
