import compression from 'compression'
import express, { Express } from 'express'
import { Server } from 'http'
import { images, imagesDir, ifNotExistsMakeDir } from './images.js'
import * as handler from './handler.js'
import { toObject, SaveWorkOrder } from './entity.js'

const port = parseInt( process.env.WORK_ORDER_PORT as string ) ?? 3000
const host = process.env.WORK_ORDER_BIND_IP ?? '127.0.0.1'

let router: Express
let server: Server

function shutdown(signal: string): void {
  server.close(() => {
    console.log(`*** [${signal}] server and router shutting down ...`)
    handler.shutdown()
    console.log('*** server and router shutdown.')
    process.exit()
  })
}

export default () => {
  ifNotExistsMakeDir(imagesDir)

  router = express()
  router.use(express.static('client'))
  router.use(express.static('images'))
  router.use(compression())
  router.use(express.json())
  router.use(express.urlencoded({ extended: true }))

  router.post('/register', (request, response) => {
    handler.register( request.body ).then(registered => response.json(registered))
  })
  
  router.post('/login', (request, response) => {
    handler.login( request.body ).then(loggedIn => response.json(loggedIn))
  })
  
  router.post('/workorders/add', images.single('image'), (request, response) => {
    handler.addWorkOrder( new SaveWorkOrder( toObject(request.body.workOrderAsJson) ) ).then(workOrderSaved => response.json(workOrderSaved))
  })

  router.post('/workorders/save', images.single('image'), (request, response) => {
    handler.saveWorkOrder( new SaveWorkOrder( toObject(request.body.workOrderAsJson) ) ).then(workOrderSaved => response.json(workOrderSaved))
  })

  router.get('/workorders/user/:id', (request, response) => {
    handler.listWorkOrdersByUserId( parseInt(request.params.id) ).then(workOrdersListed => response.json(workOrdersListed))
  })
  
  router.get('/workorders/:number', (request, response) => {
    handler.getWorkOrderByNumber( parseInt(request.params.number) ).then(workOrderSelected => response.json(workOrderSelected))
  })
  
  router.post('/users/save', (request, response) => {
    handler.saveUser( request.body ).then(userSaved => response.json(userSaved))
  })
  
  server = router.listen(port, host, () =>
    console.log(`*** server listening on http://${host}:${port}/`)
  )
  
  process.on('SIGINT', () => {
    shutdown('sigint')
  })
  
  process.on('SIGTERM', () => {
    shutdown('sigterm')
  })
}