const adminRoute = require('./admin.route');
const authRoute = require('./auth.route');
const errorRoute = require('./error.route');
const homeRoute = require('./home.route');


module.exports = {
    errorRoute,
    authRoute,
    homeRoute,
    adminRoute
}