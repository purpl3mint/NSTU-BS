const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.put('/setgroup/:id', userController.setGroup)
router.get('/auth', authMiddleware, userController.auth)
router.get('/', userController.getAll)
router.get('/:id', userController.getById)
router.delete('/:id', userController.delete)

module.exports = router