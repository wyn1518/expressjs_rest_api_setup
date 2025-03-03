require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const config = require('./config');

const app = module.exports = express();

app.disable('x-powered-by')
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("hello world"));

// app.use(session({
//     secret: config.session.secret,
//     resave: false,
//     saveUninitialized: false,
//     cookie:{
//         maxAge:60000 * 60 * 24
//     }
// }));


app.use('/', require('./api/user'));


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendStatus(500)
})