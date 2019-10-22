const Sequelize = require('sequelize')
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config();

//----------------------------------------------
//------------------ init database
//----------------------------------------------
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect:process.env.DB_PROVIDER,
  storage: path.join(__dirname, '../../../database/database.sqlite'),
  operatorsAliases: false
})


//----------------------------------------
//------------ Model
//----------------------------------------

const Test = sequelize.define('tests', {
  
  username: {
        type: Sequelize.STRING,
        unique: {
          args: true,
          msg: 'That username is not available.'
        },
        validate:{
          notEmpty: {
            msg: 'UserNmae is empty !'
          },
        }
    },

  // Timestamps
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
 
})

//--------------------------------------
//------------------ create  tables 
//-------------------------------------
sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));


//---------------------------------------
//----------- Export Model
//--------------------------------------
module.exports=User