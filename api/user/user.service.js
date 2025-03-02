const User = require('./user.model');

module.exports = {
    async getAllUsers(){
        return await User.findAll()
    },  
}