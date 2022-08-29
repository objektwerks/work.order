import assert from 'assert';
import fetch from 'node-fetch';
import { 
  toJson, 
  toObject, 
  Credentials, 
  ImageUrl, 
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
const saveImageUrl = rootUrl + '/image/save'
const getWorkOrderByNumberUrl = rootUrl + '/workorders/'
const listWorkOrdersByUserIdUrl = rootUrl + '/workorders/user/'

const get = 'GET'
const post = 'POST'
const headers: Record<string, string> = {
  "Content-Type": "application/json charset=utf-8",
  'Accept': 'application/json'
}

test()

function test() {
  console.log('*** preparing integration test ...')

  const serviceProviderEmail = process.env.WORK_ORDER_SERVICE_PROVIDER_EMAIL as string
  const homeownerEmail = process.env.WORK_ORDER_HOMEOWNER_EMAIL as string
  
  let serviceProviderPin = ''
  let homeownerPin = ''
  
  let serviceProviderUsersWorkOrders = new UsersWorkOrders(User.empty(), [], [])
  let homeownerUsersWorkOrders = new UsersWorkOrders(User.empty(), [], [])
  
  console.log('*** running integration test ...')
  
  register( new Registration('serviceprovider', "fred flintstone,", serviceProviderEmail, "123 stone st"), serviceProviderPin )
  register( new Registration('homeowner', "barney rubble,", homeownerEmail, "123 stone st"), homeownerPin )
  
  login( new Credentials(serviceProviderEmail, serviceProviderPin), serviceProviderUsersWorkOrders )
  login( new Credentials(homeownerEmail, homeownerPin), homeownerUsersWorkOrders )
  
  let workOrder = new WorkOrder(0, homeownerUsersWorkOrders.user.id, serviceProviderUsersWorkOrders.user.id, 'sprinkler', 'broken', '', '', new Date().toISOString(), '')
  addWorkOrder(workOrder)
  
  workOrder.resolution = 'fixed'
  workOrder.closed = new Date().toISOString()
  saveWorkOrder(workOrder)
  
  saveUser(homeownerUsersWorkOrders.user)

  saveImage(workOrder.number, 'rc/logo.png', null, 'logo.png')
  
  getWorkOrderByNumber(workOrder.number)
  
  listWorkOrdersByUserId(homeownerUsersWorkOrders.user.id)
  
  console.log('*** integration test complete!')
}

async function call<T, R>(url: string,
                          method: string,
                          headers: Record<string, string>,
                          entity: FormData | T,
                          fault: () => R): Promise<R> {
  let result: R
  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: entity instanceof FormData ? entity : toJson(entity)
  })
  if (response.ok) {
    result = toObject( await response.json() as string )
  } else {
    console.log(`*** fetch -> url: ${url}, method: ${method}, headers: ${headers}, entity: ${entity}, status code: ${response.status} status text: ${response.statusText}`)
    result = fault()
  }
  console.log(`*** fetcher:call -> url: ${url} result: ${result}`)
  return result
}

function register(registration: Registration, target: string): void {
  call(registerUrl, post, headers, registration, () => Registration.fail('Register failed.')).then(status => {
    assert(status.success, `Status is in error: ${status.error}`)
    assert(status.pin.length === 7, `Pin length is invalid: ${status.pin}`)
    target = status.pin
  })
}

function login(credentials: Credentials, target: UsersWorkOrders): void {
  call(loginUrl, post, headers, credentials, () => UsersWorkOrders.fail('Login failed.')).then(usersWorkOrders => {
    assert(usersWorkOrders.success, `UsersWorkOrders is in error: ${usersWorkOrders.error}`)
    target = usersWorkOrders
  })
}

function addWorkOrder(workOrder: WorkOrder): void {
  call(addWorkOrderUrl, post, headers, workOrder, () => WorkOrderStatus.fail('Add work order failed!', workOrder.number)).then(workOrderStatus => {
    assert(workOrderStatus.success, `WorkOrderStatus is in error: ${workOrderStatus.error}`)
    workOrder.number = workOrderStatus.number
  })
}

function saveWorkOrder(workOrder: WorkOrder): void {
  call(saveWorkOrderUrl, post, headers, workOrder, () => WorkOrderStatus.fail('Save work order failed!', workOrder.number)).then(workOrderStatus => {
    assert(workOrderStatus.success, `WorkOrderStatus is in error: ${workOrderStatus.error}`)
    assert(workOrderStatus.number === workOrder.number)
  })
}

function saveUser(user: User): void {
  call(saveUserUrl, post, headers, user, () => UserStatus.fail('Save user failed.', user.id)).then(userStatus => {
    assert(userStatus.success, `UserStatus is in error: ${userStatus.error}`)
  })
}

function saveImage(number: number, url: string, file: File, filename: string): void {
  const headers = { "Content-Type": "multipart/form-data" }
  const formdata = new FormData()
  formdata.append('number', number.toString())
  formdata.append('url', url)
  formdata.append('imagefilename', filename)
  formdata.append('image', file, filename)
  call(saveImageUrl, post, headers, formdata, () => ImageUrl.fail('Save image failed.', number, url))
}

function getWorkOrderByNumber(number: number): void {
  call(getWorkOrderByNumberUrl + number, get, headers, {}, () => WorkOrder.fail(`Get work order by number failed for: ${number}!`, number)).then(workOrder => {
    assert(workOrder.success, `WorkOrder is in error: ${workOrder.error}`)
    assert(workOrder.number === number, `WorkOrder number does not === number: ${workOrder.number} !== ${number}`)
  })
}

function listWorkOrdersByUserId(id: number): void {
  call(listWorkOrdersByUserIdUrl + id, get, headers, {}, () => WorkOrders.fail(`List work orders by user id failed for: ${id}!`, id)).then(workOrders => {
    assert(workOrders.success, `WorkOrders is in error: ${workOrders.error}`)
    assert(workOrders.userId === id, `User id does not === id: ${workOrders.userId} !== ${id}`)
  })
}