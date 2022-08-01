import mysql from 'mysql';

const ADMIN = 'admin';
const HOMEOWNER = 'homeowner';
const SERVICE_PROVIDER = 'service provider';

const url = process.env.DATABASE_URL;
const connection = mysql.createConnection(url);