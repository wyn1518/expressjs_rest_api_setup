const {localPassport} = require('../strategies');
const { User,Sequelize } = require('../_database');
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes')
const {checkSchema,check,body} = require('express-validator');

const signIn = asyncHandler(async function(req,res,next){
    res.locals.input = {
        email:{
            value:'',
            error:null
        },
        password:{
            value:'',
            error:null
        },
    }
    
    if(req.method === 'GET') return res.render('signin');

    if(req.method === 'POST'){
        return localPassport.authenticate('local',function(err, user, info){
            if(err)return next(err)
            if(!user){
                res.locals.input.email.error = 'Invalid email';
                res.locals.input.password.error = 'Invalid password';
                return res.render('signin');
            }
            return req.login(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/')
            });
            
        })(req,res,next)
    }
});



const signUp = asyncHandler(async function(req,res,next){
    res.locals.input = {
        username:{
            value:'',
            error:null,
        },
        firstname:{
            value:'',
            error:null
        },
        lastname:{
            value:'',
            error:null
        },
        email:{
            value:'',
            error:null
        },
        password:{
            value:'',
            error:null
        },
        repeatPassword:{
            value:'',
            error:null
        }
    }

    if(req.method === "GET") return res.render('signup');
    if(req.method === 'POST'){
        
        const {
            username,
            firstname,
            lastname,
            email,
            password,
            repeatPassword
        } = req.body

        res.locals.input.firstname.value = firstname;
        res.locals.input.lastname.value = lastname;
        res.locals.input.email.value = email;
        res.locals.input.username.value = username;
        res.locals.input.password.value = password;
        res.locals.input.repeatPassword.value = repeatPassword;
        
        try {
        
            // error occure when email is already used
            const newUser = User.build(req.body); 
            req.log.info(newUser.username)
            await newUser.validate();

            await newUser.save();
            return res.redirect('/signin');
        
            
        }catch(err){
            if(err instanceof Sequelize.ValidationError ){
                err.errors.forEach(el=>{
                    res.locals.input[el.path].error = el.message;
                });
                return res.status(StatusCodes.BAD_REQUEST).render('signup');
            }
            next(err)
        }
    
    }
})

const signOut = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });   
}

const profile = function(){
    function setInput(req,res){
        res.locals.input = {
            username:{
                value:req.body.username,
                error:null
            },
            firstname:{
                value:req.body.firstname,
                error:null
            },
            lastname:{
                value:req.body.lastname,
                error:null
            },
            email:{
                value:req.body.email,
                error:null
            },
            oldPassword:{
                value:req.body.oldPassword,
                error:null
            },
            newPassword:{
                value:req.body.newPassword,
                error:null
            },
        }
    } 
    
    return {
        index:asyncHandler(  async function(req,res){
            setInput(req,res);
            
            res.render('personal.html')
        }),
        updateBasicInformation : asyncHandler( async function(req,res,next){
            setInput(req,res);
            try {
                
                const {
                    username,
                    firstname,
                    lastname,
                } = req.body
               
                await User.update({
                    username,firstname,lastname
                },{where:{email:req.user.email}}); 

                return res.redirect('/profile');
            
            } catch(err) {
                if(err instanceof Sequelize.ValidationError ){
                    err.errors.forEach(el=>{
                        res.locals.input[el.path].error = el.message;
                        res.locals.input[el.path].value = el.value;
                    });
                    return res.status(StatusCodes.BAD_REQUEST).render('personal.html');
                }
                next(err)
            }
        }),
        updateEmail : asyncHandler(async function(req,res,next){
            setInput(req,res);
            try {

                const {
                    email
                } = req.body

                // error occure when email is already used
                await User.update({
                    email
                },{where:{email:req.user.email}}); 

                return res.redirect('/profile');
            
            } catch(err) {
                if(err instanceof Sequelize.ValidationError ){
                    err.errors.forEach(el=>{
                        res.locals.input[el.path].error = el.message;
                        res.locals.input[el.path].value = el.value;
                    });
                    return res.status(StatusCodes.BAD_REQUEST).render('personal.html');
                }
                next(err)
            }        
        }) ,
        updatePassword : asyncHandler(async function(req,res){
            setInput(req,res);
            try {
                const {
                    oldPassword,newPassword
                } = req.body
                // error occure when email is already used

                await User.update({
                    password:newPassword
                },{where:{email:'ghgh@gmail.com',}}); 

                return res.redirect('/profile');
            
                
            } catch(err) {
                if(err instanceof Sequelize.ValidationError ){
                    req.log.info(err.errors)
                    err.errors.forEach(el=>{
                        res.locals.input[el.path].error = el.message;
                        res.locals.input[el.path].value = el.value;
                    });
                    return res.status(StatusCodes.BAD_REQUEST).render('personal.html');
                }
                next(err)
            } 
        }) 
        
    }
    
}



module.exports = { signIn,signUp,signOut,profile}
