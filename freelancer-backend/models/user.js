'use strict';
var bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        validate:{
          isEmail:true
        }
    },
    password: {
          type:DataTypes.STRING,
          allowNull:false,
      },
    userType:{
        type:DataTypes.ENUM,
        allowNull:false,
        values:['work','hire']
    }
  }, {

  });

  User.associate = function(models) {
    User.hasOne(models.Profile);
    User.hasMany(models.Project);
    User.hasMany(models.Bid);
    User.belongsToMany(models.Skill,{through:"UserSkills"});
  };

    User.beforeCreate((user, options) => {
        console.log(user+": hash");
        return bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;
            })
            .catch(err => {
                throw new Error();
            });
    });


    User.prototype.validPassword = function(password){
        console.log("password cheking:"+password);
        return bcrypt.compare(password, this.password);
    }

  return User;
};

