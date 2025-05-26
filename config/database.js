const logger = require('pino')({
  transport: {
    target: 'pino-pretty',
   
   
  },
  level:'debug'
})
module.exports = {
  "development": {
    "username": "root",
    "password": "password",
    "database": "test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": msg => logger.debug(msg)
    
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
