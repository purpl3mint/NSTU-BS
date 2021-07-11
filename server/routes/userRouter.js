const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.put('/editgroup', userController.editGroup)
router.get('/auth', userController.auth)
router.delete('/:id', userController.delete)

module.exports = router