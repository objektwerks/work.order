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

export function listWorkOrdersByUserId(id: number, workOrders: WorkOrder[]): void {
  connection
    .query(`select * from work_order where homeownerId = ${id} or serviceProviderId = ${id} order by opened desc`,
      (error: Error, rows: RowDataPacket[]) => {
    if (error) {
      log('listWorkOrdersByUserId', error.message)
      throw error.message
    } else {
      rows.forEach((row: RowDataPacket) => {
        workOrders.push(
          new WorkOrder(row.number, row.homeownerId, row.serviceProviderId, row.title, row.issue, row.imageUrl, row.resolution, row.opened, row.closed)
        )
      })
    }
  })
}

export function listUsersByRole(role: string, users: User[]): void {
  connection
    .query(`select * from user where role = ${role} order by name asc`,
      (error: Error, rows: RowDataPacket[]) => {
    if (error) {
      log('listUsersByRole', error.message)
      throw error.message
    } else {
      rows.forEach((row: RowDataPacket) => {
        users.push(
          new User(row.id, row.role, row.name, row.emailAddress, row.streetAddress, row.registered, '')
        )
      })
    }
  })
}

export function getUserByEmailAddressPin(emailAddress: string, pin: string, user: User): void {
  connection
    .query(`select * from user where emailAddress = ${emailAddress} and pin = ${pin}`,
      (error: Error, rows: RowDataPacket[]) => {
    if (error) {
      log('getUserByEmailAddressPin', error.message)
      throw error.message
    } else {
      const list: User[] = []
      rows.forEach((row: RowDataPacket) => {
        list.push(
          new User(row.id, row.role, row.name, row.emailAddress, row.streetAddress, row.registered, '')
        )
      })
      if (list.length > 0) {
        user = list[0]
      } else {
        throw 'store.saveUser failed.'
      }
    }
  })
}

export function getWorkOrderByNumber(number: number, workOrder: WorkOrder): void {
  connection
    .query(`select * from work_order where number = ${number}`,
      (error: Error, rows: RowDataPacket[]) => {
    if (error) {
      log('getWorkOrderByNumber', error.message)
      throw error.message
    } else {
      const list: WorkOrder[] = []
      rows.forEach((row: RowDataPacket) => {
        list.push(
          new WorkOrder(row.number, row.homeownerId, row.serviceProviderId, row.title, row.issue, row.imageUrl, row.resolution, row.opened, row.closed)
        )
      })
      if (list.length > 0) {
        workOrder = list[0]
      } else {
        throw 'store.getWorkOrderByNumber failed.'
      }
    }
  })
}

export function addWorkOrder(workOrder: WorkOrder): void {
  connection
    .query('insert into work_order (homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed) values (?, ?, ?, ?, ?, ?, ?, ?)',
     [workOrder.homeownerId, workOrder.serviceProviderId, workOrder.title, workOrder.issue, workOrder.imageUrl, workOrder.resolution, workOrder.opened, workOrder.closed],
     (error: Error | null, result: OkPacket) => {
    if (error) {
      log('addWorkOrder', error.message)
    } else {
      workOrder.number = result.insertId
      log('addWorkOrder', `succeeded for number: ${workOrder.number}`)
    }
  })
}


export function saveWorkOrder(workOrder: WorkOrder): void {
  connection
    .query('update work_order set homeownerId = ?, serviceProviderId = ?, title = ?, issue = ?, imageUrl = ?, resolution = ?, opened = ?, closed = ? where number = ?',
     [workOrder.homeownerId, workOrder.serviceProviderId, workOrder.title, workOrder.issue, workOrder.imageUrl, workOrder.resolution, workOrder.opened, workOrder.closed, workOrder.number], 
     (error: Error | null, result: OkPacket) => {
    if (error) {
      log('saveWorkOrder', error.message)
      throw error.message
    } else {
      if (result.affectedRows > 0) {
        log('saveWorkOrder', `succeeded for number: ${workOrder.number}`)
      } else {
        throw 'store.saveWorkOrder failed.'
      }
    }
  })
}

export function addUser(user: User): void {
  connection
    .query('insert into user (role, name, emailAddress, streetAddress, registered, pin) values (?, ?, ?, ?, ?, ?)',
     [user.role, user.name, user.emailAddress, user.streetAddress, user.registered, user.pin],
     (error: Error | null, result: OkPacket) => {
    if (error) {
      log('addUser', error.message)
    } else {
      user.id = result.insertId
      log('addUser', `succeeded for id: ${user.id}`)
    }
  })
}

export function saveUser(user: User): void {
  connection
    .query('update user set role = ?, name = ?, emailAddress = ?, streetAddress = ?, registered = ?, pin = ? where id = ?',
     [user.role, user.name, user.emailAddress, user.streetAddress, user.registered, user.pin, user.id],
     (error: Error | null, result: OkPacket) => {
    if (error) {
      log('saveUser', error.message)
      throw error.message
    } else {
      if (result.affectedRows > 0) {
        log('saveUser', `succeeded for id: ${user.id}`)
      } else {
        throw 'store.saveUser failed.'
      }
    }
  })
}

export function saveImageUrl(number: number, url: string): void {
  connection
    .query('update work_order set imageUrl = ? where number = ?',
      [url, number],
      (error: Error | null, result: OkPacket) => {
    if (error) {
      log('saveImageUrl', error.message)
      throw error.message
    } else {
      if (result.affectedRows > 0) {
        log('saveImageUrl', `succeeded for number: ${number} and url: ${url}`)
      } else {
        throw 'store.saveImageUrl failed.'
      }
    }
  })
}