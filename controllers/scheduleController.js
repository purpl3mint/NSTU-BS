const {Schedule, DeviceGroup, Playlist} = require('../models/models')

class ScheduleController {
    async create(req, res) {
        const {playlist_id, devices_id, time_start, time_end} = req.body

        const scheduleRecord = await Schedule.create({
            playlistId: playlist_id,
            devicegroupId: devices_id,
            time_start: time_start,
            time_end: time_end
        })

        return res.json(scheduleRecord)
    }

    async getAllSchedules(req, res) {
        let schedules = await Schedule.findAll({
            include: [{
                model: DeviceGroup
            }, {
                model: Playlist
            }]
        })

        return res.json(schedules)
    }

    async getScheduleById(req, res) {
        const {id} = req.params

        const scheduleRecord = await Schedule.findByPk(id)

        return res.json(scheduleRecord)
    }

    async getScheduleForDeviceGroup(req, res) {
        const {id} = req.params

        const schedule = await Schedule.findAll({where : {
            devicegroupId: id
        }})

        return res.json(schedule)
    }

    async edit(req, res) {
        const {id} = req.params
        const {time_start, time_end} = req.body

        const record = await Schedule.findByPk(id)

        time_start ? record.time_start = time_start : true
        time_end ? record.time_end = time_end : true

        const newRecord = await record.save()

        return res.json(newRecord)
    }

    async delete(req, res) {
        const {id} = req.params
        let message = ''

        const scheduleDeleted = await Schedule.destroy({where: {id}})

        if (scheduleDeleted) {
            message = `Запись с id=${id} успешно удалена`
        } else {
            message = `Запись с id=${id} успешно удалена`
        }

        return res.json(message)
    }
}

module.exports = new ScheduleController()