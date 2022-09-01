import { images, imagesDir, ifNotExistsMakeDir } from './images.js'
import * as service from './service.js'
import compression from 'compression'
import express, { Express } from 'express'
import { Server } from 'http'

const port = parseInt( process.env.WORK_ORDER_PORT as string ) ?? 3000
const host = process.env.WORK_ORDER_BIND_IP ?? '127.0.0.1'

let router: Express
let server: Server

function shutdown(signal: string): void {
  server.close(() => {
    console.log(`*** [${signal}] server and router shutting down ...`)
    service.shutdown()
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

  router.post('/register', async (request, response) => {
    response.json( await service.register( request.body ) )
  })
  
  router.post('/login', async (request, response) => {
    response.json( await service.login( request.body ) )
  })
  
  router.post('/workorders/add', async (request, response) => {
    response.json( await service.addWorkOrder( request.body ) )
  })

  router.post('/workorders/save', async (request, response) => {
    response.json( await service.saveWorkOrder( request.body ) )
  })

  router.get('/workorders/user/:id', async (request, response) => {
    response.json( await service.listWorkOrdersByUserId( parseInt(request.params.id) ) )
  })
  
  router.get('/workorders/:number', async (request, response) => {
    response.json( await service.getWorkOrderByNumber( parseInt(request.params.number) ) )
  })
  
  router.post('/users/save', async (request, response) => {
    response.json( await service.saveUser( request.body ) )
  })

  router.post('/image/save', images.single('image'), async (request, response) => {
    response.json( await service.saveImageUrl(request.body.number, request.body.url) )
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