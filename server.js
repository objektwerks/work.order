import Store from './server/store.js';
import Emailer from './server/emailer.js';
import Service from './server/service.js';
import Router from './server/router.js';

const url = process.env.DATABASE_URL;
const store = new Store(url);

const emailHost = process.env.EMAIL_HOST;
const emailPort = process.env.EMAIL_PORT;
const emailSender = process.env.EMAIL_SENDER;
const emailPassword = process.env.EMAIL_PASSWORD;
const emailer = new Emailer(emailHost, emailPort, emailSender, emailPassword);

const service = new Service(store, emailer);

const router = new Router(service);