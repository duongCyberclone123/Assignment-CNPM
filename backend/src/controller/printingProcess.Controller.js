const StudentService = require('../../database/StudentService')
const PRICE_PER_PAGE = 500;
class StudentController{
    //Buy pages
    purchasePaper = async function(req, res) {
        try {
            const { sid, numbersOfPages, PMmethod } = req.body;
    
            // Kiểm tra dữ liệu đầu vào
            if (!sid || !numbersOfPages || !PMmethod) {
                return res.status(400).json({
                    status: 400,
                    msg: "Invalid student ID or page count",
                    data: null
                });
            }
            const pagesPurchased = numbersOfPages * 500;
    
            // Gọi dịch vụ
            const result = await StudentService.buyPaper(sid, pagesPurchased, PMmethod);
            res.status(result.status).json(result);
        } catch (err) {
            console.error("Error during paper purchase:", err);
            res.status(500).json({
                status: 500,
                msg: "Internal Server Error",
                data: null
            });
        }
    }

    // View History Log
    async ViewHistoryLog(req, res){
        try{
            const studentID = req.query.sid
            const {printerID, startTime, endTime} = req.body
            if (!studentID) return res.status(400).json({
                status: 400,
                msg: "Please Login",
                data: null
            })
            const log = await StudentService.listAllPrintingLog(studentID, req.body);
            return res.status(200).json({
                status: 200,
                msg: "View Log",
                data: log
            })
        }
        catch(err){
            return res.status(404).json({
                status: 404,
                msg: err,
                data: null
            })
        }
    }
    // Printing Process
    async uploadFile(req, res){
        try {
            const studentID = req.query.uid
            console.log(studentID)
            const {dname, dsize, dformat, dpage_num} = req.body
            if (!dname || !dsize || !dformat || !dpage_num ) {
                return res.status(400).json({
                    status: 400,
                    msg: 'Fail uploading file',
                    data: null
                })
            }
            const response = await StudentService.uploadFile(studentID,req.body)
            console.log(response)
            return res.status(200).json(response)
        }
        catch (err) {
            return res.status(404).json({
                status: 404,
                msg: err,
                data: null
            })
        }
    }

    async PrintersInLocation(req, res){
        try{
            console.log(req.body)
            const {place, building, room} = req.body
            const response = await StudentService.sortPrintersByLocation(place,building,room)
            console.log(response)
            return res.status(200).json(response)
        }
        catch(err){
            return res.status(404).json({
                status: 404,
                msg: err,
                data: null
            })
        }
    }

    async receivePrintingRequest(req,res){
        try{
            const response = await StudentService.receivePrintingRequest(req.body)
            return res.status(200).json(response)
        }
        catch(err){
            return res.status(404).json({
                status: 404,
                msg: err,
                data: null
            })
        }
    }

    async Printing(req,res){
        try{
            const printerID = req.query.pid
            if (!printerID) {
                return res.status(400).json({
                    status: 400,
                    msg: 'Printer ID is required',
                    data: null
                });
            }
            const result = await StudentService.resolveTransaction(printerID)
            return res.status(200).json({
                status: 200,
                msg: 'Transaction resolved successfully',
                data: result
            });
        }
        catch(err){
            return res.status(404).json({
                status: 404,
                msg: err,
                data: null
            })
        }
    }
}

module.exports = new StudentController