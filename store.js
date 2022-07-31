import mysql from 'mysql';

const ADMIN = 'admin';
const HOMEOWNER = 'homeowner';
const LAWNCARE_PROVIDER = 'lawncare provider';

var url = process.env.DATABASE_URL;