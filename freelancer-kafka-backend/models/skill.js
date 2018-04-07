// grab the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');



var Schema = mongoose.Schema;

// create a schema
var skillSchema = new Schema({
    name: { type: String, required: true, unique: true },
});


var Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;