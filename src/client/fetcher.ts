import { ImageFile } from './model.js'
import { 
  toJson,
  Login,
  LoggedIn,
  Register,
  Registered,
  SaveUser,
  UserSaved,
  WorkOrder,
  WorkOrderSaved,
  ListWorkOrders,
  WorkOrdersListed } from './entity.js'

const rootUrl = 'http://' + window.location.host
const registerUrl = rootUrl + '/register'
const loginUrl = rootUrl + '/login'
const addWorkOrderUrl = rootUrl + '/workorders/add'
const saveWorkOrderUrl = rootUrl + '/workorders/save'
const listWorkOrdersUrl = rootUrl + '/workorders'
const saveUserUrl = rootUrl + '/users/save'
const post = 'post'
const jsonHeaders: { [key: string]: string } = { 'Content-Type': 'application/json' }
const formDataHeaders: { [key: string]: string } = { "Content-Type": "multipart/form-data" }

async function call<T, R>(url: string,
                          headers: { [key: string]: string },
                          entity: FormData | T,
                          fault: () => R): Promise<R> {
  let result: R
  const init = {
    method: post,
    headers: headers,
    body: entity instanceof FormData ? entity : toJson(entity)
  }
  const response = await fetch(url, init)
  if (response.ok) {
    result = await response.json()
  } else {
    console.error('*** fetcher:call error: url: %s, headers: %o, entity: %o, status code: %s status text: %s', url, headers, entity, response.status, response.statusText)
    result = fault()
  }
  console.log('*** fetcher:call result url: %s result: %o', url, result)
  return result
}

function workOrderToFormData(workOrder: WorkOrder, imageFile: ImageFile[]): FormData {
  const formData = new FormData()
  if (imageFile.length > 0) {
    const image = imageFile[0]
    workOrder.imageUrl = image.url
    formData.append('image', image.file, image.filename)
    formData.append('imageFileName', image.filename)
  } else {
    const filename = `z-${new Date().toISOString()}.txt`
    formData.append('image', new Blob(['delete me!'], { type: "text/plain" }), filename)
    formData.append('imageFileName', filename)
  }
  formData.append('workOrderAsJson', toJson(workOrder))
  return formData
}

export default () => {
  console.log('*** fetcher init ...')
}

export async function register(register: Register): Promise<Registered> {
  return await call(registerUrl, jsonHeaders, register, () => Registered.fail('Register failed.'))
}

export async function login(login: Login): Promise<LoggedIn> {
  return await call(loginUrl, jsonHeaders, login, () => LoggedIn.fail('Login failed.'))
}

export async function addWorkOrder(workOrder: WorkOrder, imageFile: ImageFile[]): Promise<WorkOrderSaved> {
  return await call(addWorkOrderUrl, formDataHeaders, workOrderToFormData(workOrder, imageFile), () => WorkOrderSaved.fail(workOrder.number, 'Add work order failed!'))
}

export async function saveWorkOrder(workOrder: WorkOrder, imageFile: ImageFile[]): Promise<WorkOrderSaved> {
  return await call(saveWorkOrderUrl, formDataHeaders, workOrderToFormData(workOrder, imageFile), () => WorkOrderSaved.fail(workOrder.number, 'Save work order failed!'))
}

export async function saveUser(saveUser: SaveUser): Promise<UserSaved> {
  return await call(saveUserUrl, jsonHeaders, saveUser, () => UserSaved.fail(saveUser.user.id, 'Save user failed.'))
}

export async function listWorkOrders(listWorkOrders: ListWorkOrders): Promise<WorkOrdersListed> {
  return await call(listWorkOrdersUrl, jsonHeaders, listWorkOrders, () => WorkOrdersListed.fail(listWorkOrders.userId, `List work orders by user id failed for: ${listWorkOrders.userId}!`))
}