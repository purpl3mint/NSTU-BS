const Router = require('express')
const router = new Router()
const deviceGroupController = require('../controllers/deviceGroupController')

router.post('/create', deviceGroupController.create)
router.get('/', deviceGroupController.getAllGroups)
router.get('/:id', deviceGroupController.getOneGroup)
router.delete('/:id', deviceGroupController.delete)

module.exports = router