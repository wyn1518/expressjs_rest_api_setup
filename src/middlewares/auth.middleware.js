
const {StatusCodes} = require('http-status-codes')

module.exports = {
    isAuthenticated:function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.status(StatusCodes.UNAUTHORIZED).render('401.html');
         
    },
    isNotAuthenticated:function(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/');
         
    },

};