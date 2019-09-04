var mongoose = require('mongoose')
var Schema = mongoose.Schema

var contentSchema = new Schema({
  'contentId': String,
  'title': String,
  'intro': String,
  'catalogId': String
}, { 
  versionKey: false,
  timestamps: true
})

module.exports = mongoose.model('Condent', contentSchema)