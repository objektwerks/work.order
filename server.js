// @ts-check
import store from './server/store.js';
import emailer from './server/emailer.js';
import Service from './server/service.js';
import Router from './server/router.js';

store();
emailer();

const service = new Service(store, emailer);
const router = new Router(service);