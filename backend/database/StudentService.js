const client = require('./database');

class StudentService{
    constructor(){}
    async listPrintingLogByPrinter(studentID, printerID){
        return new Promise((resolve, reject) => {
            client.query(
                `SELECT * FROM transaction`, 
                [studentID, printerID],
                (err, res) => {
                    if (err) {
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        });
                    } else {
                        resolve({
                            status: 200,
                            msg: 'Fetch success',
                            data: res
                        });
                    }
                }
            );
        });
    }
    
    async listPrintingLogByTime(studentID, startTime, endTime){
        return new Promise((resolve, reject) => {
            client.query(
                `SELECT * FROM transaction`, 
                [studentID, startTime, endTime],
                (err, res) => {
                    if (err) {
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        });
                    } else {
                        resolve({
                            status: 200,
                            msg: 'Fetch success',
                            data: res
                        });
                    }
                }
            );
        });
    }

    async listAllPrintingLog(studentID){
        return new Promise((resolve, reject) => {
            client.query(
                `SELECT * FROM transaction`, 
                [studentID, startTime, endTime],
                (err, res) => {
                    if (err) {
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        });
                    } else {
                        resolve({
                            status: 200,
                            msg: 'Fetch success',
                            data: res
                        });
                    }
                }
            );
        });
    }
}