const LocalStrategy = require('passport-local');
const passport = require('passport');
const { User } = require('../_database');

module.exports = passport ;
passport.use(new LocalStrategy({
        usernameField:'email'
    },
    async function verify(email, password, cb) {
        try{
            
            const user =  await User.scope({method:['signin',email]}).findOne()  
    
            if(user && user.authenticate(password)) {
                return cb(null,user);
            }
            return cb(null,false);
                  
        }catch(err){
            
            return cb(err,false);
        }
    }
));

passport.serializeUser(async function serializeUser(user, cb) {
    return cb(null, user.email);
});

passport.deserializeUser(async function deserializeUser(email, cb) {
    try{
        const user = await User.scope({method:['signin',email]}).findOne()

        if(!user) cb(null,null);
        
        cb(null,user);
    }catch(err){
        cb(err,null);
    }
})