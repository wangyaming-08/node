const router = require('express').Router()
const { userValidate } = require('../model/user')
const validate = require('../middleware/validate')
const auth = require('../middleware/auth')
const checkUserExist = require('../middleware/checkUserExist')
const user = require('../contorller/user')

// 注册用户
router.post('/', validate(userValidate), user.registeredUsers)
// 获取所有用户
router.get('/', auth, user.getAllUsers)
// 获取指定用户
router.get('/:id', auth, user.getUserById)
// 编辑/修改指定用户
router.patch('/:id', [auth, validate(userValidate)], user.editUserById)
// 删除用户
router.delete('/:id', auth, user.deleteUserById)
// 获取关注列表
router.get('/:id/follow', auth, user.getFollowList)
// 关注
router.put('/following/:id', [auth, checkUserExist], user.follow)
// 取消关注
router.delete('/following/:id', [auth, checkUserExist], user.unfollow)

module.exports = router
