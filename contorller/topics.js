const { Topic } = require('../model/topics')

// 获取话题列表
exports.getTopicsList = async (req, res, next) => {
    const { page = 1, pageSize = 10, keyword } = req.query

    try {
        const topicList = await Topic.find({ name: /"河北"/i })
            .sort({ _id: -1 })
            .limit(Number(pageSize))
            .skip((Number(page) - 1) * Number(pageSize))

        console.log(topicList)
        if (topicList.length === 0) {
            return res.status(400).json({
                code: 400,
                msg: '暂无话题',
            })
        }
        res.status(200).json({
            code: 200,
            msg: '获取话题列表成功',
            data: topicList,
        })
    } catch (error) {
        next(error)
    }
}
exports.getTopic = async (req, res, next) => {
    try {
        const { fields = '' } = req.query
        const selectFields = fields
            .split(',')
            .filter(f => f)
            .map(f => ' +' + f)
            .join('')
        const topic = await Topic.findById(req.params.id).select(selectFields)
        if (!topic) {
            return res.status(400).json({
                code: 400,
                msg: '话题不存在',
            })
        }
        res.status(200).json({
            code: 200,
            msg: '获取话题成功',
            data: topic,
        })
    } catch (error) {
        next(error)
    }
}
// 创建话题
exports.addTopic = async (req, res, next) => {
    try {
        const data = req.body
        let topic = await Topic.findOne(req.body)
        if (topic) {
            return res.status(400).json({
                code: 400,
                msg: '话题已经存在',
                data,
            })
        }
        topic = new Topic(data)
        await topic.save()
        res.status(200).json({
            code: 200,
            msg: '创建话题成功',
            data,
        })
    } catch (error) {
        console.log('eeeeee')
        next(error)
    }
}
// // 更新话题
exports.editTopic = async (req, res, next) => {
    try {
        const data = req.body
        const topic = await Topic.findByIdAndUpdate(req.params.id, data)
        if (!topic) {
            return res.status(400).json({
                code: 400,
                msg: '话题不存在',
                data,
            })
        }
        res.status(200).json({
            code: 200,
            msg: '更新话题成功',
            data,
        })
    } catch (error) {
        next(error)
    }
}
