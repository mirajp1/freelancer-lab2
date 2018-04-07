'use strict';

module.exports = (sequelize, DataTypes) => {
    var Project = sequelize.define('Project', {
        name: {
            type:DataTypes.STRING,
        },
        description:{
            type:DataTypes.STRING,
        },
        budget_range:{
            type:DataTypes.STRING
        },
        file:{
            type:DataTypes.STRING
        }
    }, {

    });

    Project.associate = function(models) {
       Project.belongsTo(models.User);
       Project.belongsToMany(models.Skill,{through:"ProjectSkills"});
       Project.hasMany(models.Bid);
    };


    return Project;
};

