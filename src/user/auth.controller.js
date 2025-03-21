const passport = require('passport');
const {Strategy} = require('passport-local');
const { User } = require('../_database');
const asyncHandler = require('express-async-handler');
const {validationResult } = require('express-validator');
const {StatusCodes,ReasonPhrases} = require('http-status-codes')

passport.use(new Strategy({
        usernameField:'email'
    },
    async function verify(email, password, cb) {
        try{
            const user = await User.findOne({where:{email}});    
    
            if(user && user.authenticate(password)) {
                return cb(null,user);
            }

            cb(null,null);
        }catch(err){
            cb(err,null);
        }
    }
));

passport.serializeUser(async function serializeUser(user, cb) {
    return cb(null, user.email);
});

passport.deserializeUser(async function deserializeUser(email, cb) {
    try{
        const user = await User.findOne({where:{email}})

        if(!user) cb(null,null);
        
        cb(null,user[0]);
    }catch(err){
        cb(err,null);
    }
})



const signIn = asyncHandler(async function(req,res,next){
    return {
        GET:(req,res) => res.render('signin'),
        POST: (req,res,next)=>{
            const { email, password } = req.body;
            res.locals._setInputValue('email',email);
            res.locals._setInputError('email');
            res.locals._setInputValue('password',password);
            res.locals._setInputError('password',"Invalid email and password.");

            const result = validationResult(req); 
            if(!result.isEmpty()) {    
                return res.status(StatusCodes.BAD_REQUEST).render('signin');
            }
            localStrategy.authenticate('local', async function(err, user){
                
                if(err) return next(err);
                                
                if(user){
                    req.login(user,next);
                    return res.redirect('/admin');
                }

                return res.status(StatusCodes.UNAUTHORIZED).render('signin');

            })(req,res,next)
        }
    }[req.method](req,res,next);
});

const signUp = asyncHandler(async function(_req,_res){
    return {
        GET: (req,res)=>{
            return res.render('signup');
        },
        POST:async (req,res)=>{
            const {
                displayname,
                firstname,
                lastname,
                email,
                password,
                repeatPassword
            } = req.body;
            
            // incase of input error
            res.locals._setInputValue('displayname',displayname);
            res.locals._setInputValue('firstname',firstname);
            res.locals._setInputValue('lastname',lastname);
            res.locals._setInputValue('email',email);
            res.locals._setInputValue('password',password);
            res.locals._setInputValue('repeatPassword',repeatPassword);

            // record all errror for the template
            const result = validationResult(req); 
            if(!result.isEmpty()) {
                res.locals._setInputValue('email','');
                result.errors.forEach(el=>{
                    res.locals._setInputError(el.path,el.msg)
                });
                return res.status(StatusCodes.BAD_REQUEST).render('signup');
            }

            // todo : check if user is exist
            const [user, created] = await User.findOrCreate({
                where:{email},
                defaults:{
                    displayname,firstname,lastname,password
                }
            });   
            
            if(created){
                return res.redirect('/signin');
            }

            res.locals._setInputError('email','email already in used')
            return res.status(StatusCodes.BAD_REQUEST).render('signup');
        }
    }[_req.method](_req,_res);
})

const signOut = function(req,res){
    req.session.destroy(function(){
        res.redirect('/signin')
    });    
}

module.exports = { signIn,signUp,signOut }