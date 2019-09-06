var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  'userName': String,
  'password': String
}, { 
  versionKey: false,
  timestamps: true 
})

module.exports = mongoose.model('User', userSchema)