import assert from 'assert'
import * as service from '../server/service.js'
import { 
  Login,
  LoggedIn,
  Register,
  Registered,
  User,
  SaveUser,
  UserSaved,
  WorkOrder,
  SaveWorkOrder,
  WorkOrderSaved,
  WorkOrdersListed,
  WorkOrderSelected
} from '../server/entity.js'

const serviceProviderEmail = process.env.WORK_ORDER_SERVICE_PROVIDER_EMAIL as string
const homeownerEmail = process.env.WORK_ORDER_HOMEOWNER_EMAIL as string

test()

function test() {
  console.log('*** running integration test ...')

  // register
  const serviceProviderRegister = new Register('serviceprovider', "fred flintstone,", serviceProviderEmail, "123 stone st")
  const homeownerRegister = new Register('homeowner', "barney rubble,", homeownerEmail, "125 stone st")

  // login
  const serviceProviderLogin = new Login(serviceProviderEmail, 'serviceProviderPin')
  const homeownerLogin = new Login(homeownerEmail, 'homeownerPin')

  // work order add
  workOrder = new WorkOrder(0, homeownerLoggedIn.user.id, serviceProvidersLoggedIn.user.id, 'sprinkler', 'broken', '', '', new Date().toISOString(), '')
  
  // work order save
  workOrder.resolution = 'fixed'
  workOrder.closed = new Date().toISOString()

  // user save
  const serviceProviderUser = new SaveUser(serviceProvidersLoggedIn.user)
  const homeownerUser = new SaveUser(homeownerLoggedIn.user)

  // work order get
  getWorkOrderByNumber(workOrder.number)

  // work orders list
  listWorkOrdersByUserId(homeownerLoggedIn.user.id)
  
  console.log('*** integration test complete!')
}