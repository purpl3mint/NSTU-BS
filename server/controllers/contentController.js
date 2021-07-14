const uuid = require('uuid')
const {Content} = require('../models/models')

class ContentController {
  async create(req, res) {
    const {name, author_id} = req.body
    const source = uuid.v4() + ".src"
    const link = uuid.v4() + ".mp4"
    const date_upload = new Date()
    const date_last_change = new Date()

    const content = await Content.create({
      name: name,
      source: source,
      link: link,
      date_upload: date_upload,
      date_last_change: date_last_change,
      is_approved: false,
      author_id: author_id
    })

    return res.json(content)
  }
  
  async approving(req, res) {
    const {id} = req.body

    const content = await Content.findOne({where: {id}})

    content.is_approved = true
    const isSucceed = await content.save()
    
    return res.json(isSucceed)
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