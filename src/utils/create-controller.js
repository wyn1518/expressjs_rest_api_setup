
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { validationResult } = require('express-validator');

module.exports = function(callback){

    return async function(req,res){
        const error = validationResult(req);
        
        if (!error.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json(error);
        }


        if(typeof callback !== 'function'){
            throw new Error("getData is not a function")
        }
        
        const result = await callback(req,res);


        if(!result.status){
            throw new Error("missing status code from the services")
        }

        if(result.data === null || typeof result.data == 'undefined'){
            return res.sendStatus(result.status);

        }
        
        if(typeof result.data === 'object'){
            return res.status(result.status).json(result.data);
        }
        
        
        return res.status(result.status).json({msg:result.data});
            
        
    }
    

}