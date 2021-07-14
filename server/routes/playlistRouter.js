const Router = require('express')
const router = new Router()
const playlistController = require('../controllers/playlistController')

router.post('/create', playlistController.create)
router.post('/addcontent', playlistController.addContent)
router.put('/edit/:id', playlistController.edit)
router.get('/', playlistController.getAllPlaylists)
router.get('/:id', playlistController.getOnePlaylist)
router.delete('/:id', playlistController.delete)

module.exports = router