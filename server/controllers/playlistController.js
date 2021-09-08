const {Playlist, ContentInPlaylist, Content, DeviceGroup, Schedule} = require('../models/models')

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
      contentId: content_id
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

    const content = await ContentInPlaylist.findAll({
      where : {
        playlist_id: id
      },
      include: {
        model: Content
      }
    })

    return res.json(content)
  }

  async getContentByLink(req, res) {
    const {link} = req.params
    const now = new Date()

    //Get Device Group Id by its link
    const deviceGroup = await DeviceGroup.findOne({where: {
      outer_link: link
    }})

    //Get all schedules for chosen group
    const schedules = await Schedule.findAll({where: {
      devicegroupId: deviceGroup.id
      }, include: {
        model: Playlist
    }})
    
    //Parsing time for all schedule records
    const schedulesTimeParsed = schedules.map(function(s) {
      const timeStartComponents = s.time_start.split(':')
      let timeStart = new Date()
      timeStart.setHours(timeStartComponents[0])
      timeStart.setMinutes(timeStartComponents[1])
      timeStart.setSeconds(timeStartComponents[2])

      const timeEndComponents = s.time_end.split(':')
      let timeEnd = new Date()
      timeEnd.setHours(timeEndComponents[0])
      timeEnd.setMinutes(timeEndComponents[1])
      timeEnd.setSeconds(timeEndComponents[2])

      if (timeStart > timeEnd)
        timeEnd.setDate(timeEnd.getDate() + 1)

      return {timeStart, timeEnd}
    })

    function chooseCurrentPlaylist() {
      if (schedules.length === 1)
        return {
          chosenPlaylist: schedules[0].playlistId,
          timeEnd: schedulesTimeParsed[0].timeEnd
        }
      else {
        for(let i = 0; i < schedules.length; i++) {
          if (schedulesTimeParsed[i].timeStart < now && schedulesTimeParsed[i].timeEnd > now)
            return {
              chosenPlaylist: schedules[i].playlistId,
              timeEnd: schedulesTimeParsed[i].timeEnd
            }
        }
      }

      return {
        chosenPlaylist: 2,
        timeEnd: null
      }
    }

    const {chosenPlaylist, timeEnd} = chooseCurrentPlaylist()

    const content = await ContentInPlaylist.findAll({
      where : {
        playlist_id: chosenPlaylist
      },
      include: {
        model: Content
      }
    })

    return res.json( {content, timeEnd} )
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