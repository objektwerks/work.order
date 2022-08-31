import mysql, { OkPacket, Pool, PoolOptions, RowDataPacket } from 'mysql2'
import { User, WorkOrder } from './entity.js'

const options: PoolOptions = {
  host: process.env.WORK_ORDER_DATABASE_HOST,
  database: process.env.WORK_ORDER_DATABASE_NAME,
  user: process.env.WORK_ORDER_DATABASE_USER,
  password: process.env.WORK_ORDER_DATABASE_PASSWORD,
}
const connection: Pool = mysql.createPool(options)

function log(method: string, message: string): void {
  console.log(`*** store.${method}: %s`, message)
}

export default () => {
  console.log('*** store connected ...')
}

export function disconnect(): void {
  connection.end()
  console.log('*** store disconnected from database.')
}

export function listWorkOrdersByUserId(id: number): WorkOrder[] {
  const list: WorkOrder[] = []
  connection.query(`select * from work_order where homeownerId = ${id} or serviceProviderId = ${id} order by opened desc`, (error: Error, rows: RowDataPacket[]) => {
    if (error) {
      log('listWorkOrdersByUserId', error.message)
    } else {
      rows.forEach((row: RowDataPacket) => {
        list.push(
          new WorkOrder(row.number, row.homeownerId, row.serviceProviderId, row.title, row.issue, row.imageUrl, row.resolution, row.opened, row.closed)
        )
      })
    }
  })
  return list
}

export function listUsersByRole(role: string): User[] {
  const list: User[] = []
  connection.query(`select * from user where role = ${role} order by name asc`, (error: Error, rows: RowDataPacket[]) => {
    if (error) {
      log('listUsersByRole', error.message)
    } else {
      rows.forEach((row: RowDataPacket) => {
        list.push(
          new User(row.id, row.role, row.name, row.emailAddress, row.streetAddress, row.registered, '')
        )
      })
    }
  })
  return list
}

export function getUserByEmailAddressPin(emailAddress: string, pin: string): User {
  const list: User[] = []
  connection.query(`select * from user where emailAddress = ${emailAddress} and pin = ${pin}`, (error: Error, rows: RowDataPacket[]) => {
    if (error) {
      log('getUserByEmailAddressPin', error.message)
    } else {
      rows.forEach((row: RowDataPacket) => {
        list.push(
          new User(row.id, row.role, row.name, row.emailAddress, row.streetAddress, row.registered, '')
        )
      })
    }
  })
  return (list.length > 0) ? list[0] : User.empty()
}

export function getWorkOrderByNumber(number: number): WorkOrder {
  const list: WorkOrder[] = []
  connection.query(`select * from work_order where number = ${number}`, (error: Error, rows: RowDataPacket[]) => {
    if (error) {
      log('getWorkOrderByNumber', error.message)
    } else {
      rows.forEach((row: RowDataPacket) => {
        list.push(
          new WorkOrder(row.number, row.homeownerId, row.serviceProviderId, row.title, row.issue, row.imageUrl, row.resolution, row.opened, row.closed)
        )
      })
    }
  })
  return (list.length > 0) ? list[0] : WorkOrder.empty()
}

export function addWorkOrder(workOrder: WorkOrder): number {
  let number = 0
  connection.query('insert into work_order values ?', [workOrder], (error: Error | null, result: OkPacket) => {
    if (error) {
      log('addWorkOrder', error.message)
    } else {
      number = result.insertId
      log('addWorkOrder', `succeeded for number: ${number}`)
    }
  })
  return number
}

export function addUser(user: User): number {
  let id = 0
  connection.query('insert into user values ?', [user], (error: Error | null, result: OkPacket) => {
    if (error) {
      log('addUser', error.message)
    } else {
      id = result.insertId
      log('addUser', `succeeded for id: ${id}`)
    }
  })
  return id
}

export function saveWorkOrder(workOrder: WorkOrder): number {
  let count = 0
  connection.query('update work_order SET ? where number = ?', [workOrder, workOrder.number], (error: Error | null, result: OkPacket) => {
    if (error) {
      log('saveWorkOrder', error.message)
    } else {
      count = result.affectedRows
      log('saveWorkOrder', `succeeded for number ${workOrder.number}`)
    }
  })
  return count
}

export function saveUser(user: User): number {
  let count = 0
  connection.query('update user SET ? where id = ?', [user, user.id], (error: Error | null, result: OkPacket) => {
    if (error) {
      log('saveUser', error.message)
    } else {
      count = result.affectedRows
      log('saveUser', `succeeded for id ${user.id}`)
    }
  })
  return count
}

export function saveImageUrl(number: number, url: string): number {
  let count = 0
  connection.query('update work_order SET imageUrl = ? where number = ?', [url, number], (error: Error | null, result: OkPacket) => {
    if (error) {
      log('saveImageUrl', error.message)
    } else {
      count = result.affectedRows
      log('saveImageUrl', `succeeded for number: ${number} url: ${url}`)
    }
  })
  return count
}