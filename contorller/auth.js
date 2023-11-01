const { User } = require('../model/user')
const bcrypt = require('bcrypt')

exports.login = async (req, res, next) => {
    try {
        /**
         * 获取校验过后的数据
         * 如果用户不存在，直接返回失败的响应
         * 如果用户存在，我们再来检测密码是否正确1、数据库中的密码解密比较2、将密码加密，比较加密密码
         * 如果密码不正确，返回失败的响应
         * 登录成功，响应成功的信息
         */
        const { email, password } = req.validate
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(400).json({
                code: 400,
                msg: '用户不存在',
                data: { email },
            })
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(400).json({
                code: 400,
                msg: '密码错误',
                data: { email },
            })
        }

        res.status(200).json({
            code: 200,
            msg: '登录成功',
            authorization: {
                token: user.generateToken(),
            },
        })
    } catch (error) {
        next(error)
    }
}
