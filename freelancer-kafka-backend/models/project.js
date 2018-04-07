// grab the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var bidSchema = new Schema({
    bid_amount:Number,
    days:Number,
    bidder:{type:Schema.Types.ObjectId,ref:'User'}
});

// create a schema
var projectSchema = new Schema({
    name: String,
    status: {
        type:String,
        default:"OPEN",
        enum:['OPEN','CLOSED']
    },
    description:String,
    budget_range: {
        type:String
    },
    file:{
        type:String,
    },
    freelancer: { type: Schema.Types.ObjectId, ref: 'User' },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    bids:[bidSchema],
    skills:[{type:Schema.Types.ObjectId,ref:'Skill'}]
});



var Project = mongoose.model('Project', projectSchema);

module.exports = Project;