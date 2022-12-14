import fs from 'fs'
import assert from 'assert'
import store from '../server/store.js'
import cache from '../server/cache.js'
import emailer from '../server/emailer.js'
import service from '../server/service.js'
import * as handler from '../server/handler.js'
import {
  homeowner,
  serviceProvider,
  toJson,
  Login,
  Register,
  SaveUser,
  WorkOrder,
  SaveWorkOrder,
  ListWorkOrders
} from '../server/entity.js'

const workOrderDir = process.env.WORK_ORDER_DIR ?? process.env.HOME + '/.workorder'
const imagesDir = process.env.WORK_ORDER_IMAGES_DIR ?? process.env.HOME + '/.workorder/images'
const logsDir = process.env.WORK_ORDER_LOGS_DIR ?? process.env.HOME + '/.workorder/logs'

if (!fs.existsSync(workOrderDir)) fs.mkdirSync(workOrderDir)
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir)
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir)

const serviceProviderEmail = process.env.WORK_ORDER_SERVICE_PROVIDER_EMAIL as string
const homeownerEmail = process.env.WORK_ORDER_HOME_OWNER_EMAIL as string

// Due to random connect ECONNREFUSED ::1:3306 errors caused by Nodejs, not Mysql,
// this code mimics server.ts by calling default services called from handler. No,
// it doesn't make sense. Secret incantations to follow. :)
store()
cache()
emailer()
service()

test()

async function test() {
  console.log('*** running integration test ...')

  // register
  const serviceProviderRegistered = await handler.register(new Register(serviceProvider, 'lawncare service', serviceProviderEmail, '123 green rd'))
  const homeownerRegistered = await handler.register(new Register(homeowner, 'fred flintstone', homeownerEmail, '345 stone st'))
  assert(serviceProviderRegistered.success, `*** register service provider failed: ${toJson(serviceProviderRegistered)}`)
  assert(homeownerRegistered.success, `*** register homeowner failed: ${toJson(homeownerRegistered)}`)

  // login
  const serviceProviderLoggedIn = await handler.login(new Login(serviceProviderEmail, serviceProviderRegistered.pin))
  const homeownerLoggedIn = await handler.login(new Login(homeownerEmail, homeownerRegistered.pin))
  assert(serviceProviderLoggedIn.success, `*** login service provider failed: ${toJson(serviceProviderLoggedIn)}`)
  assert(serviceProviderLoggedIn.user.pin === serviceProviderRegistered.pin, `*** logged in service provider pin is invalid: ${serviceProviderRegistered.pin}`)
  assert(homeownerLoggedIn.success, `*** login homeowner failed: ${toJson(homeownerLoggedIn)}`)
  assert(homeownerLoggedIn.user.pin === homeownerRegistered.pin, `*** logged in homeowner pin is invalid: ${homeownerRegistered.pin}`)

  // work order add
  const workOrder = new WorkOrder(0, homeownerLoggedIn.user.id, serviceProviderLoggedIn.user.id, 'sprinkler', 'broken', '345 stone st', '', '', new Date().toISOString(), '')
  const workOrderAdded = await handler.addWorkOrder(new SaveWorkOrder(workOrder, homeownerLoggedIn.user.license))
  workOrder.number = workOrderAdded.number
  assert(workOrderAdded.success, `*** add work order failed: ${toJson(workOrderAdded)}`)
  assert(workOrderAdded.number > 0, `*** work order number invalid: ${workOrderAdded.number}`)

  // work order save
  workOrder.resolution = 'fixed'
  workOrder.closed = new Date().toISOString()
  const workOrderSaved = await handler.saveWorkOrder(new SaveWorkOrder(workOrder, serviceProviderLoggedIn.user.license))
  assert(workOrderSaved.success, `*** save work order failed: ${toJson(workOrderSaved)}`)

  // user save
  const serviceProviderUserSaved = await handler.saveUser(new SaveUser(serviceProviderLoggedIn.user))
  const homeownerUserSaved = await handler.saveUser(new SaveUser(homeownerLoggedIn.user))
  assert(serviceProviderUserSaved.success, `*** save service provider user failed: ${serviceProviderUserSaved}`)
  assert(homeownerUserSaved.success, `*** save homeowner user failed: ${toJson(homeownerUserSaved)}`)

  // work orders list
  const workOrdersListed = await handler.listWorkOrders(new ListWorkOrders(homeownerLoggedIn.user.id, homeownerLoggedIn.user.license))
  assert(workOrdersListed.success, `*** list work orders failed: ${toJson(workOrdersListed)}`)
  assert(workOrdersListed.workOrders.length === 1, '*** list work orders size !== 1')
  
  console.log('*** sending emails ...')

  setTimeout(function() {
    console.log('*** integration test complete!')
    process.exit()
  }, 5000)
}