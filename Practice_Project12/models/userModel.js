const { default: mongoose } = require('mongoose');
const mongooseConnection = require('./Connection');

const UserSchema = mongooseConnection.Schema({
    username:String,
    name:String,
    age:Number,
    email:String,
    password:String,
    posts: [
        { 
            type:mongoose.Schema.Types.ObjectId,
            ref:"post"
        }
    ]
}); 

module.exports = mongooseConnection.model('user',UserSchema);

// generative AI