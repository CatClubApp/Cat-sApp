'use strict';
const { hashPassword } = require('../helper/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favorite)
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please Fill the Name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid Email Format'
        },
        notEmpty: {
          msg : 'Please Fill The email'
        }
      },
      unique : true
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg : 'Please Fill The Password'
        }
      }
    }
  }, {
  sequelize,
  modelName: 'User',
  hooks: {
    beforeCreate(instance, options) {
      instance.password = hashPassword(instance.password)
    }
  }
});
return User;
};