const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/authtestapp');

let userSchema = mongoose.Schema({
    usrname:String,
    email:String,
    password:String,
    age:Number
});

let UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;