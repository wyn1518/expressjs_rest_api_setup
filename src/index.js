require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const path = require('node:path');
const ejs = require('ejs');
var flash = require('connect-flash');


const passport = require('passport')
const {sequelize} = require('./_database');

const app = module.exports = express();
sequelize.sync({alter:true,force:true})

// security configuration (helmet);
app.disable('x-powered-by');


// 
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret:process.env.SESSION_SECRET,
    saveUninitialized:false,
    resave:true,
    cookie:{
        maxAge:10000
    }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session())


// Resources
app.use( require('./locals'))

app.use(require('./user'));

app.use((err, req, res, next) => {
    if(err.status)
        return res.status(err.status).json(err.message.errors)
    return res.status(500).send(`<pre>${err.stack}</pre>`)
})