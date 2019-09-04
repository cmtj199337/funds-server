var express = require('express')
var router = express.Router()
var Users = require('../models/model.users')
const jwt = require('jsonwebtoken')
/**
 * 用户注册
 */
router.post('/register', (req, res, next) => {
  const newUser = new Users({
    userName: req.body.userName,
    password: req.body.password
  })
  Users.find({userName: req.body.userName}, (err, doc) => {
    if (err) {
      res.json({ code: 0, msg: res.message })
    } else {
      if (doc.length > 0) res.json({ code: 99, msg: '用户已存在' })
      else {
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
    if (err) res.json({ code: 0, msg: res.message })
    else {
      if (doc) {
        let _id = doc._id.toString()
        let secretKey = 'funds'
        let token = jwt.sign({name: _id}, secretKey, {
          expiresIn: '10h'
        })
        res.json({ code: 1, result: {token: token} })
      } else res.json({ code: 0, msg: res.message })
    }
  })
})

module.exports = router
