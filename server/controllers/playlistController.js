const {Playlist} = require('../models/models')
const {ContentInPlaylist} = require('../models/models')

class PlaylistController {
  async create(req, res) {
    const {name} = req.body
    const deviceGroup = await Playlist.create({name: name})
    return res.json(deviceGroup)
  }
  
  async addContent(req, res) {
    const {content_id, playlist_id, position} = req.body

    const addedContent = await ContentInPlaylist.create({
      position: position,
      playlist_id: playlist_id,
      content_id: content_id
    })

    return res.json(addedContent)
  }

  async deleteContent(req, res) {

    return res.json("Фнукция находится в разработке")
  }
  
  async edit(req, res) {
    const {id} = req.params
    const {name} = req.body

    const editingPlaylist = await Playlist.findByPk(id)

    name ? editingPlaylist.name = name : true

    const isSucceed = await editingPlaylist.save()

    return res.json(isSucceed)
  }
  
  async getAllPlaylists(req, res) {
    const playlists = await Playlist.findAll()
    return res.json(playlists)
  }
  
  async getOnePlaylist(req, res) {
    const {id} = req.params
    const playlist = await Playlist.findOne({where: {id}})
    return res.json(playlist)
  }
  
  async delete(req, res) {
    let message = ''
    const {id} = req.params
    const deletedPlaylist = await Playlist.destroy({where: {id}})

    if (deletedPlaylist) {
      message = `Плейлист с id=${id} успешно удален`
    }
    else {
      message = `Плейлист с id=${id} не найден`
    }

    return res.json(message)
  }
}

module.exports = new PlaylistController()