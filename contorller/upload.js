exports.upload = (req, res, next) => {
    try {
        res.send('http://localhost:3000/' + 'upload/' + req.file.filename)
    } catch (error) {
        next(error)
    }
}
