'use strict';
module.exports = (sequelize, DataTypes) => {
  var Skill = sequelize.define('Skill', {
    name: {
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    }
  }, {

  });


    Skill.associate = function(models) {
        Skill.belongsToMany(models.User,{through:"UserSkills"});
        Skill.belongsToMany(models.Project,{through:"ProjectSkills"});
    };


    return Skill;
};

