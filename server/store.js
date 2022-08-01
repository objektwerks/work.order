import mysql from 'mysql';

const url = process.env.DATABASE_URL;
const connection = mysql.createConnection(url);