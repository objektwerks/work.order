import store from './server/store.js'
import emailer from './server/emailer.js'
import service from './server/service.js'
import handler from './server/handler.js'
import images from './server/images.js'
import router from './server/router.js'
import { logger } from './server/logger.js'

store()
emailer()
service()
handler()
images()
router()

process.on('uncaughtException', (error) => {
  logger.error(error, '*** server uncaught exception thrown. terminating server.')
  process.exit(1)
})

process.on('unhandledRejection', (error) => {
  logger.error(error, '*** server unhandled rejection thrown. terminating server.')
  process.exit(1)
})