'use strict';
const { Model } = require('sequelize');
const useBcrypt = require('sequelize-bcrypt');
const { uniqueNamesGenerator, NumberDictionary, colors, animals } = require('unique-names-generator');
const {check} = require('express-validator');

module.exports = (sequelize, DataTypes) => {
  
  class User extends Model {

    static associate({}) {
      // define association here
    }
  }

  User.init({
    username: {
      type:DataTypes.STRING,
      trim:true,
      defaultValue:function(){
        return uniqueNamesGenerator({ 
          dictionaries: [ colors, animals, NumberDictionary.generate({ min: 100, max: 999 })] ,
          separator: '',
          style: 'capital'

        })

      },
      validate:{
        is:{
          msg:'username must only consist of letters and number after.',
          args:/^[^\s]+[a-zA-Z]+(\d+)+[^\s]+$/gi
        },
        len:{
          msg:'username must consist atleast 5 charaters',
          args:[5,30]
        },
      }
    },
    profile:{
      type:DataTypes.STRING,
    },
    email: {
      trim:true,
      unique:{

        msg:'Email already exist.'
      },
      type:DataTypes.STRING,
      validate:{
        is:{
          msg:'gmail is only allowed',
          args:/gmail\.com$/
        },
        isEmail:{msg:'invalid email format'},
        
      }

    },
    firstname: {
      type:DataTypes.STRING,
      trim: true,
      lowercase:true,
      singleSpace:true,
      defaultValue:'',
      validate:{
        is:{
          msg:'Firstname is required and must consist of letters ans space only.',
          args:/[a-z ]{1,}/gi
        }
      }
    },
    lastname: {
      type:DataTypes.STRING,
      trim: true,
      lowercase:true,
      singleSpace:true,
      defaultValue:'',
      validate:{
        is:{
          msg:'Lastname is required and must consist of letters ans space only.',
          args:/[a-z]{1,}/gi
        }
      }
    },
    fullname:{
      type:DataTypes.VIRTUAL,
      get() {
        return `${this.getDataValue('firstname')} ${this.getDataValue('lastname')}`;
      },
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        is:{
          msg:'Must contain minimum of 8 letters, with at least symbol, upper and lowercase letter, and a number.',
          args:/(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/g
        },
      
      }
    },
   
  }, {
    sequelize,
    modelName: 'User',
    tableName:'users',
    scopes:{
      signin:function(email){
        return {
          where:{
            email
          }
        }
      }
    },
    hooks:{
      // beforeCreate:(user, options) => {
      //   user.username = uniqueNamesGenerator({ 
      //     dictionaries: [ colors, animals, NumberDictionary.generate({ min: 100, max: 999 })] ,
      //     separator: '',
      //     style: 'capital'

      //   })
      // }
    }
  });

  useBcrypt(User, {
    field: 'password', // secret field to hash, default: 'password'
    rounds: 12, // used to generate bcrypt salt, default: 12
    compare: 'authenticate', // method used to compare secrets, default: 'authenticate'
  });
  
  return User;
};