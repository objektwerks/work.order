import mysql from 'mysql';

export default class Store {
  constructor(url) {
    this.url = url;
    this.connection = mysql.createConnection(url);
    console.log("*** store is running ...")
  }
}