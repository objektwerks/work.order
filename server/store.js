// @ts-check
import mysql from 'mysql';
import { User, WorkOrder } from '../shared/entity.js';

const url = process.env.DATABASE_URL;
const connection = mysql.createPool(url);

export default () => {
  console.log('*** connected to store ...');
}

function disconnect() {
  this.connection.end();
  console.log('*** disconnected from store.');
}

function log(method, message) {
  console.log('*** store.${method}: ', message);
}

export function listWorkOrdersByUserId(id) {
  let list = [];
  connection.query(`select * from work_order where homeowner_id = ${id} or service_provider_id = ${id} order by opened desc`, (error, rows) => {
    if (error) {
      log('listWorkOrdersByUserId', error);
    } else {
      rows.forEach((row) => {
        list.push(
          WorkOrder.create(row.number, row.homeowner_id, row.service_provider_id, row.title, row.issue, row.image_url, row.resolution, row.opened, row.closed)
        )
      });
    }
  });
  return list;
}

export function listUsersByRole(role) {
  let list = [];
  connection.query(`select * from user where role = ${role} order by name asc`, (error, rows) => {
    if (error) {
      log('listUsersByRole', error);
    } else {
      rows.forEach((row) => {
        list.push(
          User.create(row.id, row.role, row.name, row.email_address, row.street_address, row.registered)
        )
      });
    }
  });
  return list;
}

export function getUserByEmailAddressPin(emailAddress, pin) {
  let list = [];
  connection.query(`select * from user where email_address = ${emailAddress} and pin = ${pin}`, (error, rows) => {
    if (error) {
      log('getUserByEmailAddressPin', error);
    } else {
      rows.forEach((row) => {
        list.push(
          User.create(row.id, row.role, row.name, row.email_address, row.street_address, row.registered)
        )
      });
    }
  });
  return (list.length > 0) ? list[0] : {};
}

export function getWorkOrderByNumber(number) {
  let list = [];
  connection.query(`select * from work_order where number = ${number}`, (error, rows) => {
    if (error) {
      log('getWorkOrderByNumber', error);
    } else {
      rows.forEach((row) => {
        list.push(
          WorkOrder.create(row.number, row.homeowner_id, row.service_provider_id, row.issue, row.image_url, row.resolution, row.opened, row.closed)
        )
      });
    }
  });
  return (list.length > 0) ? list[0] : {};
}

export function addWorkOrder(workorder) {
  let number = 0;
  connection.query('insert into work_order set ?', workorder, (error, result) => {
    if (error) {
      log('addWorkOrder', error);
    } else {
      number = result.insertId;
      log('addWorkOrder', `succeeded for number: ${number}`);
    }
  });
  return number;
}

export function addUser(user) {
  let id = 0;
  connection.query('insert into user set ?', user, (error, result) => {
    if (error) {
      log('addUser', error);
    } else {
      id = result.insertId;
      log('addUser', `succeeded for id: ${id}`);
    }
  });
  return id;
}

export function saveWorkOrder(workorder) {
  let count = 0;
  connection.query('update work_order SET ? where number = ?', [workorder, workorder.number], (error, result) => {
    if (error) {
      log('saveWorkOrder', error);
    } else {
      count = result.affectedRows;
      log('saveWorkOrder', `succeeded for number ${workorder.number}`);
    }
  });
  return count;
}

export function saveUser(user) {
  let count = 0;
  connection.query('update user SET ? where id = ?', [user, user.id], (error, result) => {
    if (error) {
      log('saveUser', error);
    } else {
      count = result.affectedRows;
      log('saveUser', `succeeded for id ${user.id}`);
    }
  });
  return count;
}

export function saveImageUrl(url, number) {
  let count = 0;
  connection.query(`update work_order SET image_url = ${url} where number = ${number}`, (error, result) => {
    if (error) {
      log('saveImageUrl', error);
    } else {
      count = result.affectedRows;
      log('saveImageUrl', `succeeded for number: ${number} url: ${url}`);
    }
  });
  return count;
}