'use strict';
const { Model } = require('sequelize');
const useBcrypt = require('sequelize-bcrypt');

module.exports = (sequelize, DataTypes) => {
  
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName:'users'
  });

  useBcrypt(User, {
    field: 'password', // secret field to hash, default: 'password'
    rounds: 12, // used to generate bcrypt salt, default: 12
    compare: 'authenticate', // method used to compare secrets, default: 'authenticate'
  });
  
  return User;
};