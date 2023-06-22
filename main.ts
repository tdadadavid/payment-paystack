const express = require('express');
const { config } = require('dotenv');


const router = require('./router');

config();


const app = express();

app.use(express.json());

app.use(router)






app.listen(8000, () => {
    console.log("Listening on port 8000...");
})