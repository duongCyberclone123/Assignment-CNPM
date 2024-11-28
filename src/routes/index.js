const authRoute = require('./auth.route');
const paymentRoute = require('./payment.route');
const printingRoute = require('./printingProcess')
const buyPageRoute = require('./buyPaper.route')


function route(app) {
    app.use('/api/user', authRoute);
    app.use('/api/payment', paymentRoute);
    app.use('/api/printing',printingRoute);

    app.use('/api/student', buyPageRoute);
}

module.exports = route;
