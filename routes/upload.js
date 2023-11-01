const router = require('express').Router()
const multer = require('multer')
const home = require('../contorller/upload')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })
router.post('/', upload.single('file'), home.upload)
module.exports = router
