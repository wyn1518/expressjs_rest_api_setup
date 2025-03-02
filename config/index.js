

const env = process.env.NODE_ENV || 'development';

module.exports = {
    session:{
        'development':{
            secret:process.env.SESSION_SECRET || "SDFSDFSDF"
        }
        
    }[env],
    database:require('./database')[env],
}