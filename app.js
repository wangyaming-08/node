const config = require('./config')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const error = require('./middleware/error')
const router = require('./routes')
const app = express()
// 处理JSON中间件
app.use(express.json())
// 静态资源托管
app.use(express.static('public'))
// 处理跨域中间件
app.use(cors())
// 处理日志
app.use(morgan('dev'))
// 引入数据库
require('./model')
// 引入路由中间价
app.use('/api', router)
// 引入错误处理中间件
app.use(error)

app.get('/', (req, res) => {
    res.end('Hello World11!')
})
app.post('/', (req, res) => {
    console.log(req.body)
    res.send('Hello World22!')
})
app.listen(config.app.port, () => {
    console.log(`Example app listening on port ${config.app.port}!`)
})
