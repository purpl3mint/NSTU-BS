const apiError = require('../error/apiError')

class UserController {
  async registration(req, res) {
    return res.json('Функция регистрации пользователей в стадии разработки')
  }
  
  async login(req, res) {
    return res.json('Функция входа пользователей в стадии разработки')
  }
  
  async auth(req, res, next) {
    return res.json('Функция проверки пользователей в стадии разработки')

    /*
    const {id} = req.query
    if (!id) {
      return next(apiError.badRequest('Не задан Id'))
    }
    res.json(id)
    */
  }
  
  async editGroup(req, res) {
    return res.json('Функция изменения групп пользователей в стадии разработки')
  }
  
  async delete(req, res) {
    return res.json('Функция удаления пользователей в стадии разработки')
  }
}

module.exports = new UserController()