module.exports = (err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        code: 500,
        error: '服务器错误！',
    })
}
