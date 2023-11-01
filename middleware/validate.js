module.exports = validate => {
    return (req, res, next) => {
        const { error, value } = validate(req.body)
        if (error) {
            return res.status(400).json({
                code: 400,
                value: error._original,
                msg: error.details[0].message,
            })
        }
        req.validate = value
        next()
    }
}
