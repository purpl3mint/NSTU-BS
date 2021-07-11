const {Playlist} = require('../models/models')

class PlaylistController {
  async create(req, res) {
    const {name} = req.body
    const deviceGroup = await Playlist.create({name: name})
    return res.json(deviceGroup)
  }
  
  async addContent(req, res) {
    return res.json({message: "Функция добавления контента в стадии разработки"})
  }
  
  async edit(req, res) {
    return res.json({message: "Функция редактирования плейлиста в стадии разработки"})
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