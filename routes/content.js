var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Content = require('../models/model.content')

let url = 'mongodb://127.0.0.1:27017/dumall'
mongoose.connect(url, {useNewUrlParser: true}, (err, db) => {
  if (err) console.log(err)
  else console.log('connect success')
})
/**
 * 创建文档
 */
router.post('/articles', (req, res, next) => {
  const articles = new Content({
    title: req.body.title,
    intro: req.body.intro
  })
  Content.find({}, (err, doc) => {
    if (err) res.json({ code: 0, msg: res.message })
    else {
      articles.save(err => {
        const datas = err ? {code: 0} : {code: 1, message: '创建成功'}
        res.json(datas)
      })
    }
  })
})

/**
 * 文章列表
 */
router.get('/articles', (req, res, next) => {
  let limit = req.query.pagesize || 10
  let currentPage = req.query.page || 1
  let params = {
    category: req.query.category,
    status: req.query.status,
    keyword: req.query.keyword
  };
  let mp = {}
  for (let i in params) {
    if (params[i] !== undefined) mp[i]=params[i]
  }
  if (currentPage < 1) currentPage = 1
  Content.find({}, (err, doc) => {
    if (err) res.json({ code: 0, msg: res.message })
    let all = doc.length
    Content.find({...mp}).skip((parseInt(currentPage)-1)*parseInt(limit)).limit(parseInt(limit)).exec((err, docs) => {
      if (err) res.json({ code: 0, msg: res.message })
      return res.json({
        code: 1,
        message: '请求成功',
        total: all,
        datas: docs
      })
    })
  })
})

module.exports = router