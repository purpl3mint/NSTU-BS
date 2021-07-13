const bcrypt = require('bcrypt')
const {User} = require('../models/models')
const ApiError = require('../error/apiError')

class UserController {
  async registration(req, res, next) {
    const {username, password} = req.body

    if (!username || !password) {
      return next(ApiError.badRequest('Некорректный логин или пароль'))
    }

    const candidate = await User.findOne({where: {username}})

    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({
      username: username,
      password: hashPassword
    })

    const token = jwt.sign(
      {id: user.id, username: user.username}, 
      process.env.SECRET_KEY, 
      {expiresIn: '24h'})

    return res.json({token})
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