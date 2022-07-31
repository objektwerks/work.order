import mysql from 'mysql';

const ADMIN = 'admin';
const HOMEOWNER = 'homeowner';
const LAWNCARE_PROVIDER = 'lawncare provider';

const url = process.env.DATABASE_URL;
const connection = mysql.createConnection(url);