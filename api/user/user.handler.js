const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const AuthService = require('./auth.service');
const UserService = require('./user.service');
const createHandler = require('../utils/create-handler');

module.exports = {
    
    test : createHandler(UserService.getAllUsers),

    signIn : async function(req,res){

        const token = await AuthService.signIn(req.body);
        
        if(token){
            
            res.cookie('token', token, { 
                httpOnly: true,  // Prevent client-side access via JavaScript
                secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
                // maxAge: 60000 * 24 // 24hrs
            });

            return res.status(StatusCodes.OK).json({token});
        
        }   

        return res.sendStatus(StatusCodes.UNAUTHORIZED);
        
    },

    signUp : async function(req,res){

        const [user,created] = await AuthService.signUp(req.body);

        if(created) res.sendStatus(StatusCodes.CREATED);
        else {
        
            res.status(StatusCodes.CONFLICT).json({
                msg:ReasonPhrases.CREATED,
                error:[
                    {
                        "type": "field",
                        "value": user.email,
                        "msg": "email already exist",
                        "path": "email",
                        "location": "body"
                    }
                ]
            });
        }
        
    }

}