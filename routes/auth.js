const router = require('express').Router()

const auth = require('../contorller/auth')
const validator = require('../middleware/validate')
const { userValidate } = require('../model/user')
router.post('/', validator(userValidate), auth.login)

module.exports = router
