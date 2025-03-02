const {validationResult } = require('express-validator');
const {StatusCodes,ReasonPhrases} = require('http-status-codes')

module.exports = {
    getValidationResult:function(req,res,next){

        const result = validationResult(req);
        
        if (!result.isEmpty()) {
            result.msg = ReasonPhrases.BAD_REQUEST;
            return res.status(StatusCodes.BAD_REQUEST).json(result);
        }
        
        next();
    
    }
}