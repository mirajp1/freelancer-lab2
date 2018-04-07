'use strict';

module.exports = (sequelize, DataTypes) => {
    var Bid = sequelize.define('Bid', {
        bid_amount: {
            type:DataTypes.INTEGER,

        },
        days: {
            type:DataTypes.INTEGER,
        }
    }, {

    });

    Bid.associate = function(models) {
       Bid.belongsTo(models.User);
       Bid.belongsTo(models.Project);
    };


    return Bid;
};

