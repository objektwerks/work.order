import store from './server/store.js';
import emailer from './server/emailer.js';
import service from './server/service.js';
import router from './server/router.js';

store();
emailer();
service();
router();