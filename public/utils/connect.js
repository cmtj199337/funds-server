var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Content = require('../models/model.content')

let url = 'mongodb://127.0.0.1:27017/dumall'
mongoose.connect(url, {useNewUrlParser: true}, (err, db) => {
  if (err) console.log(err)
  else console.log('connect success')
})

router.get('/', (req, res, next) => {
  console.log('content')
})
/**
 * 创建文档
 */
router.post('/articles', (req, res, next) => {
  const articles = new Content({
    userName: req.body.userName,
    password: req.body.password
  })
  Users.find({userName: req.body.userName}, (err, doc) => {
    if (err) {
      res.json({
        code: 0,
        msg: res.message
      })
    } else {
      if (doc.length > 0) {
        res.json({
          code: 99,
          msg: '用户已存在'
        })
      } else {
        newUser.save(err => {
          const datas = err ? {code: 0} : {code: 1, userName: req.body.userName, message: '注册成功'}
          res.json(datas)
        })
      }
    }
  })
})

/**
 * 用户登录
 */
router.post('/login', (req, res, next) => {
  var param = {
    userName: req.body.userName,
    password: req.body.password
  }
  Users.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        code: 0,
        msg: res.message
      })
    } else {
      if (doc) {
        let _id = doc._id.toString()
        let secretOrPrivateKey = 'funds'
        let token = jwt.sign({name: _id}, secretOrPrivateKey, {
          expiresIn: '10h'
        })
        res.json({
          code: 1,
          msg: '登录成功',
          result: {token: token}
        })
      } else {
        res.json({
          code: 0,
          msg: res.message
        })
      }
    }
  })
})

module.exports = router