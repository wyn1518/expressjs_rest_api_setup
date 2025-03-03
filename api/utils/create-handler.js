
const { StatusCodes, ReasonPhrases } = require('http-status-codes')


module.exports = function(service,getData){
    return async function(req,res){
        try{

            if(typeof getData !== 'function'){
                throw new Error("getData is not a function")
            }
            
            const result =  await service(getData ? getData(req) : undefined);

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
            
        }catch(error){
            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        
        }
    }
    

}