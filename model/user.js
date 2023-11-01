const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const config = require('../config')
Joi.objectId = require('joi-objectid')(Joi)
// 定义 user 结构
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 20,
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1000,
        select: false,
    },
    __v: {
        type: Number,
        select: false,
    },
    // 个人资料
    avatat_url: {
        type: String,
        select: false,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male',
        required: true,
    },
    headline: {
        type: String,
    },
    locations: {
        type: [{ type: String }],
        select: false,
    },
    business: {
        type: String,
        select: false,
    },
    employments: {
        type: [{ company: { type: String }, job: { type: String } }],
        select: false,
    },
    educations: {
        select: false,
        type: [
            {
                school: { type: String },
                major: { type: String },
                diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
                entrance_year: { type: Number },
                grations_year: { type: Number },
            },
        ],
    },
    // 关注粉丝
    following: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        select: false,
    },
})
// 封装生成token
userSchema.methods.generateToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
        },
        config.secret,
        {
            expiresIn: '10d',
        }
    )
    return token
}
// 创建 Model
const User = mongoose.model('User', userSchema)
// 创建内容校验规则对象
function userValidate(data) {
    const schema = Joi.object({
        email: Joi.string().email().trim().lowercase().min(6).max(30).required().messages({
            'any.required': '请输入邮箱',
            'string.email': '邮箱格式错误',
        }),
        name: Joi.string().trim().min(2).max(20).required().messages({
            'any.required': '请输名称',
            'string.base': '名称必须是String类型',
        }),
        password: Joi.string()
            .regex(/^[a-zA-Z0-9]{6,16}$/)
            .required(),
        _id: Joi.objectId(),

        avatat_url: Joi.string().messages({
            'string.base': '图片地址必须为String类型',
        }),
        gender: Joi.any().valid('male', 'female').default('male').messages({
            'any.only': '性别只能为male或female',
        }),
        headline: Joi.string().max(100).messages({
            'string.base': '个人简介必须为String类型',
            'string.max': '个人简介不能超过100个字符',
        }),
        business: Joi.string().messages({
            'string.base': 'business必须为String类型',
        }),
        locations: Joi.array().items(Joi.string()).messages({
            'array.base': '位置必须为Array类型',
            'string.base': '数组中必须为String类型',
        }),
        employments: Joi.array()
            .items(
                Joi.object().keys({
                    company: Joi.string(),
                    position: Joi.string(),
                    description: Joi.string(),
                })
            )
            .messages({
                'array.base': 'employments必须为Array类型',
                'object.unknown': '传入的数据有误',
            }),
        educations: Joi.array().items(
            Joi.object()
                .keys({
                    school: Joi.string(),
                    major: Joi.string(),
                    diploma: Joi.number().valid(1, 2, 3, 4, 5),
                    entrance_year: Joi.number(),
                    graduation_year: Joi.number(),
                })
                .messages({
                    'array.base': 'educations必须为Array类型',
                    'object.unknown': '传入的数据有误',
                    'any.only': 'diploma 只能从1、2、3、4、5中进行选取',
                    'string.base': 'scholl 与 major 只能是 string 类型',
                    'number.base': 'entrance_year 与 graduation_year 只能是 number 类型',
                })
        ),
        following: Joi.array()
            .items(
                Joi.object().keys({
                    type: Joi.objectId(),
                })
            )
            .messages({
                'array.base': 'following 必须为 Array 类型',
            }),
    })
    return schema.validate(data)
}
module.exports = { User, userValidate }
