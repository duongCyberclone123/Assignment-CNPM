const authRoute = require('./auth.route');
const paymentRoute = require('./payment.route');




function route(app) {
    app.use('/api/user', authRoute);
    app.use('/api/payment', paymentRoute);
}

module.exports = route;
