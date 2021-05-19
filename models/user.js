'use strict';
const bcrypt = require("bcrypt");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  
  user.init({
    name: {
      type: DataTypes.STRING,
      validate: {
       len: {
        args: [1,99],
        msg: 'Name must be between 1 and 99 characters'
       }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { // does a boolean check
          msg: 'Invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  user.addHook("beforeCreate", (PendingUser)=>{
    let hash = bcrypt.hashSync(PendingUser.password,12);
    PendingUser.password = hash;
  });
  // compares typedPassword with password in the database
  user.prototype.validPassword = function(typedPassword) {
    let isCorrectPassword = bcrypt.compareSync(typedPassword, this.password);
    return isCorrectPassword
  }
  // hijacks the current toJson method and uploads are own toJson file that 
  // deleting the current password. hides the password from being shown.
  user.prototype.toJSON = function() {
    let userData = this.get();

    delete userData.password; 
    return userData;
  }
  return user; // add functions above 
};