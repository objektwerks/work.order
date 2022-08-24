// @ts-check

// @ts-ignore
import { Credentials, ImageUrl, Registration, Status, User, UserStatus, UsersWorkOrders, WorkOrder, WorkOrders } from './entity.js'

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
const headers: any = {
  "Content-Type": "application/json charset=utf-8",
  'Accept': 'application/json'
}

const call = async (url: string, method: string, headers: any, entity: any, fault: () => object, asJson = true) => {
  let result
  try {
    let response = await fetch(url, {
      method: method,
      headers: headers,
      body: asJson ? JSON.stringify(entity) : entity
    })
    if (response.ok) {
      result = JSON.parse( await response.json() )
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
  return call(registerUrl, post, headers, registration, () => Registration.fail('Register failed.'))
}

export function login(credentials: Credentials): UsersWorkOrders {
  return call(loginUrl, post, headers, credentials, () => UsersWorkOrders.fail('Login failed.'))
}

export function addWorkOrder(workOrder: WorkOrder): WorkOrder {
  return call(addWorkOrderUrl, post, headers, workOrder, () => WorkOrder.fail('Add work order failed!', workOrder))
}

export function saveWorkOrder(workOrder: WorkOrder): WorkOrder {
  return call(saveWorkOrderUrl, post, headers, workOrder, () => WorkOrder.fail('Save work order failed!', workOrder))
}

export function saveUser(user: User): UserStatus {
  return call(saveUserUrl, post, headers, user, () => UserStatus.fail('Save user failed.', user))
}

export function saveImage(number: string, url: string, file: File, filename: string): ImageUrl {
  const headers = { "Content-Type": "multipart/form-data" }
  const formdata = new FormData()
  formdata.append('number', number)
  formdata.append('url', url)
  formdata.append('imagefilename', filename)
  formdata.append('image', file, filename)
  return call(saveImageUrl, post, headers, formdata, () => ImageUrl.fail('Save image failed.', number, url), false)
}

export function getWorkOrderByNumber(number: string): WorkOrder {
  return call(getWorkOrderByNumberUrl + number, get, headers, {}, () => WorkOrder.fail(`Get work order by number failed for: ${number}!`))
}

export function listWorkOrdersByUserId(id: string): WorkOrders {
  return call(listWorkOrdersByUserIdUrl + id, get, headers, {}, () => WorkOrders.fail(`List work orders by user id failed for: ${id}!`))
}