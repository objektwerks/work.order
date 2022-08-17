// @ts-check
import store from './server/store.js';
import emailer from './server/emailer.js';
import service from './server/service.js';
import Router from './server/router.js';

store();
emailer();
service();

const router = new Router(service);