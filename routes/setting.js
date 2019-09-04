var express = require('express')
var router = express.Router()
var Catalog = require('../models/model.setting')
/**
 * 创建目录
 */
router.post('/catalog', (req, res, next) => {
  const catalogs = new Catalog({
    name: req.body.name
  })
  Catalog.find({}, (err, doc) => {
    if (err) res.json({ code: 0, msg: res.message })
    else {
      catalogs.save(err => {
        const datas = err ? {code: 0} : {code: 1, message: '创建成功'}
        res.json(datas)
      })
    }
  })
})

/**
 * 目录列表
 */
router.get('/catalog', (req, res, next) => {
  let limit = parseInt(req.query.limit) || 10
  let pageSize = parseInt(req.query.pageSize) || 1
  if (pageSize < 1) pageSize = 1
  Catalog.find({}, (err, doc) => {
    if (err) return res.json({ code: 0, msg: res.message })
    Catalog.find({}).skip((pageSize - 1) * limit).limit(limit).exec((err, docs) => {
      if (err) return res.json({ code: 0, msg: res.message })
      return res.json({ code: 1, total: doc.length, datas: docs })
    })
  })
})

module.exports = router