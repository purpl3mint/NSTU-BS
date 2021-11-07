const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const userGroupRouter = require('./userGroupRouter')
const deviceGroupRouter = require('./deviceGroupRouter')
const contentRouter = require('./contentRouter')
const playlistRouter = require('./playlistRouter')
const scheduleRouter = require('./scheduleRouter')


router.use('/user', userRouter)
router.use('/usergroup', userGroupRouter)
router.use('/devicegroup', deviceGroupRouter)
router.use('/content', contentRouter)
router.use('/playlist', playlistRouter)
router.use('/schedule', scheduleRouter)

module.exports = router