require('dotenv').config()
const express = require('express');
const logger = require('pino-http');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('node:path');
const ejs = require('ejs');
const flash = require('connect-flash');

const passport = require('passport')
const {
    errorRoute,
    authRoute,
    homeRoute,
    adminRoute
} = require('./routes')

require('./_database').sequelize.sync({alter:true})

const app = module.exports = express();

// security configuration (helmet);
app.disable('x-powered-by');


// 
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'assets')));

app.use(logger({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: 'req,res',
        }
    },
    serializers:{
        req:(req) => ({
            id: req.id,
            method: req.method,
            url: req.url
          })
    },
    customLogLevel: function (req, res, err) {
        if (res.statusCode >= 400 && res.statusCode < 500) {
          return 'warn'
        } else if (res.statusCode >= 500 || err) {
          return 'error'
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
          return 'silent'
        }
        return 'info'
      }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret:process.env.SESSION_SECRET,
    saveUninitialized:false,
    resave:true,
    cookie:{
        maxAge:600000
    }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session())

app.use(function(req,res,next){
    req.log.info(`${req.method} ${req.path} ${req.statusCode} ${res['content-length']} - ${'hello world'} ms`);
    res.locals.isAuthenticated = req.isAuthenticated();
    if(res.locals.isAuthenticated){
        res.locals.user = req.user
    }

    next();
})
app.use(adminRoute);
app.use(authRoute);
app.use(homeRoute);
app.use(errorRoute);


app.use((err, req, res, next) => {
    switch(err.status){
        case 401:
            return res.render('401.html');
        case 404:
            return req.send('404');
        default :
            return res.status(500).send(`<pre>${err.stack}</pre>`)
    }
})