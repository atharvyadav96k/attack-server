require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const sendMail = require('./services/mail.service')
const fpRouter = require('./routers/fingerPrint');
const egRouter = require('./routers/emergency');
const bpm = require('./routers/heartBPM');
const param = require('./routers/parameter');
const connectDb = require('./db/connectDb');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


// Routers
app.use('/fingerPrints', fpRouter);
app.use('/alerts', egRouter);
app.use('/bpm', bpm);
app.use('param', param);

app.get('/', (req, res)=>{
    res.send("Hello");
});

connectDb();
app.listen(4000);
