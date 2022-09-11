import assert from 'assert'
import * as handler from '../server/handler.js'
import { 
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
  const serviceProviderRegistered = await handler.register(new Register('serviceprovider', "fred flintstone,", serviceProviderEmail, "123 stone st"))
  const homeownerRegistered = await handler.register(new Register('homeowner', "barney rubble,", homeownerEmail, "125 stone st"))
  assert(serviceProviderRegistered.success)
  assert(homeownerRegistered.success)

  // login
  const serviceProviderLoggedIn = await handler.login(new Login(serviceProviderEmail, serviceProviderRegistered.pin))
  const homeownerLoggedIn = await handler.login(new Login(homeownerEmail, homeownerRegistered.pin))
  assert(serviceProviderLoggedIn.success)
  assert(homeownerLoggedIn.success)

  // work order add
  const workOrder = new WorkOrder(0, homeownerLoggedIn.user.id, serviceProviderLoggedIn.user.id, 'sprinkler', 'broken', '', '', new Date().toISOString(), '')
  const workOrderAdded = await handler.addWorkOrder(new SaveWorkOrder(workOrder, homeownerLoggedIn.user.license))
  workOrder.number = workOrderAdded.number
  assert(workOrderAdded.success)
  
  // work order save
  workOrder.resolution = 'fixed'
  workOrder.closed = new Date().toISOString()
  const workOrderSaved = await handler.saveWorkOrder(new SaveWorkOrder(workOrder, homeownerLoggedIn.user.license))
  assert(workOrderSaved.success)

  // user save
  const serviceProviderUserSaved = await handler.saveUser(new SaveUser(serviceProviderLoggedIn.user))
  const homeownerUserSaved = await handler.saveUser(new SaveUser(homeownerLoggedIn.user))
  assert(serviceProviderUserSaved.success)
  assert(homeownerUserSaved.success)

  // work orders list
  const workOrdersListed = await handler.listWorkOrders(new ListWorkOrders(homeownerLoggedIn.user.id, homeownerLoggedIn.user.license))
  assert(workOrdersListed.success)
  
  console.log('*** integration test complete!')

  // WARNING: Don't add a process.exit() here! Doing so will prevent the emailer for sending out emails.
}