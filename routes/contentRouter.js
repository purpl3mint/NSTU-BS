const Router = require('express')
const router = new Router()
const contentController = require('../controllers/contentController')

router.post('/create', contentController.create)
router.put('/approving', contentController.approving)
router.get('/', contentController.getAllContent)
router.get('/:id', contentController.getOneContent)
router.delete('/:id', contentController.delete)

module.exports = router