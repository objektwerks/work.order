const ADMIN = 'admin';
const HOMEOWNER = 'homeowner';
const SERVICE_PROVIDER = 'service provider';

export default class Service {
  constructor(store) {
    this.store = store;
    console.log("*** service is running ...");
  }
}