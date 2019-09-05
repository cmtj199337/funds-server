var mongoose = require('mongoose')
var Schema = mongoose.Schema

var contentSchema = new Schema({
  'contentId': String,
  'title': String,
  'intro': String,
  'catalog': {
    type: Schema.Types.ObjectId,
    ref: 'Catalog'
  }
}, { 
  versionKey: false,
  timestamps: true
})

module.exports = mongoose.model('Condent', contentSchema)