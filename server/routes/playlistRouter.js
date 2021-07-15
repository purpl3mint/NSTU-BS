const Router = require('express')
const router = new Router()
const playlistController = require('../controllers/playlistController')

router.post('/create', playlistController.create)
router.post('/addcontent', playlistController.addContent)
router.put('/edit/:id', playlistController.edit)
router.put('/editcontent', playlistController.editContent)
router.get('/', playlistController.getAllPlaylists)
router.get('/:id', playlistController.getOnePlaylist)
router.get('/content/:id', playlistController.getContent)
router.delete('/:id', playlistController.delete)
router.delete('/deletecontent/:id', playlistController.deleteContent)

module.exports = router