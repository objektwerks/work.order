// @ts-ignore
import { toJson, toObject, Credentials, ImageUrl, Registration, Status, User, UserStatus, UsersWorkOrders, WorkOrder, WorkOrderStatus, WorkOrders } from './entity.js'

const rootUrl = 'https://' + window.location.host
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

async function call<T, R>(url: string, method: string, headers: Record<string, string>, entity: T, fault: () => R, asJson = true): Promise<R> {
  let result: R
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: asJson ? toJson(entity) : entity
    })
    if (response.ok) {
      result = toObject( await response.json() )
    } else {
      throw `failed with status code: ${response.status} status text: ${response.statusText}`
    }
  } catch (error) {
    console.log(`*** fetcher.call -> url: ${url}, method: ${method}, headers: ${headers}, entity: ${entity}, error: ${error}`)
    result = fault()
  }
  console.log(`*** fetcher:call -> url: ${url} result: ${result}`)
  return result
}

export default () => {
  console.log('*** fetcher init ...')
}

export function register(registration: Registration): Status {
  return Status.fromObject(
    call(registerUrl, post, headers, registration, () => Registration.fail('Register failed.'))
  )
}

export function login(credentials: Credentials): UsersWorkOrders {
  return UsersWorkOrders.fromObject(
    call(loginUrl, post, headers, credentials, () => UsersWorkOrders.fail('Login failed.'))
  )
}

export function addWorkOrder(workOrder: WorkOrder): WorkOrderStatus {
  return WorkOrderStatus.fromObject(
    call(addWorkOrderUrl, post, headers, workOrder, () => WorkOrderStatus.fail('Add work order failed!', workOrder.number))
  )
}

export function saveWorkOrder(workOrder: WorkOrder): WorkOrderStatus {
  return WorkOrderStatus.fromObject(
    call(saveWorkOrderUrl, post, headers, workOrder, () => WorkOrderStatus.fail('Save work order failed!', workOrder.number))
  )
}

export function saveUser(user: User): UserStatus {
  return UserStatus.fromObject(
    call(saveUserUrl, post, headers, user, () => UserStatus.fail('Save user failed.', user))
  )
}

export function saveImage(number: number, url: string, file: File, filename: string): ImageUrl {
  const headers = { "Content-Type": "multipart/form-data" }
  const formdata = new FormData()
  formdata.append('number', number.toString())
  formdata.append('url', url)
  formdata.append('imagefilename', filename)
  formdata.append('image', file, filename)
  return ImageUrl.fromObject(
    call(saveImageUrl, post, headers, formdata, () => ImageUrl.fail('Save image failed.', number, url), false)
  )
}

export function getWorkOrderByNumber(number: number): WorkOrder {
  return WorkOrder.fromObject(
    call(getWorkOrderByNumberUrl + number, get, headers, {}, () => WorkOrder.fail(`Get work order by number failed for: ${number}!`))
  )
}

export function listWorkOrdersByUserId(id: number): WorkOrders {
  return WorkOrders.fromObject(
    call(listWorkOrdersByUserIdUrl + id, get, headers, {}, () => WorkOrders.fail(`List work orders by user id failed for: ${id}!`))
  )
}