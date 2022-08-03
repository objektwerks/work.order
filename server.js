import Store from './server/store.js';
import Emailer from './server/emailer.js';
import Service from './server/service.js';
import Router from './server/router.js';

const url = process.env.DATABASE_URL;
const store = new Store(url);

const host = process.env.EMAIL_HOST;
const port = process.env.EMAIL_PORT;
const sender = process.env.EMAIL_SENDER;
const password = process.env.EMAIL_PASSWORD;
const emailer = new Emailer(host, port, sender, password);

const service = new Service(store, emailer);

const router = new Router(service);