var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  'userId': String,
  'userName': String,
  'password': String
}, { 
  versionKey: false,
  timestamps: true 
})

module.exports = mongoose.model('User', userSchema)