const {Content} = require('../models/models')

class ContentController {
  async create(req, res) {
    const {name} = req.body
    const source = "random_link_src" + new Date()
    const link = "random_link_result" + new Date()
    const date_creation = new Date()
    const date_last_change = new Date()

    const content = await Content.create({
      name: name,
      source: source,
      link: link,
      date_creation: date_creation,
      date_last_change: date_last_change,
      is_approved: false
    })

    return res.json(content)
  }
  
  async approving(req, res) {
    return res.json("Функция подтверждения в стадии разработки")
  }
  
  async getAllContent(req, res) {
    const contents = await Content.findAll()

    return res.json(contents)
  }
  
  async getOneContent(req, res) {
    const {id} = req.params
    const content = await Content.findOne({where: {id}})

    return res.json(content)
  }
  
  async delete(req, res) {
    let message = ''
    const {id} = req.params
    const deletedContent = await Content.destroy({where: {id}})

    if (deletedContent) {
      message = `Запись с id=${id} успешно удалена`
    } else {
      message = `Запись с id=${id} не найдена`
    }

    return res.json(message)
  }
}

module.exports = new ContentController()