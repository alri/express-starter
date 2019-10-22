const Sequelize = require('sequelize')
const Model = Sequelize.Model;
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
class User extends Model {}
 
 User.init({
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
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: {
        msg: "Email address must be valid"
      },
      notEmpty: {
        msg: 'Email Field Not empty !'
      },
      len: [1, 255]
    }
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      isAlpha: {
        msg: 'Please enter alphabet password'
      },
    }
  },
  api_key:{
    type: Sequelize.STRING,
  },
  admin:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue:0
  },

  // Timestamps
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, 
{
  sequelize,
  modelName: 'user',
  hooks: {
    beforeCreate: async (user) => {
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(user.password, salt);
    }
  },
  
})

User.prototype.validPassword=function(password){
      return bcrypt.compareSync(password, this.password);
}

//--------------------------------------
//------------------ create  tables 
//-------------------------------------
User.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));


//---------------------------------------
//----------- Export Model
//--------------------------------------
module.exports=User