const {UserGroup} = require('../models/models')
const apiError = require('../error/apiError')

class UserGroupController {
  async create(req, res) {
    const {name, restrictions} = req.body
    const userGroup = await UserGroup.create({name: name, restrictions: restrictions})
    return res.json(userGroup)
  }
  
  async addDeviceGroup(req, res) {
    return res.json('Функция добавления группы устройств в стадии разработки')
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