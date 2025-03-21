const { checkSchema } = require('express-validator');

module.exports = {
    ifSignin:function(req,res,next){
        if(req.isAuthenticated()){
           return next();
        }
        return res.redirect('/signin');
    },
    ifNotSignin:function(req,res,next){
        if(!req.isAuthenticated()){
            console.log("NOT SIGNIN");
            return next();
        }
        return res.redirect('/admin');
    },
};