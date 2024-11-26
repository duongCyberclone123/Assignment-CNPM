//const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserService = require('../../database/userService');

class AuthController {
    async postSignUp(req, res) {
        // console.log('CHECK authData: ', req.body)
        //const userId = uuidv4();
        const { email, password, confirmPassword } = req.body;
        let username = req.body.username;
        if (!username) {
            username = email.split('@')[0];
        }

        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                status: 400,
                msg: "The input is required"
            })
        }
        else if (!isCheckEmail) {
            return res.status(400).json({
                status: 400,
                msg: "The Email is not correct"
            })
        }
        else if (password !== confirmPassword) {
            return res.status(400).json({
                status: 400,
                msg: "The confirmPassword is not correct"
            })
        }

        const checkUser = await UserService.findByEmail(email)
        if (checkUser.data !== null) {
            return res.status(409).json({
                status: 409,
                msg: "The email is already used"
            });
        }
        try {
            const hashPw = await bcrypt.hash(password, 12);
            let result;
            if (req.body.userType === 'SPSO') {
                result = await UserService.createAdmin(username, hashPw, req.body);
            } else {
                result = await UserService.createCustomer(username, hashPw, req.body);
            }
            return res.status(200).json(result);
        } catch (err) {
            if (!err.status) {
                res.status(500).json({
                    status: 500,
                    msg: err.message,
                    data: null
                });
            } else {
                res.status(err.status).json({
                    status: err.status,
                    msg: err.msg,
                    data: err.data
                });
            }
        }
    }


    //thiếu kiểm soát phiên đăng nhập khi một tk đăng nhập, có thể đăng nhập tk đó ở mấy khác nên phải kiểm soát bằng cách thêm token vào db hoặc tìm hiểu về redis
    async postLogin(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;
    
            // Kiểm tra email và password
            if (!email || !password) {
                return res.status(400).json({
                    status: 400,
                    msg: 'Email and password are required',
                    data: null,
                });
            }
    
            console.log('Email: ', email);
    
            // Tìm kiếm user theo email
            const result = await UserService.findByEmail(email);
    
            if (result.status !== 200) {
                const error = new Error('Wrong email');
                error.statusCode = 401;
                error.msg = result.msg;
                throw error;
            }
    
            const loadedUser = result.data[0];
            console.log('Check user: ', loadedUser);
            console.log(password + " - " + loadedUser.password)
            // So sánh mật khẩu
            //const isEqual = await bcrypt.compare(password, loadedUser.password);
            if (password != loadedUser.password) {
                const error = new Error('Wrong password');
                error.statusCode = 401;
                error.msg = 'Wrong password';
                throw error;
            }
    
            // Tạo JWT token
            const token = jwt.sign(
                {
                    userId: loadedUser.uid,
                    userType: loadedUser.usertype,
                    email: loadedUser.email,
                },
                process.env.SECRET_TOKEN,
                { expiresIn: '1h' }
            );
    
            // Lưu token vào cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Chỉ bật secure trên môi trường production
                maxAge: 3600000, // 1 giờ
            });
    
            // Trả về kết quả
            res.status(200).json({
                status: 200,
                msg: 'Authentication successful',
                data: { token },
            });
        } catch (err) {
            // Bắt và xử lý lỗi
            console.error('Error during login: ', err.message);
    
            res.status(err.statusCode || 500).json({
                status: err.statusCode || 500,
                msg: err.msg || 'An error occurred',
                data: err.data || null,
            });
        }
    }
    
    async logout(req, res) {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                status: 401,
                msg: 'No active session found',
                data: null
            });
        }
        res.clearCookie('token'); // Xóa cookie chứa token
        return res.status(200).json({
            status: 200,
            msg: 'Logged out successfully',
            data: null
        });
    }
}

module.exports = new AuthController;