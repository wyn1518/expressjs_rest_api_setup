
const User = require('./user.model');
const { StatusCodes, ReasonPhrases } = require('http-status-codes')



module.exports = {
    async getAllUsers(){
        const users = await User.findAll();
    
        if (users === undefined || users.length == 0) {
            return {
                status:StatusCodes.NOT_FOUND,
            }   
        }     
    
        return {
            status:StatusCodes.OK,
            data:users
        }
    },  
}