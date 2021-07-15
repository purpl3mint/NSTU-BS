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

  async editContent(req, res) {
    const {playlist_id, position_old, position_new} = req.body

    const editingContent = await ContentInPlaylist.findOne({where: {
      playlist_id: playlist_id,
      position: position_old
    }})

    if (!editingContent){
      return res.json("Такой записи не найдено")
    }
    
    const collision = await ContentInPlaylist.findOne({where: {
      playlist_id: playlist_id,
      position: position_new
    }})

    if (!collision){
      editingContent.position = position_new
      const isSucceed = await editingContent.save()

      if (isSucceed){
        return res.json(isSucceed)
      } else {
        return res.json("Что-то пошло не так")
      }

    } else {
      collision.position = -1
      await collision.save()
      
      editingContent.position = position_new
      await editingContent.save()

      collision.position = position_old
      await collision.save()

      return res.json("Изменение прошло успешно")
    }

    
  }

  async getContent(req, res) {
    const {id} = req.params

    const content = await ContentInPlaylist.findAll({where : {
      playlist_id: id
    }})

    return res.json(content)
  }

  async deleteContent(req, res) {
    const {id} = req.params

    const result = await ContentInPlaylist.destroy({where: {id}})

    if (result) {
      return res.json("Запись была успешно удалена из плейлиста")
    } else {
      return res.json("Запись не удалось удалить из плейлиста")
    }
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