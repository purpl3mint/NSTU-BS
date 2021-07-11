const Router = require('express')
const router = new Router()
const userGroupController = require('../controllers/userGroupController')

router.post('/create', userGroupController.create)
router.post('/addDeviceGroup', userGroupController.addDeviceGroup)
router.get('/', userGroupController.getAllGroups)
router.get('/:id', userGroupController.getOneGroup)
router.delete('/:id', userGroupController.delete)

module.exports = router