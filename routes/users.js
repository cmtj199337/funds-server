var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Users = require('../models/users')

let url = 'mongodb://127.0.0.1:27017/dumall'
mongoose.connect(url, {useNewUrlParser: true}, (err, db) => {
  if (err) {
    console.log(err)
  } else {
    console.log('connect success')
  }
})
/* GET users listing. */
router.get('/', (req, res, next) => {
  Users.find({}, (err, doc) => {
    if (err) {
      res.json({
        status: 1,
        msg: res.message
      })
    } else {
      res.json({
        status: 0,
        msg: '',
        result: {
          count: doc.length,
          data: doc
        }
      })
    }
  })
})

module.exports = router
