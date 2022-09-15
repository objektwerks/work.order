import fs from 'fs'
import store from './server/store.js'
import cache from './server/cache.js'
import emailer from './server/emailer.js'
import service from './server/service.js'
import handler from './server/handler.js'
import images from './server/images.js'
import router from './server/router.js'

const workOrderDir = process.env.WORK_ORDER_DIR ?? '$HOME/.workorder'
const imagesDir = process.env.WORK_ORDER_IMAGES_DIR ?? '$HOME/.workorder/images'
const logsDir = process.env.WORK_ORDER_LOGS_DIR ?? '$HOME/.workorder/logs'

if (!fs.existsSync(workOrderDir)) fs.mkdirSync(workOrderDir)
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir)
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir)

store()
cache()
emailer()
service()
handler()
images()
router()

process.on('uncaughtException', (error) => {
  console.error(error, '*** server uncaught exception thrown. exiting process.')
  process.exit(1)
})

process.on('unhandledRejection', (error) => {
  console.error(error, '*** server unhandled rejection thrown. exiting process.')
  process.exit(1)
})