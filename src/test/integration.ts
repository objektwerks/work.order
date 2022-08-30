import assert from 'assert'
import fetch from 'node-fetch'
import { 
  toJson,
  toObject,
  Login,
  LoggedIn,
  Register,
  Registered,
  User,
  UserSaved,
  WorkOrder,
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
let serviceProvidersModel = new LoggedIn(User.empty(), [], [])
let homeownerModel = new LoggedIn(User.empty(), [], [])

test()

function test() {
  console.log('*** running integration test ...')

  register( new Register('serviceprovider', "fred flintstone,", serviceProviderEmail, "123 stone st"), serviceProviderPin )
  setTimeout(
    () => { register( new Register('homeowner', "barney rubble,", homeownerEmail, "125 stone st"), homeownerPin ) },
    3000
  )

  setTimeout(
    () => { login( new Login(serviceProviderEmail, serviceProviderPin), serviceProvidersModel ) },
    4000
  )
  setTimeout(
    () => { login( new Login(homeownerEmail, homeownerPin), homeownerModel ) },
    5000
  )

  let workOrder = new WorkOrder(0, homeownerModel.user.id, serviceProvidersModel.user.id, 'sprinkler', 'broken', '', '', new Date().toISOString(), '')
  setTimeout(
    () => { addWorkOrder(workOrder) },
    6000
  )
  
  workOrder.resolution = 'fixed'
  workOrder.closed = new Date().toISOString()
  setTimeout(
    () => { saveWorkOrder(workOrder) },
    7000
  )
  setTimeout(
    () => { saveUser(homeownerModel.user) },
    8000
  )
  setTimeout(
    () => { getWorkOrderByNumber(workOrder.number) },
    9000
  )
  setTimeout(
    () => { listWorkOrdersByUserId(homeownerModel.user.id) },
    1000
  )
  
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

function register(registration: Register, target: string): void {
  call(registerUrl, post, headers, registration, () => Registered.fail('Register failed.')).then(registered => {
    assert(registered.success, `Registered error: ${registered.error}`)
    assert(registered.pin.length === 7, `Pin length is invalid: ${registered.pin}`)
    target = registered.pin
  })
}

function login(credentials: Login, target: LoggedIn): void {
  call(loginUrl, post, headers, credentials, () => LoggedIn.fail('Login failed.')).then(loggedIn => {
    assert(loggedIn.success, `LoggedIn error: ${loggedIn.error}`)
    target = loggedIn
  })
}

function addWorkOrder(workOrder: WorkOrder): void {
  call(addWorkOrderUrl, post, headers, workOrder, () => WorkOrderSaved.fail(workOrder.number, 'Add work order failed!')).then(workOrderSaved => {
    assert(workOrderSaved.success, `WorkOrderSaved error: ${workOrderSaved.error}`)
    workOrder.number = workOrderSaved.number
  })
}

function saveWorkOrder(workOrder: WorkOrder): void {
  call(saveWorkOrderUrl, post, headers, workOrder, () => WorkOrderSaved.fail(workOrder.number, 'Save work order failed!')).then(workOrderSaved => {
    assert(workOrderSaved.success, `WorkOrderSaved error: ${workOrderSaved.error}`)
    assert(workOrderSaved.number === workOrder.number)
  })
}

function saveUser(user: User): void {
  call(saveUserUrl, post, headers, user, () => UserSaved.fail(user.id, 'Save user failed.')).then(userSaved => {
    assert(userSaved.success, `UserSaved error: ${userSaved.error}`)
  })
}

function getWorkOrderByNumber(number: number): void {
  call(getWorkOrderByNumberUrl + number, get, headers, {}, () => WorkOrderSelected.fail(`Get work order by number failed for: ${number}!`)).then(workOrderSelected => {
    assert(workOrderSelected.success, `WorkOrderSelected error: ${workOrderSelected.error}`)
  })
}

function listWorkOrdersByUserId(id: number): void {
  call(listWorkOrdersByUserIdUrl + id, get, headers, {}, () => WorkOrdersListed.fail(id, `List work orders by user id failed for: ${id}!`)).then(workOrdersListed => {
    assert(workOrdersListed.success, `WorkOrders error: ${workOrdersListed.error}`)
  })
}