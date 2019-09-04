var mongoose = require('mongoose')
var Schema = mongoose.Schema

var catalogSchema = new Schema({
  'name': String
}, { 
  versionKey: false,
  timestamps: true
})

module.exports = mongoose.model('Catalog', catalogSchema)