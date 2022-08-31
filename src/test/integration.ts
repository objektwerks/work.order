import assert from 'assert'
import * as service from '../server/service.js'
import { 
  Login,
  Register,
  SaveUser,
  WorkOrder,
  SaveWorkOrder
} from '../server/entity.js'

const serviceProviderEmail = process.env.WORK_ORDER_SERVICE_PROVIDER_EMAIL as string
const homeownerEmail = process.env.WORK_ORDER_HOME_OWNER_EMAIL as string

test()

function test() {
  console.log('*** running integration test ...')

  // register
  const serviceProviderRegistered = service.register(new Register('serviceprovider', "fred flintstone,", serviceProviderEmail, "123 stone st"))
  const homeownerRegistered = service.register(new Register('homeowner', "barney rubble,", homeownerEmail, "125 stone st"))
  assert(serviceProviderRegistered.success)
  assert(homeownerRegistered.success)

  // login
  const serviceProviderLoggedIn = service.login(new Login(serviceProviderEmail, serviceProviderRegistered.pin))
  const homeownerLoggedIn = service.login(new Login(homeownerEmail, homeownerRegistered.pin))
  assert(serviceProviderLoggedIn.success)
  assert(homeownerLoggedIn.success)

  // work order add
  const workOrder = new WorkOrder(0, homeownerLoggedIn.user.id, serviceProviderLoggedIn.user.id, 'sprinkler', 'broken', '', '', new Date().toISOString(), '')
  const workOrderAdded = service.addWorkOrder(new SaveWorkOrder(workOrder))
  assert(workOrderAdded.success)

  // work order save
  workOrder.resolution = 'fixed'
  workOrder.closed = new Date().toISOString()
  const workOrderSaved = service.saveWorkOrder(new SaveWorkOrder(workOrder))
  assert(workOrderSaved.success)

  // user save
  const serviceProviderUserSaved = service.saveUser(new SaveUser(serviceProviderLoggedIn.user))
  const homeownerUserSaved = service.saveUser(new SaveUser(homeownerLoggedIn.user))
  assert(serviceProviderUserSaved.success)
  assert(homeownerUserSaved.success)

  // work order get
  const workOrderSelected = service.getWorkOrderByNumber(workOrder.number)
  assert(workOrderSelected.success)

  // work orders list
  const workOrdersListed = service.listWorkOrdersByUserId(homeownerLoggedIn.user.id)
  assert(workOrdersListed.success)
  
  console.log('*** integration test complete!')
}