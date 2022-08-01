import mysql from 'mysql';

class Store {
  constructor(url) {
    this.url = url;
    this.connection = mysql.createConnection(url);
  }

  ping() {
    console.log("*** Store is running ...")
  }
}