import assert from 'assert'
import { 
  toJson,
  toObject,
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

const port = parseInt( process.env.WORK_ORDER_PORT as string ) ?? 3000
const host = process.env.WORK_ORDER_BIND_IP ?? '127.0.0.1'
const rootUrl = `http://${host}:${port}`

const registerUrl = rootUrl + '/register'
const loginUrl = rootUrl + '/login'
const addWorkOrderUrl = rootUrl + '/workorders/add'
const saveWorkOrderUrl = rootUrl + '/workorders/save'
const saveUserUrl = rootUrl + '/users/save'
const getWorkOrderByNumberUrl = rootUrl + '/workorders/'
const listWorkOrdersByUserIdUrl = rootUrl + '/workorders/user/'

const get = 'GET'
const post = 'POST'
const headers: { [key: string]: string } = {
  'Content-Type': 'application/json charset=utf-8'
}

const serviceProviderEmail = process.env.WORK_ORDER_SERVICE_PROVIDER_EMAIL as string
const homeownerEmail = process.env.WORK_ORDER_HOMEOWNER_EMAIL as string
let serviceProviderPin = ''
let homeownerPin = ''  
let serviceProvidersLoggedIn = new LoggedIn(User.empty(), [], [])
let homeownerLoggedIn = new LoggedIn(User.empty(), [], [])
let workOrder: WorkOrder

test()

function test() {
  console.log('*** running integration test ...')

  // register
  register( new Register('serviceprovider', "fred flintstone,", serviceProviderEmail, "123 stone st"), true )
  register( new Register('homeowner', "barney rubble,", homeownerEmail, "125 stone st"), false )

  // login
  login( new Login(serviceProviderEmail, serviceProviderPin), true )
  login( new Login(homeownerEmail, homeownerPin), false )

  // work order add and save
  workOrder = new WorkOrder(0, homeownerLoggedIn.user.id, serviceProvidersLoggedIn.user.id, 'sprinkler', 'broken', '', '', new Date().toISOString(), '')
  addWorkOrder( new SaveWorkOrder(workOrder) )
  
  workOrder.resolution = 'fixed'
  workOrder.closed = new Date().toISOString()
  saveWorkOrder( new SaveWorkOrder(workOrder) )

  // user save
  saveUser( new SaveUser(serviceProvidersLoggedIn.user) )
  saveUser( new SaveUser(homeownerLoggedIn.user) )

  // work order get and list
  getWorkOrderByNumber(workOrder.number)
  listWorkOrdersByUserId(homeownerLoggedIn.user.id)
  
  console.log('*** integration test complete!')
}

async function call<T, R>(url: string,
                          method: string,
                          headers: { [key: string]: string },
                          entity: FormData | T,
                          fault: () => R): Promise<R> {
  let result: R
  let init
  if (method === get) {
    init = {
      method: method,
      headers: headers
    }
  } else {
    init = {
      method: method,
      headers: headers,
      body: entity instanceof FormData ? entity : toJson(entity)
    }
  }
  const response = await fetch(url, init)
  if (response.ok) {
    result = toObject( await response.json() as string )
  } else {
    console.log('*** fetch:call error: url: %s, method: %s, headers: %o, entity: %o, status code: %s status text: %s', url, method, headers, entity, response.status, response.statusText)
    result = fault()
  }
  console.log('*** fetch:call result: url: %s result: %o', url, result)
  return result
}

function register(register: Register, setServiceProviderPin: boolean): void {
  call(registerUrl, post, headers, register, () => Registered.fail('Register failed.')).then(registered => {
    assert(registered.success, `Registered error: ${registered.error}`)
    assert(registered.pin.length === 7, `Pin length is invalid: ${registered.pin}`)
    if (setServiceProviderPin){
      serviceProviderPin = registered.pin
    } else {
      homeownerPin = registered.pin
    }
  })
}

function login(login: Login, setServiceProviderLoggedIn: boolean): void {
  call(loginUrl, post, headers, login, () => LoggedIn.fail('Login failed.')).then(loggedIn => {
    assert(loggedIn.success, `LoggedIn error: ${loggedIn.error}`)
    if (setServiceProviderLoggedIn) {
      serviceProvidersLoggedIn = loggedIn
    } else {
      homeownerLoggedIn = loggedIn
    }
  })
}

function addWorkOrder(saveWorkOrder: SaveWorkOrder): void {
  call(addWorkOrderUrl, post, headers, saveWorkOrder, () => WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Add work order failed!')).then(workOrderSaved => {
    assert(workOrderSaved.success, `WorkOrderSaved error: ${workOrderSaved.error}`)
    workOrder.number = workOrderSaved.number
  })
}

function saveWorkOrder(saveWorkOrder: SaveWorkOrder): void {
  call(saveWorkOrderUrl, post, headers, saveWorkOrder, () => WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Save work order failed!')).then(workOrderSaved => {
    assert(workOrderSaved.success, `WorkOrderSaved error: ${workOrderSaved.error}`)
  })
}

function saveUser(saveUser: SaveUser): void {
  call(saveUserUrl, post, headers, saveUser, () => UserSaved.fail(saveUser.user.id, 'Save user failed.')).then(userSaved => {
    assert(userSaved.success, `UserSaved error: ${userSaved.error}`)
  })
}

function getWorkOrderByNumber(number: number): void {
  call(getWorkOrderByNumberUrl + number, get, headers, {}, () => WorkOrderSelected.fail(number, `Get work order by number failed for: ${number}!`)).then(workOrderSelected => {
    assert(workOrderSelected.success, `WorkOrderSelected error: ${workOrderSelected.error}`)
  })
}

function listWorkOrdersByUserId(id: number): void {
  call(listWorkOrdersByUserIdUrl + id, get, headers, {}, () => WorkOrdersListed.fail(id, `List work orders by user id failed for: ${id}!`)).then(workOrdersListed => {
    assert(workOrdersListed.success, `WorkOrders error: ${workOrdersListed.error}`)
  })
}