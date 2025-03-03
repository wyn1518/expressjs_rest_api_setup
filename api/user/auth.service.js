const User = require('./user.model');
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

        return [user,created];
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

            return accessToken ;
        }  
        
        return null;
    
    },


    updateAccount : async function({
            id,
            displayname,
            firstname,
            lastname,
        }){

        const user = await User.update({
            displayname,firstname,lastname
        },{
            where:{
                id
            }
        });
        
        return null;

    }
};




