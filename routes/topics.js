const router = require('express').Router()
const topic = require('../contorller/topics')
const auth = require('../middleware/auth')
const validate = require('../middleware/validate')
const { topicValidate } = require('../model/topics')
// 获取话题列表
router.get('/', auth, topic.getTopicsList)
// 获取制定话题
router.get('/:id', auth, topic.getTopic)
// 新增话题
router.post('/', [auth, validate(topicValidate)], topic.addTopic)
// 修改话题
router.patch('/:id', [auth, validate(topicValidate)], topic.editTopic)
module.exports = router
