import mysql, { OkPacket, Pool, PoolOptions, RowDataPacket } from 'mysql2/promise'
import { User, WorkOrder } from './entity.js'

const options: PoolOptions = {
  uri: process.env.WORK_ORDER_DATABASE_URL,
  pool: 9
}
const connection: Pool = mysql.createPool(options)

export default () => {
  console.log('*** store connected to database ...')
}

export function disconnect(): void {
  connection.end()
  console.log('*** store disconnected from database.')
}

export async function listWorkOrdersByUserId(id: number): Promise<WorkOrder[]> {
  const [rows] = await connection
    .query<RowDataPacket[]>('select * from work_order where homeownerId = ? or serviceProviderId = ? order by opened desc',
    [id, id])
  const workOrders: WorkOrder[] = []
  rows.forEach((row: RowDataPacket) => {
    workOrders.push(
      new WorkOrder(row.number, row.homeownerId, row.serviceProviderId, row.title, row.issue, row.imageUrl, row.resolution, row.opened, row.closed)
    )
  })
  return workOrders
}

export async function listUsersByRole(role: string): Promise<User[]> {
  const [rows] = await connection
    .query<RowDataPacket[]>('select * from user where role = ? order by name asc',
    [role])
  const users: User[] = []
  rows.forEach((row: RowDataPacket) => {
    users.push(
      new User(row.id, row.role, row.name, row.emailAddress, row.streetAddress, row.registered, row.pin)
    )
  })
  return users
}

export async function getUserByEmailAddressPin(emailAddress: string, pin: string): Promise<User> {
  const [rows] = await connection
    .query<RowDataPacket[]>('select * from user where emailAddress = ? and pin = ?',
    [emailAddress, pin])
  const users: User[] = []
  rows.forEach((row: RowDataPacket) => {
    users.push(
      new User(row.id, row.role, row.name, row.emailAddress, row.streetAddress, row.registered, row.pin)
    )
  })
  return users.length > 0 ? users[0] : User.empty()
}

export async function getWorkOrderByNumber(number: number): Promise<WorkOrder> {
  const [rows] = await connection
    .query<RowDataPacket[]>('select * from work_order where number = ?',
    [number])
  const workOrders: WorkOrder[] = []
  rows.forEach((row: RowDataPacket) => {
    workOrders.push(
      new WorkOrder(row.number, row.homeownerId, row.serviceProviderId, row.title, row.issue, row.imageUrl, row.resolution, row.opened, row.closed)
    )
  })
  return workOrders.length > 0 ? workOrders[0] : WorkOrder.empty()
}

export async function addWorkOrder(workOrder: WorkOrder): Promise<number> {
  const [result] = await connection
    .query<OkPacket>('insert into work_order (homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed) values (?, ?, ?, ?, ?, ?, ?, ?)',
    [workOrder.homeownerId, workOrder.serviceProviderId, workOrder.title, workOrder.issue, workOrder.imageUrl, workOrder.resolution, workOrder.opened, workOrder.closed])
  return result.insertId
}

export async function saveWorkOrder(workOrder: WorkOrder): Promise<number> {
  const [result] = await connection
    .query<OkPacket>('update work_order set homeownerId = ?, serviceProviderId = ?, title = ?, issue = ?, imageUrl = ?, resolution = ?, opened = ?, closed = ? where number = ?',
    [workOrder.homeownerId, workOrder.serviceProviderId, workOrder.title, workOrder.issue, workOrder.imageUrl, workOrder.resolution, workOrder.opened, workOrder.closed, workOrder.number])
  return result.affectedRows
}

export async function addUser(user: User): Promise<number> {
  const [result] = await connection
    .query<OkPacket>('insert into user (role, name, emailAddress, streetAddress, registered, pin) values (?, ?, ?, ?, ?, ?)',
    [user.role, user.name, user.emailAddress, user.streetAddress, user.registered, user.pin])
  return result.insertId
}

export async function saveUser(user: User): Promise<number> {
  const [result] = await connection
    .query<OkPacket>('update user set role = ?, name = ?, emailAddress = ?, streetAddress = ?, registered = ?, pin = ? where id = ?',
    [user.role, user.name, user.emailAddress, user.streetAddress, user.registered, user.pin, user.id])
  return result.affectedRows
}