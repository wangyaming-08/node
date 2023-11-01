const mongoose = require('mongoose')
const Joi = require('joi')
const config = require('../config')
Joi.objectId = require('joi-objectid')(Joi)

const topicSchema = new mongoose.Schema({
    __v: {
        type: Number,
        select: false,
    },
    name: {
        type: String,
        required: true,
    },
    avatar_url: {
        type: String,
    },
    introduction: {
        type: String,
        select: false,
        maxlength: 300,
    },
})
function topicValidate(data) {
    const schema = Joi.object({
        name: Joi.string().required(),
        avatar_url: Joi.string(),
        introduction: Joi.string().max(300),
    })
    return schema.validate(data)
}
const Topic = mongoose.model('Topic', topicSchema)

module.exports = {
    Topic,
    topicValidate,
}
