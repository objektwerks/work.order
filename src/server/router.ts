import compression from 'compression'
import express, { Express } from 'express'
import { Server } from 'http'
import { imagesDir, imagesStore } from './images.js'
import * as handler from './handler.js'
import { toObject } from './entity.js'

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
  router = express()
  router.use(express.static('client'))
  router.use(express.static(imagesDir))
  router.use(compression())
  router.use(express.json())

  router.post('/register', (request, response) => {
    handler.register( request.body ).then(registered => response.json(registered))
  })
  
  router.post('/login', (request, response) => {
    handler.login( request.body ).then(loggedIn => response.json(loggedIn))
  })
  
  router.post('/workorders/add', imagesStore.single('image'), (request, response) => {
    handler.addWorkOrder( toObject(request.body.saveWorkOrderAsJson) ).then(workOrderSaved => response.json(workOrderSaved))
  })

  router.post('/workorders/save', imagesStore.single('image'), (request, response) => {
    handler.saveWorkOrder( toObject(request.body.saveWorkOrderAsJson) ).then(workOrderSaved => response.json(workOrderSaved))
  })

  router.post('/workorders', (request, response) => {
    handler.listWorkOrders( request.body ).then(workOrdersListed => response.json(workOrdersListed))
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