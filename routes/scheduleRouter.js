const Router = require('express')
const router = new Router()
const scheduleController = require('../controllers/scheduleController')

router.post('/', scheduleController.create)
router.get('/', scheduleController.getAllSchedules)
router.get('/:id', scheduleController.getScheduleById)
router.get('/devices/:id', scheduleController.getScheduleForDeviceGroup)
router.put('/:id', scheduleController.edit)
router.delete('/:id', scheduleController.delete)

module.exports = router