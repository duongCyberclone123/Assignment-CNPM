const client = require('../../database/database')


const PRICE_PER_PAGE = 500;


const buyPaper = async function(sid, pagesPurchased, PMmethod)  {
    try {
        // 1. Insert giao dịch thanh toán vào bảng PAYMENT
        const paymentQuery = `
            INSERT INTO PAYMENT (PMtime, PMpages_purchased, PMmethod, SID)
            VALUES (NOW(), ?, ?, ?)
        `;
        await client.query(paymentQuery, [pagesPurchased, PMmethod, sid]);

        // 2. Cập nhật số lượng trang trong bảng STUDENT
        const updateStudentQuery = `
            UPDATE STUDENT
            SET Savailable_pages = Savailable_pages + ?
            WHERE ID = ?
        `;
        const numbersOfPages = pagesPurchased / PRICE_PER_PAGE;
        await client.query(updateStudentQuery, [numbersOfPages, sid]);

        const studentQuery = `
            SELECT * FROM STUDENT
            WHERE ID = ?
        `
        const student = await client.query(studentQuery, [sid]);
        console.log(student);

        // 3. Hoàn thành
        return {
            status: 200,
            msg: "Paper purchased successfully",
            data: {
                student: student[0],
                numbersOfPages : numbersOfPages,
                pagesPurchased: pagesPurchased,
                PMmethod: PMmethod,
            }
        };
    } catch (err) {
        console.error("Error during paper purchase:", err);
        return {
            status: 500,
            msg: "Internal Server Error",
            data: null
        };
    }
}



const purchasePaper = async function(req, res) {
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
        const pagesPurchased = numbersOfPages * PRICE_PER_PAGE;

        // Gọi dịch vụ
        const result = await buyPaper(sid, pagesPurchased, PMmethod);
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


module.exports = {
    purchasePaper,
    buyPaper
}