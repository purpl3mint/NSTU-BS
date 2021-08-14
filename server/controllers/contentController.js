const uuid = require('uuid')
const path = require('path')
const { unlink } = require('fs')
const {Content} = require('../models/models')

class ContentController {
  async create(req, res) {
    const {name, author_id, filetype, outerLink} = req.body
    const date_upload = new Date()
    const date_last_change = new Date()

    let message = ""

    let newFile = null;
    let filepath = "";
    let source = "";
    let link = "";

    if (filetype === ".mp4") {
      const {file} = req.files
      newFile = file
      filepath = uuid.v4()
      source = "static"
      link = filepath + ".mp4"
    } else if (filetype === "youtube") {
      source = filetype
      link = outerLink
    }

    if (newFile){
      newFile.mv(path.resolve(__dirname, '..', 'static', link))
    }

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
    
    isSucceed ? message = "Контент успешно загружен" : message = "Контент не удалось сохранить"

    return res.json(message)
  }
  
  async getAllContent(req, res) {
    const contents = await Content.findAll()

    return res.json(contents)
  }
  
  async getOneContent(req, res) {
    const {id} = req.params
    const content = await Content.findOne({where: {id}})

    console.log(content);

    return res.json(content)
  }
  
  async delete(req, res) {
    let message = ''
    const {id} = req.params
    const data = await Content.findByPk(id)

    unlink(path.resolve(__dirname, '..', 'static', data.link), (err) => {
      if (err) throw err
      console.log('Файл был успешно удален');
    })

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