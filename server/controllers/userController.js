const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const ApiError = require('../error/apiError')

class UserController {
  async registration(req, res, next) {
    
    const {username, password, level} = req.body

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
      password: hashPassword,
      level: level
    })

    const token = jwt.sign(
      {id: user.id, username: user.username, level: user.level}, 
      process.env.SECRET_KEY, 
      {expiresIn: '24h'})

    return res.json({token})
  }
  
  async login(req, res, next) {
    const {username, password} = req.body

    if (!username)
      return next(ApiError.badRequest('Было передано пустое имя пользователя'))

    if(!password)
      return next(ApiError.badRequest('Был передан пустой пароль'))

    const user = await User.findOne({where: {username}})

    if (!user)
      return next(ApiError.internal('Такого пользователя не существует'))

    let comparePassword = bcrypt.compareSync(password, user.password)

    if (!comparePassword)
      return next(ApiError.badRequest('Указан неверный пароль'))

    const token = jwt.sign(
      {id: user.id, username: user.username, level: user.level}, 
      process.env.SECRET_KEY, 
      {expiresIn: '24h'})

    return res.json(token)
  }
  
  async auth(req, res, next) {
    res.json({message: 'Проверка работает'})
  }
  
  async setGroup(req, res) {
    const {id} = req.params
    const {group_id} = req.body

    const user = await User.findByPk(id)
    user.group_id = group_id

    const isSucceed = await user.save()

    return res.json({isSucceed})
  }

  async getAll(req, res) {
    const users = await User.findAll()

    return res.json({users})
  }
  
  async getById(req, res) {
    const {id} = req.params

    const user = await User.findByPk(id)

    return res.json({user})
  }

  async delete(req, res) {
    const {id} = req.params
    let message = ''

    const deletedUser = await User.destroy({where: {id}})

    if (deletedUser) {
      message = `Пользователь с id=${id} был успешно удален`
    } else {
      message = `Пользователь с id=${id} не найден`
    }

    return res.json({message})
  }
}

module.exports = new UserController()