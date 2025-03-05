const  jwt = require('jsonwebtoken');
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

module.exports = {
    verifyToken:function(req,res,next){
        const token = req.cookies.token;
        let isTokenValid = true;
        if (token === null) {
            isTokenValid = false;
        }else{
            
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    isTokenValid = false;
                }
                // return res.status(StatusCodes.OK).json({msg:ReasonPhrases.OK,user:decoded});
            });
        }

        if(!isTokenValid) return res.status(StatusCodes.UNAUTHORIZED).json({msg:ReasonPhrases.UNAUTHORIZED});


        next();
    },
    signUp: checkSchema({
        email:{
            trim:true,
            isEmail:{
                errorMessage:'Invalid email.',
                options:{
                    host_whitelist:['gmail.com']
                }
            }
        },
        displayname:{
            trim:true,
            notEmpty:{
                errorMessage:'displayname is required',
                options:{
                    ignore_whitespace:true
                }
            }
        },
        firstname:{
            trim:true,
            notEmpty:{
                errorMessage:'firstname is required',
                options:{
                    ignore_whitespace:true
                }
            }
        },
        lastname:{  
            trim:true,
            notEmpty:{
                errorMessage:'last name is required',
                options:{
                    ignore_whitespace:true
                }
            }
        },
        password:{
            isStrongPassword:{
                errorMessage:'Password must be at least 8 characters long and contain a mix of letters, numbers, and special characters.'
            }
        },
        repeatPassword:{
            custom:{
                errorMessage:'repeat password don\'t match',
                options:(value, { req }) => {
                    return value === req.body.password;
                }
            }
        }
    },['body']),



    signIn:checkSchema({
        email:{
            isEmail:{
                errorMessage:'Invalid email.',
                options:{
                    host_whitelist:['gmail.com']
                }
            }
        }
    },['body']),

};