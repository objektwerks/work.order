import store from './server/store.js'
import emailer from './server/emailer.js'
import service from './server/service.js'
import handler from './server/handler.js'
import router from './server/router.js'

store()
emailer()
service()
handler()
router()