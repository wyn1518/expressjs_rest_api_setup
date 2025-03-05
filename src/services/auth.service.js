
const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const {User} = require('../db');
const  jwt = require('jsonwebtoken');

module.exports = {
    test : async function(){
        // console.log(await User.findOne({where:{email:"godwinAdalla@gmail.com"}}));
        await User.truncate();
    },

    signUp : async function({
            displayname,
            firstname,
            lastname,
            password,
            email,
            profile,
        }){

        const [user,created] = await User.findOrCreate({
            where: { email },
            defaults: {
                displayname,
                firstname,
                lastname,
                password,
                profile,
            },
        });

        if(created){
            return {
                status:StatusCodes.CREATED,
                data:user
            }
        }

        return {
            status:StatusCodes.CONFLICT,
            data:{
                error:[
                    {
                        "type": "field",
                        "value": user.email,
                        "msg": "email already exist",
                        "path": "email",
                        "location": "body"
                    }
                ]
            }
        } 
    },

    signOut : async function({email,password}){
        return null;
    },

    signIn: async function({email,password}){

        const user = await User.findOne({where:{email}});
        
        if(user.authenticate(password)){
            
            const accessToken = jwt.sign(
                {...user,password:null},
                process.env.ACCESS_TOKEN_SECRET,
                { 
                    expiresIn:'15s'
                }
            );

            return {
                status:StatusCodes.OK ,
                data:{
                    token:accessToken
                }
            };
        }  
        
        return {
            status:StatusCodes.UNAUTHORIZED,
        };
    
    },


    updateAccount : async function({
            id,
            displayname,
            firstname,
            lastname,
        }){
        // TODO functions

    }
};




