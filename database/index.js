var Promise = require('bluebird');
var mongoose = require('mongoose');
var dbConfig = require('../config/db');
var dbKey = process.env.dbKey || dbConfig.dbKey;

mongoose.connect(dbKey);
Promise.promisifyAll(mongoose);

//If the Mongoose connection is connected
mongoose.connection.on('connected', () => {  
  console.log('Mongoose connection open');
}); 

// If any error logs an error
mongoose.connection.on('error', (err) => {
  console.log('Mongoose error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {  
  console.log('Mongoose connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', () => {  
  mongoose.connection.close(() => { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

var PhotoSchema = new mongoose.Schema({
  userName: String,
  filePath: String,
  galleryName: String
});

var FacebookUserSchema = new mongoose.Schema({
  facebookId: String,
  token: String,
  name: String,
  email: String
});

module.exports.photo = mongoose.model('Photo', PhotoSchema);
module.exports.facebook = mongoose.model('FacebookUser', FacebookUserSchema);
