const apiError = require('../error/apiError')

class UserController {
  async registration(req, res) {
    
  }
  
  async login(req, res) {

  }
  
  async auth(req, res, next) {
    const {id} = req.query
    if (!id) {
      return next(apiError.badRequest('Не задан Id'))
    }
    res.json(id)
  }
  
  async editGroup(req, res) {

  }
  
  async delete(req, res) {

  }
}

module.exports = new UserController()