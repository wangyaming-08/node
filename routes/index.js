const router = require('express').Router()

const users = require('./user')
const auth = require('./auth')
const upload = require('./upload')
const topics = require('./topics')
// 用户模块
router.use('/user', users)
// 登录模块
router.use('/auth', auth)
// 文件上传模块
router.use('/upload', upload)
// 话题模块接口
router.use('/topics', topics)

module.exports = router
