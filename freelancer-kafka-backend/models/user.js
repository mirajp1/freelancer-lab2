// grab the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');



var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    project:{ type: Schema.Types.ObjectId, ref: 'User' },
    amount:Number,
    type: {
        type:String,
        enum:['ADD',"WITHDRAW",'TRANSFER']
    },
},{timestamps:true});

// create a schema
var userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType:String,
    phone: {
        type:String
    },
    image: {
        type:String,
        default:"/uploads/profile/default.png"
    },
    about:{
        type:String,
    },
    balance:{type:Number,default:0},
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    bidded_projects:[{type:Schema.Types.ObjectId,ref:'Project'}],
    skills:[{type:Schema.Types.ObjectId,ref:'Skill'}],
    transactions:[transactionSchema]
},{timestamps:true});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

var User = mongoose.model('User', userSchema);

module.exports = User;
module.exports.transactionSchema = transactionSchema