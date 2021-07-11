const {DeviceGroup} = require('../models/models')

class DeviceGroupController {
  async create(req, res) {
    const {name} = req.body
    const deviceGroup = await DeviceGroup.create({name: name})
    return res.json(deviceGroup)
  }
  
  async getAllGroups(req, res) {
    const deviceGroups = await DeviceGroup.findAll()
    return res.json(deviceGroups)
  }
  
  async getOneGroup(req, res) {
    const {id} = req.params
    const deviceGroup = await DeviceGroup.findOne({where: {id}})
    return res.json(deviceGroup)
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