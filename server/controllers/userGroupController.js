const {UserGroup, DeviceGroup, User, UserControlDeviceGroup} = require('../models/models')
const apiError = require('../error/apiError')

class UserGroupController {
  async create(req, res) {
    const {name} = req.body
    const userGroup = await UserGroup.create({name: name})

    return res.json(userGroup)
  }
  
  async addDeviceGroup(req, res) {
    const {name, devicegroupId} = req.body
    const userGroup = await UserGroup.findOne({where: {name: name}})
    const deviceGroup = await DeviceGroup.findByPk(devicegroupId)

    const connectingResponce = await UserControlDeviceGroup.create({
      devices_id: devicegroupId,
      users_id: userGroup.id
    })

    return res.json('Группа успешно сопоставлена')
  }
  
  async getAllGroups(req, res) {
    const userGroups = await UserGroup.findAll()
    return res.json(userGroups)
  }
  
  async getOneGroup(req, res) {
    const {id} = req.params
    const userGroup = await UserGroup.findOne({where: {id}})
    return res.json(userGroup)
  }
  
  async delete(req, res) {
    let message = ''
    const {id} = req.params
    const deletedUserGroup = await UserGroup.destroy({where: {id}})

    if (deletedUserGroup) {
      message = `Группа с id=${id} успешно удалена`
    } else {
      message = `Группы с id=${id} не существует`
    }
    
    return res.json(message)
  }
}

module.exports = new UserGroupController()