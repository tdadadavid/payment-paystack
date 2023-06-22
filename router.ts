//@ts-ignore
let express = require('express');
const control = require('./controller')

const r = express.Router();

r.get('/init', control.initializePayment);
//@ts-ignore
r.get('/payment/callback/paystack',async (req, res) => {
    console.log(req);
    res.send(200);
})

module.exports = r;
