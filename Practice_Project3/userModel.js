const mongoose = require('mongoose');
                            // host name    // DataBase name
mongoose.connect('mongodb://127.0.0.1:27017/mongoPractice');

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String
});
// Model = table
module.exports = mongoose.model('user',userSchema);

