'use strict';
const Sequelize = require('sequelize');
const process = require('process');
const sequelizeTransforms = require('sequelize-transforms');

const config = require('../../../config').database;
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelizeTransforms(sequelize,{
  singleSpace:function(val){
    return val.replace(/  +/g, ' ');
  }
});
const User = require('./user')(sequelize,Sequelize.DataTypes);


db.User = User;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
