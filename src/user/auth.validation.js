
const { checkSchema} = require('express-validator');
const { User } = require('../_database');
const { ReasonPhrases } = require('http-status-codes')


const host_whitelist = ['gmail.com'];
module.exports = {
    signUp: checkSchema({
        email:{
            trim:true,
            normalizeEmail:true,
            isEmail:{
                errorMessage:'Invalid email format',
                options:{
                    host_whitelist:host_whitelist
                }
            },
        
            custom:{
                errorMessage:'Someone\'s already using email',
                options:async (value)=>{

                    const isExist = await User.findOne({where:{email:value}});
                    
                    if(isExist) return Promise.reject();
                    return Promise.resolve();
                }
            }
        },
        displayname:{
            trim:true, 
            isAlphanumeric:{
                errorMessage:"Should only contain letters, numbers with underscore is optional.",
                options:['en-US',{
                    ignore:'_'
                }]
            },
            
        },
        firstname:{
            toLowerCase:true,
            trim:true,
            customSanitizer:{
                options:(value)=>{
                    return value.replace(/\s\s+/g, ' ')
                }
            },
            isAlpha:{
                errorMessage:"Should only contain letters with optional single space between names",
                options:['en-US',{ ignore:' ' }]
            },
        },
        lastname:{  
            toLowerCase:true,
            trim:true,
            customSanitizer:{
                options:(value)=>{
                    return value.replace(/\s\s+/g, ' ')
                }
            },
            isAlpha:{
                errorMessage:"Should only contain letters with optional single space between names",
                options:['en-US',{
                    ignore:' '
                }]
            },
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


    signIn: checkSchema({
        email:{
            default:'',
            trim:true,
            isEmail:{
                errorMessage:'Invalid email format',
                options:{
                    host_whitelist:host_whitelist
                }
            },
        },
        password:{
            default:'',
            isLength:{
                errorMessage:'Password is required',
                options:{
                    min:1
                }
            }
            
        }
    },['body']),

};