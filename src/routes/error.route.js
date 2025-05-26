const createHttpError = require('http-errors');
const router = module.exports = require('express').Router();

router.get('*',function(req,res,next){
    return next(createHttpError['404'])
});