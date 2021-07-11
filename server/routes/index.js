const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const userGroupRouter = require('./userGroupRouter')
const deviceGroupRouter = require('./deviceGroupRouter')
const contentRouter = require('./contentRouter')
const playlistRouter = require('./playlistRouter')


router.use('/user', userRouter)
router.use('/usergroup', userGroupRouter)
router.use('/devicegroup', deviceGroupRouter)
router.use('/content', contentRouter)
router.use('/playlist', playlistRouter)

module.exports = router