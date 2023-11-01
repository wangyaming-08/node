const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = (req, res, next) => {
    // 前端请求头中是否包含token
    const token = req.header('authorization')
    if (!token) {
        return res.status(401).json({
            code: 401,
            message: '无 token',
        })
    }
    try {
        // 验证 token 是否有效
        const userDate = jwt.verify(token, config.secret)
        // 得到 token 中存储的用户数据
        req.userDate = userDate
        next()
    } catch (error) {
        return res.status(401).json({
            code: 401,
            message: '请登录',
        })
    }
}
