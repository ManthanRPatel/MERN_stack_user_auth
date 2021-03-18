const router = require('express').Router();
const multer = require('multer')
const userController = require('./controller/user.controller')
const jwtMiddleware = require('./middleware/jwtCheck')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

var upload = multer({ storage: storage })

router.get('/getUser', jwtMiddleware, userController.getUserInfo);

router.post('/loginUser', userController.loginUser);

router.post('/registerUser', upload.single('profile_pic'), userController.registerUser);


module.exports = router