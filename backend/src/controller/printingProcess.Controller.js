const StudentService = require('../../database/StudentService')

class StudentController{
    // Printing Process
    async uploadFile(req, res){
        try {
            const studentID = req.query.uid
            console.log(studentID)
            const {dname, dsize, dformat, dpage_num, dupload_time} = req.body
            if (!dname || !dsize || !dformat || !dpage_num ) {
                return res.status(400).json({
                    status: 400,
                    msg: 'Fail uploading file',
                    data: null
                })
            }
            const response = await StudentService.uploadFile(studentID,req.body)
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
    
}

module.exports = new StudentController