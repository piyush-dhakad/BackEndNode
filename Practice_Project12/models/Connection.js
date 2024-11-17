const mongooseConnection = require('mongoose');

mongooseConnection.connect('mongodb://127.0.0.1:27017/mainiProject');

module.exports = mongooseConnection;