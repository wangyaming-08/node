const { User } = require('../model/user')

module.exports = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(400).json({
            code: 400,
            message: '用户不存在',
        })
    }
    next()
}
