const {DeviceGroup} = require('../models/models')

class DeviceGroupController {
  async create(req, res) {
    const {name} = req.body
    const outer_link = name + '.html'

    const deviceGroup = await DeviceGroup.create({name: name, outer_link: outer_link})
    
    return res.json(deviceGroup)
  }
  
  async getAllGroups(req, res) {
    const deviceGroups = await DeviceGroup.findAll()
    return res.json(deviceGroups)
  }
  
  async getOneGroup(req, res) {
    const {id} = req.params
    const deviceGroup = await DeviceGroup.findByPk(id)
    return res.json(deviceGroup)
  }

  async getLink(req, res) {
    const {id} = req.params
    const deviceGroup = await DeviceGroup.findByPk(id)

    return res.json(deviceGroup.outer_link)
  }
  
  async delete(req, res) {
    let message = ''
    const {id} = req.params
    const deletedDeviceGroup = await DeviceGroup.destroy({where: {id}})

    if (deletedDeviceGroup) {
      message = `Группа с id=${id} успешно удалена`
    } else {
      message = `Группы с id=${id} не существует`
    }

    return res.json(message)
  }
}

module.exports = new DeviceGroupController()