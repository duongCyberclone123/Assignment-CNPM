const authRoute = require('./auth.route');
const paymentRoute = require('./payment.route');
const printingRoute = require('./printingProcess');
const printerManage = require('./printerManage.route');
const payment = require('./payment.route')


function route(app) {
    app.use('/api/user', authRoute);
    app.use('/api/payment', paymentRoute);
    app.use('/api/printing',printingRoute);
    app.use('/api/printers', printerManage);
    app.use('/api/payment',payment);
}

module.exports = route;
