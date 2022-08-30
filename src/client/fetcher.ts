import { toJson, toObject, Credentials, ImageUrl, Registration, Status, User, UserStatus, UsersWorkOrders, WorkOrder, WorkOrderStatus, WorkOrders } from './entity.js'

const rootUrl = 'http://' + window.location.host
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
const headers: { [key: string]: string } = {
  "Content-Type": "application/json charset=utf-8"
}

async function call<T, R>(url: string,
                          method: string,
                          headers: { [key: string]: string },
                          entity: FormData | T,
                          fault: () => R): Promise<R> {
  let result: R
  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: entity instanceof FormData ? entity : toJson(entity)
  })
  if (response.ok) {
    result = toObject( await response.json() )
  } else {
    console.log(`*** fetcher.call -> url: ${url}, method: ${method}, headers: ${headers}, entity: ${entity}, status code: ${response.status} status text: ${response.statusText}`)
    result = fault()
  }
  console.log(`*** fetcher:call -> url: ${url} result: ${result}`)
  return result
}

export default () => {
  console.log('*** fetcher init ...')
}

export async function register(registration: Registration): Promise<Status> {
  return await call(registerUrl, post, headers, registration, () => Registration.fail('Register failed.'))
}

export async function login(credentials: Credentials): Promise<UsersWorkOrders> {
  return await call(loginUrl, post, headers, credentials, () => UsersWorkOrders.fail('Login failed.'))
}

export async function addWorkOrder(workOrder: WorkOrder): Promise<WorkOrderStatus> {
  return await call(addWorkOrderUrl, post, headers, workOrder, () => WorkOrderStatus.fail('Add work order failed!', workOrder.number))
}

export async function saveWorkOrder(workOrder: WorkOrder): Promise<WorkOrderStatus> {
  return await call(saveWorkOrderUrl, post, headers, workOrder, () => WorkOrderStatus.fail('Save work order failed!', workOrder.number))
}

export async function saveUser(user: User): Promise<UserStatus> {
  return await call(saveUserUrl, post, headers, user, () => UserStatus.fail('Save user failed.', user.id))
}

export async function saveImage(number: number, url: string, file: File, filename: string): Promise<ImageUrl> {
  const headers: { [key: string]: string } = { "Content-Type": "multipart/form-data" }
  const formdata = new FormData()
  formdata.append('number', number.toString())
  formdata.append('url', url)
  formdata.append('imagefilename', filename)
  formdata.append('image', file, filename)
  return await call(saveImageUrl, post, headers, formdata, () => ImageUrl.fail('Save image failed.', number, url))
}

export async function getWorkOrderByNumber(number: number): Promise<WorkOrder> {
  return await call(getWorkOrderByNumberUrl + number, get, headers, {}, () => WorkOrder.fail(`Get work order by number failed for: ${number}!`, number))
}

export async function listWorkOrdersByUserId(id: number): Promise<WorkOrders> {
  return await call(listWorkOrdersByUserIdUrl + id, get, headers, {}, () => WorkOrders.fail(`List work orders by user id failed for: ${id}!`, id))
}