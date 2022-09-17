import assert from 'assert'
import * as handler from '../server/handler.js'
import {
  homeowner,
  serviceProvider,
  Login,
  Register,
  SaveUser,
  WorkOrder,
  SaveWorkOrder,
  ListWorkOrders
} from '../server/entity.js'

const serviceProviderEmail = process.env.WORK_ORDER_SERVICE_PROVIDER_EMAIL as string
const homeownerEmail = process.env.WORK_ORDER_HOME_OWNER_EMAIL as string

test()

async function test() {
  console.log('*** running integration test ...')

  // register
  const serviceProviderRegistered = await handler.register(new Register(serviceProvider, "lawncare,", serviceProviderEmail, "123 green st"))
  const homeownerRegistered = await handler.register(new Register(homeowner, "fred flintstone,", homeownerEmail, "345 stone st"))
  assert(serviceProviderRegistered.success, 'register service provider failed')
  assert(homeownerRegistered.success, 'register homeowner failed')

  // login
  const serviceProviderLoggedIn = await handler.login(new Login(serviceProviderEmail, serviceProviderRegistered.pin))
  const homeownerLoggedIn = await handler.login(new Login(homeownerEmail, homeownerRegistered.pin))
  assert(serviceProviderLoggedIn.success, 'login service provider failed')
  assert(serviceProviderLoggedIn.user.pin === serviceProviderRegistered.pin, 'logged in service provider pin is invalid: ' + serviceProviderRegistered.pin)
  assert(homeownerLoggedIn.success, 'login homeowner failed')
  assert(homeownerLoggedIn.user.pin === homeownerRegistered.pin, 'logged in homeowner pin is invalid: ' + homeownerRegistered.pin)

  // work order add
  const workOrder = new WorkOrder(0, homeownerLoggedIn.user.id, serviceProviderLoggedIn.user.id, 'sprinkler', 'broken', '', '', new Date().toISOString(), '')
  const workOrderAdded = await handler.addWorkOrder(new SaveWorkOrder(workOrder, homeownerLoggedIn.user.license))
  workOrder.number = workOrderAdded.number
  assert(workOrderAdded.success, 'add work order failed')
  assert(workOrderAdded.number > 0, 'work order number invalid: ' + workOrderAdded.number)

  // work order save
  workOrder.resolution = 'fixed'
  workOrder.closed = new Date().toISOString()
  const workOrderSaved = await handler.saveWorkOrder(new SaveWorkOrder(workOrder, homeownerLoggedIn.user.license))
  assert(workOrderSaved.success, 'save work order failed')

  // user save
  const serviceProviderUserSaved = await handler.saveUser(new SaveUser(serviceProviderLoggedIn.user))
  const homeownerUserSaved = await handler.saveUser(new SaveUser(homeownerLoggedIn.user))
  assert(serviceProviderUserSaved.success, 'save service provider user failed')
  assert(homeownerUserSaved.success, 'save homeowner user failed')

  // work orders list
  const workOrdersListed = await handler.listWorkOrders(new ListWorkOrders(homeownerLoggedIn.user.id, homeownerLoggedIn.user.license))
  assert(workOrdersListed.success, 'list work orders failed')
  assert(workOrdersListed.workOrders.length === 1, 'list work orders size !== 1')
  
  console.log('*** integration test complete!')

  // WARNING: Don't add a process.exit() here! Doing so will prevent the emailer for sending out emails.
}