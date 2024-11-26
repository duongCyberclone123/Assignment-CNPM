const authRoute = require('./auth.route');
const paymentRoute = require('./payment.route');
const printingRoute = require('./printingProcess')



function route(app) {
    app.use('/api/user', authRoute);
    app.use('/api/payment', paymentRoute);
    app.use('/api/printing',printingRoute);
}

module.exports = route;
