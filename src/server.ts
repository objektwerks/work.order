// @ts-check
import store from './server/store';
import emailer from './server/emailer';
import service from './server/service';
import router from './server/router';

store();
emailer();
service();
router();