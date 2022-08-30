import assert from 'assert'
import fetch from 'node-fetch'
// import fs from 'fs'
import { 
  toJson, 
  toObject, 
  Credentials, 
  // ImageUrl, 
  Registration, 
  User, 
  UserStatus, 
  UsersWorkOrders, 
  WorkOrder, 
  WorkOrderStatus, 
  WorkOrders 
} from '../server/entity.js'

const port = parseInt( process.env.WORK_ORDER_PORT as string ) ?? 3000
const host = process.env.WORK_ORDER_BIND_IP ?? '127.0.0.1'
const rootUrl = `http://${host}:${port}`

const registerUrl = rootUrl + '/register'
const loginUrl = rootUrl + '/login'
const addWorkOrderUrl = rootUrl + '/workorders/add'
const saveWorkOrderUrl = rootUrl + '/workorders/save'
const saveUserUrl = rootUrl + '/users/save'
// const saveImageUrl = rootUrl + '/image/save'
const getWorkOrderByNumberUrl = rootUrl + '/workorders/'
const listWorkOrdersByUserIdUrl = rootUrl + '/workorders/user/'

const get = 'GET'
const post = 'POST'
const headers: { [key: string]: string } = {
  'Content-Type': 'application/json charset=utf-8'
}

test()

function test() {
  console.log('*** running integration test ...')

  const serviceProviderEmail = process.env.WORK_ORDER_SERVICE_PROVIDER_EMAIL as string
  const homeownerEmail = process.env.WORK_ORDER_HOMEOWNER_EMAIL as string
  let serviceProviderPin = ''
  let homeownerPin = ''  
  setTimeout(
    () => register( new Registration('serviceprovider', "fred flintstone,", serviceProviderEmail, "123 stone st"), serviceProviderPin ),
    2000
  )
  setTimeout(
    () => register( new Registration('homeowner', "barney rubble,", homeownerEmail, "125 stone st"), homeownerPin ),
    2000
  )

  let serviceProviderUsersWorkOrders = new UsersWorkOrders(User.empty(), [], [])
  let homeownerUsersWorkOrders = new UsersWorkOrders(User.empty(), [], [])
  setTimeout(
    () => login( new Credentials(serviceProviderEmail, serviceProviderPin), serviceProviderUsersWorkOrders ),
    2000
  )
  setTimeout(
    () => login( new Credentials(homeownerEmail, homeownerPin), homeownerUsersWorkOrders ),
    2000
  )

  let workOrder = new WorkOrder(0, homeownerUsersWorkOrders.user.id, serviceProviderUsersWorkOrders.user.id, 'sprinkler', 'broken', '', '', new Date().toISOString(), '')
  setTimeout(
    () => addWorkOrder(workOrder),
    2000
  )
  
  workOrder.resolution = 'fixed'
  workOrder.closed = new Date().toISOString()
  setTimeout(
    () => saveWorkOrder(workOrder),
    2000
  )
  setTimeout(
    () => saveUser(homeownerUsersWorkOrders.user),
    2000
  )
  setTimeout(
    () => getWorkOrderByNumber(workOrder.number),
    2000
  )
  setTimeout(
    () => listWorkOrdersByUserId(homeownerUsersWorkOrders.user.id),
    2000
  )

  /*
  const url = 'rc/logo.png'
  const file = new File( [fs.readFileSync(url, 'utf8')], 'logo.png' )
  const filename = `${workOrder.number}-${new Date().toISOString()}.png`
  saveImage(workOrder.number, url, file, filename)
  */
  
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
  console.log('*** fetch:call init: ', init)
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

function register(registration: Registration, target: string): void {
  call(registerUrl, post, headers, registration, () => Registration.fail('Register failed.')).then(status => {
    assert(status.success, `Status error: ${status.error}`)
    assert(status.pin.length === 7, `Pin length is invalid: ${status.pin}`)
    target = status.pin
  })
}

function login(credentials: Credentials, target: UsersWorkOrders): void {
  call(loginUrl, post, headers, credentials, () => UsersWorkOrders.fail('Login failed.')).then(usersWorkOrders => {
    assert(usersWorkOrders.success, `UsersWorkOrders error: ${usersWorkOrders.error}`)
    target = usersWorkOrders
  })
}

function addWorkOrder(workOrder: WorkOrder): void {
  call(addWorkOrderUrl, post, headers, workOrder, () => WorkOrderStatus.fail('Add work order failed!', workOrder.number)).then(workOrderStatus => {
    assert(workOrderStatus.success, `WorkOrderStatus error: ${workOrderStatus.error}`)
    workOrder.number = workOrderStatus.number
  })
}

function saveWorkOrder(workOrder: WorkOrder): void {
  call(saveWorkOrderUrl, post, headers, workOrder, () => WorkOrderStatus.fail('Save work order failed!', workOrder.number)).then(workOrderStatus => {
    assert(workOrderStatus.success, `WorkOrderStatus error: ${workOrderStatus.error}`)
    assert(workOrderStatus.number === workOrder.number)
  })
}

function saveUser(user: User): void {
  call(saveUserUrl, post, headers, user, () => UserStatus.fail('Save user failed.', user.id)).then(userStatus => {
    assert(userStatus.success, `UserStatus error: ${userStatus.error}`)
  })
}

function getWorkOrderByNumber(number: number): void {
  call(getWorkOrderByNumberUrl + number, get, headers, {}, () => WorkOrder.fail(`Get work order by number failed for: ${number}!`, number)).then(workOrder => {
    assert(workOrder.success, `WorkOrder error: ${workOrder.error}`)
    assert(workOrder.number === number, `WorkOrder number does not === number: ${workOrder.number} !== ${number}`)
  })
}

function listWorkOrdersByUserId(id: number): void {
  call(listWorkOrdersByUserIdUrl + id, get, headers, {}, () => WorkOrders.fail(`List work orders by user id failed for: ${id}!`, id)).then(workOrders => {
    assert(workOrders.success, `WorkOrders error: ${workOrders.error}`)
    assert(workOrders.userId === id, `User id does not === id: ${workOrders.userId} !== ${id}`)
  })
}

/*
function saveImage(number: number, url: string, file: File, filename: string): void {
  const headers = { "Content-Type": "multipart/form-data" }
  const formdata = new FormData()
  formdata.append('number', number.toString())
  formdata.append('url', url)
  formdata.append('imagefilename', filename)
  formdata.append('image', file, filename)
  call(saveImageUrl, post, headers, formdata, () => ImageUrl.fail('Save image failed.', number, url))
}
*/