// 引入加密
const bcrypt = require('bcrypt')
const { User } = require('../model/user')
// 注册用户
exports.registeredUsers = async (req, res, next) => {
    try {
        const { email, name, password } = req.validate
        /**
         * 1.查询邮箱是否被注册过
         * 2.如果注册过，不能再次注册，直接返回失败的响应
         * 3.没有注册直接注册，返回成功的响应
         */
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                code: 400,
                msg: '该邮箱已被注册',
                data: { email },
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            email,
            name,
            password: hashPassword,
        })
        await newUser.save()
        res.status(200).json({
            code: 200,
            msg: '注册成功',
            data: { email },
        })
    } catch (error) {
        next(error)
    }
}
// 获取所有用户
exports.getAllUsers = async (req, res, next) => {
    try {
        const userList = await User.find().select('+locations')
        if (userList.length === 0) {
            return res.status(400).json({
                code: 400,
                msg: '暂无用户',
            })
        }
        res.status(200).json({
            code: 200,
            msg: '获取所有用户成功',
            data: userList,
        })
    } catch (error) {
        next(error)
    }
}
// 获取指定用户
exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id
        console.log(userId)
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({
                code: 400,
                msg: '该用户不存在',
            })
        }
        res.status(200).json({
            code: 200,
            msg: '获取指定用户成功',
            data: user,
        })
    } catch (error) {
        next(error)
    }
}
// 编辑/修改指定用户
exports.editUserById = async (req, res, next) => {
    try {
        const userId = req.params.id
        let body = req.body
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(body.password, salt)
        const data = await User.findByIdAndUpdate(userId, { ...body, password: hashPassword })
        console.log(data, req.body)
        if (!data) {
            return res.status(400).json({
                code: 400,
                msg: '该用户不存在',
            })
        }
        res.status(200).json({
            code: 200,
            msg: '编辑/修改指定用户成功',
            data: req.body,
        })
    } catch (error) {
        next(error)
    }
}
// 删除用户
exports.deleteUserById = async (req, res, next) => {
    try {
        const userId = req.params.id
        const data = await User.findByIdAndDelete(userId)
        if (!data) {
            return res.status(400).json({
                code: 400,
                msg: '该用户不存在',
            })
        }
        res.status(200).json({
            code: 200,
            msg: '删除指定用户成功',
            data: userId,
        })
    } catch (error) {
        next(error)
    }
}
// 获取关注列表
exports.getFollowList = async (req, res, next) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId).select('+following').populate('following')
        console.log(user)
        if (!user) {
            return res.status(400).json({
                code: 400,
                msg: '获取关注列表失败',
            })
        }
        res.status(200).json({
            code: 200,
            msg: '获取关注列表成功',
            data: user,
        })
    } catch (error) {
        next(error)
    }
}
// 关注
exports.follow = async (req, res, next) => {
    try {
        const userId = req.userDate._id
        const user = await User.findById(userId).select('+following')
        if (user.following.includes(req.params.id)) {
            return res.status(400).json({
                code: 400,
                msg: '关注失败',
            })
        }
        user.following.push(req.params.id)
        await user.save()
        res.status(200).json({
            code: 200,
            msg: '关注成功',
            data: user,
        })
    } catch (error) {
        next(error)
    }
}
// 取消关注
exports.unfollow = async (req, res, next) => {
    try {
        const userId = req.userDate._id
        const user = await User.findById(userId).select('+following')
        if (!user.following.includes(req.params.id)) {
            return res.status(400).json({
                code: 400,
                msg: '取消关注失败',
            })
        }
        user.following = user.following.filter(item => item.toString() !== req.params.id)
        await user.save()
        res.status(200).json({
            code: 200,
            msg: '取消关注成功',
        })
    } catch (error) {
        next(errpr)
    }
}
