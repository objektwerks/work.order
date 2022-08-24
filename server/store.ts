// @ts-check
import mysql, { MysqlError, Pool } from 'mysql';
import { User, WorkOrder } from '../shared/entity.js';

const url: string = process.env.DATABASE_URL as string;
const connection: Pool = mysql.createPool(url);

function log(method: string, message: string) {
  console.log('*** store.${method}: ', message);
}

export default () => {
  console.log('*** store connected ...');
}

export function disconnect() {
  connection.end();
  console.log('*** store disconnected from database.');
}

export function listWorkOrdersByUserId(id: number) {
  let list: WorkOrder[] = [];
  connection.query(`select * from work_order where homeowner_id = ${id} or service_provider_id = ${id} order by opened desc`, (error: MysqlError, rows) => {
    if (error) {
      log('listWorkOrdersByUserId', error.message);
    } else {
      rows.forEach((row) => {
        list.push(
          new WorkOrder(row.number, row.homeowner_id, row.service_provider_id, row.title, row.issue, row.image_url, row.resolution, row.opened, row.closed)
        )
      });
    }
  });
  return list;
}

export function listUsersByRole(role: string) {
  let list: User[] = [];
  connection.query(`select * from user where role = ${role} order by name asc`, (error: MysqlError, rows) => {
    if (error) {
      log('listUsersByRole', error.message);
    } else {
      rows.forEach((row) => {
        list.push(
          new User(row.id, row.role, row.name, row.email_address, row.street_address, row.registered, '')
        )
      });
    }
  });
  return list;
}

export function getUserByEmailAddressPin(emailAddress: string, pin: string) {
  let list: User[] = [];
  connection.query(`select * from user where email_address = ${emailAddress} and pin = ${pin}`, (error: MysqlError, rows) => {
    if (error) {
      log('getUserByEmailAddressPin', error.message);
    } else {
      rows.forEach((row) => {
        list.push(
          new User(row.id, row.role, row.name, row.email_address, row.street_address, row.registered, '')
        )
      });
    }
  });
  return (list.length > 0) ? list[0] : {};
}

export function getWorkOrderByNumber(number: number) {
  let list: WorkOrder[] = [];
  connection.query(`select * from work_order where number = ${number}`, (error: MysqlError, rows) => {
    if (error) {
      log('getWorkOrderByNumber', error.message);
    } else {
      rows.forEach((row) => {
        list.push(
          new WorkOrder(row.number, row.homeowner_id, row.service_provider_id, row.title, row.issue, row.image_url, row.resolution, row.opened, row.closed)
        )
      });
    }
  });
  return (list.length > 0) ? list[0] : {};
}

export function addWorkOrder(workOrder: WorkOrder) {
  let number: number = 0;
  connection.query('insert into work_order set ?', workOrder, (error: MysqlError, result) => {
    if (error) {
      log('addWorkOrder', error.message);
    } else {
      number = result.insertId;
      log('addWorkOrder', `succeeded for number: ${number}`);
    }
  });
  return number;
}

export function addUser(user: User) {
  let id: number = 0;
  connection.query('insert into user set ?', user, (error: MysqlError, result) => {
    if (error) {
      log('addUser', error.message);
    } else {
      id = result.insertId;
      log('addUser', `succeeded for id: ${id}`);
    }
  });
  return id;
}

export function saveWorkOrder(workOrder: WorkOrder) {
  let count: number = 0;
  connection.query('update work_order SET ? where number = ?', [workOrder, workOrder.number], (error: MysqlError, result) => {
    if (error) {
      log('saveWorkOrder', error.message);
    } else {
      count = result.affectedRows;
      log('saveWorkOrder', `succeeded for number ${workOrder.number}`);
    }
  });
  return count;
}

export function saveUser(user: User) {
  let count: number = 0;
  connection.query('update user SET ? where id = ?', [user, user.id], (error: MysqlError, result) => {
    if (error) {
      log('saveUser', error.message);
    } else {
      count = result.affectedRows;
      log('saveUser', `succeeded for id ${user.id}`);
    }
  });
  return count;
}

export function saveImageUrl(number: number, url: string) {
  let count: number = 0;
  connection.query(`update work_order SET image_url = ${url} where number = ${number}`, (error: MysqlError, result) => {
    if (error) {
      log('saveImageUrl', error.message);
    } else {
      count = result.affectedRows;
      log('saveImageUrl', `succeeded for number: ${number} url: ${url}`);
    }
  });
  return count;
}