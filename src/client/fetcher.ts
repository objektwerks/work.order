import { 
  toJson,
  ImageSaved,
  Login,
  LoggedIn,
  Register,
  Registered,
  SaveUser,
  UserSaved,
  SaveWorkOrder,
  WorkOrderSaved,
  WorkOrderSelected,
  WorkOrdersListed } from './entity.js'

const rootUrl = 'http://' + window.location.host
const registerUrl = rootUrl + '/register'
const loginUrl = rootUrl + '/login'
const addWorkOrderUrl = rootUrl + '/workorders/add'
const saveWorkOrderUrl = rootUrl + '/workorders/save'
const saveUserUrl = rootUrl + '/users/save'
const saveImageUrl = rootUrl + '/image/save'
const getWorkOrderByNumberUrl = rootUrl + '/workorders/'
const listWorkOrdersByUserIdUrl = rootUrl + '/workorders/user/'
const get = 'get'
const post = 'post'
const headers: { [key: string]: string } = {
  'Content-Type': 'application/json'
}
const formDataHeaders: { [key: string]: string } = { "Content-Type": "multipart/form-data" }
const getInit = {
  method: 'get',
  headers: headers
}
const postInit = {
  method: 'post',
  headers: headers
}

async function call<T, R>(url: string,
                          method: string,
                          headers: { [key: string]: string },
                          entity: FormData | T,
                          fault: () => R): Promise<R> {
  let result: R
  const init = (method === get) ? getInit : Object.assign( { body: entity instanceof FormData ? entity : toJson(entity) }, postInit )
  const response = await fetch(url, init)
  if (response.ok) {
    result = await response.json()
  } else {
    console.error('*** fetcher:call error: url: %s, method: %s, headers: %o, entity: %o, status code: %s status text: %s', url, method, headers, entity, response.status, response.statusText)
    result = fault()
  }
  console.log('*** fetcher:call result url: %s result: %o', url, result)
  return result
}

export default () => {
  console.log('*** fetcher init ...')
}

export async function register(register: Register): Promise<Registered> {
  return await call(registerUrl, post, headers, register, () => Registered.fail('Register failed.'))
}

export async function login(login: Login): Promise<LoggedIn> {
  return await call(loginUrl, post, headers, login, () => LoggedIn.fail('Login failed.'))
}

export async function addWorkOrder(saveWorkOrder: SaveWorkOrder): Promise<WorkOrderSaved> {
  return await call(addWorkOrderUrl, post, headers, saveWorkOrder, () => WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Add work order failed!'))
}

export async function saveWorkOrder(saveWorkOrder: SaveWorkOrder): Promise<WorkOrderSaved> {
  return await call(saveWorkOrderUrl, post, headers, saveWorkOrder, () => WorkOrderSaved.fail(saveWorkOrder.workOrder.number, 'Save work order failed!'))
}

export async function saveUser(saveUser: SaveUser): Promise<UserSaved> {
  return await call(saveUserUrl, post, headers, saveUser, () => UserSaved.fail(saveUser.user.id, 'Save user failed.'))
}

export async function saveImage(number: number, url: string, file: File, filename: string): Promise<ImageSaved> {
  const formData = new FormData()
  formData.append('number', number.toString())
  formData.append('url', url)
  formData.append('imagefilename', filename)
  formData.append('image', file, filename)
  return await call(saveImageUrl, post, formDataHeaders, formData, () => ImageSaved.fail(number, url, 'Save image failed.'))
}

export async function getWorkOrderByNumber(number: number): Promise<WorkOrderSelected> {
  return await call(getWorkOrderByNumberUrl + number, get, headers, {}, () => WorkOrderSelected.fail(number, `Get work order by number failed for: ${number}!`))
}

export async function listWorkOrdersByUserId(id: number): Promise<WorkOrdersListed> {
  return await call(listWorkOrdersByUserIdUrl + id, get, headers, {}, () => WorkOrdersListed.fail(id, `List work orders by user id failed for: ${id}!`))
}