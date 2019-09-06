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
  Catalog.find({}, (err, doc) => {
    if (err) return res.json({ code: 0, msg: res.message })
    return res.json({ code: 1, total: doc.length, datas: doc })
  })
})

/**
 * 更新目录
 */
router.put('/catalog/:id', (req, res, next) => {
  Catalog.findOneAndUpdate({_id: req.params.id}, {name: req.body.name}, (err, doc) => {
    if (err) return res.json({ code: 0, msg: res.message })
    return res.json({ code: 1, msg: 'update success' })
  })
})

/**
 * remove
 */
router.delete('/catalog/:id', (req, res, next) => {
  Catalog.findOneAndDelete(req.params.id, {$pull: {id: req.params.id}}, (err, doc) => {
    if(err) return res.json({ code: 0, msg: res.message })
    return res.json({ code: 1, msg: 'removed' })
  })
})

module.exports = router