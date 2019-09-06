var express = require('express')
var router = express.Router()
var Content = require('../models/model.content')
/**
 * 创建文档
 */
router.post('/articles', (req, res, next) => {
  const articles = new Content({
    title: req.body.title,
    intro: req.body.intro,
    catalog: req.body.catalogId
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
  let limit = parseInt(req.query.limit) || 10
  let pageSize = parseInt(req.query.pageSize) || 1
  let params = {
    category: req.query.category,
    status: req.query.status,
    keyword: req.query.keyword
  };
  let mp = {}
  for (let i in params) {
    if (params[i] !== undefined) mp[i] = params[i]
  }
  if (pageSize < 1) pageSize = 1
  Content.find({}, (err, doc) => {
    if (err) return res.json({ code: 0, msg: res.message })
    Content.find({...mp})
      .populate('catalog')
      .skip((pageSize - 1) * limit)
      .limit(limit)
      .exec((err, docs) => {
        if (err) return res.json({ code: 0, msg: res.message })
        return res.json({ code: 1, total: doc.length, datas: docs })
    })
  })
})

// 删除
router.delete('/articles/:id', (req, res, next) => {
  let id = req.params.id
  Content.findOneAndDelete(id, {$pull: {id: id}}, (err, doc) => {
    if(err) return res.json({ code: 0, msg: res.message })
    return res.json({ code: 1, msg: '删除成功' })
  })
})

// 查询文章详情
router.get('/articles/:id', (req, res, next) => {
  let id = req.params.id
  Content.findOne({_id: id}, (err, doc) => {
    if (err) return res.json({ code: 0, msg: res.message })
    return res.json({ code: 1, datas: doc })
  })
})

// 更新文章

router.put('/articles/:id', (req, res, next) => {
  let id = req.params.id
  let articles = {
    title: req.body.title,
    intro: req.body.intro,
    catalog: req.body.catalogId
  }
  Content.findOneAndUpdate({_id: id}, articles, (err, doc) => {
    if (err) return res.json({ code: 0, msg: res.message })
    return res.json({ code: 1, msg: 'update success' })
  })
})







module.exports = router