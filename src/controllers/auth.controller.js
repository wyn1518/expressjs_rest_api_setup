const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const AuthService = require('../services/auth.service');
const UserService = require('../services/user.service');
const createController = require('../utils/create-controller');

module.exports = {
    
    test : createController(async ()=> await UserService.getAllUsers()),

    signIn : createController(async function(req,res){

        const result = await AuthService.signIn(req.body);
        
            
        res.cookie('token', result.data.token , { 
            httpOnly: true,  // Prevent client-side access via JavaScript
            secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
                // maxAge: 60000 * 24 // 24hrs
        });
   

        return result;
        
    }),

    signUp : createController(async (req) => await AuthService.signUp(req.body))


}