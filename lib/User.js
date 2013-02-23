//Configure MongoDB and Mongoose ODM
var mongoose = require('mongoose'),
    config = require('../config');

var userSchema = mongoose.Schema({
    nick:String,
    realName:String,
    phone:String,
    admin:Boolean,
    subs:String
});

module.exports = mongoose.model('User', userSchema);