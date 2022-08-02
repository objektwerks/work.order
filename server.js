import Store from './server/store.js';
import Service from './server/service.js';
import Emailer from './server/emailer.js';
import { newPin } from './server/pin.js';

import compression from 'compression';
import express from 'express';

const url = process.env.DATABASE_URL;
const store = new Store(url);

const emailHost = process.env.EMAIL_HOST;
const emailPort = process.env.EMAIL_PORT;
const emailSender = process.env.EMAIL_SENDER;
const emailPassword = process.env.EMAIL_PASSWORD;
const emailer = new Emailer(emailHost, emailPort, emailSender, emailPassword);

const service = new Service(store, emailer);

const server = express();

server.use(compression());
server.use( express.static('client') )
server.use(express.json());

server.post('/register', (request, response) => {
  response.send('registered user: ' + request.body);
});

server.post('/login', (request, response) => {
  response.send('logged in user: ' + request.body);
});

server.post('/workorders/save', (request, response) => {
  response.send('workorder saved: ' + request.body);
});

server.get('/workorders/refresh', (request, response) => {
  response.send('workorders refreshed: ' + request.params.number);
});

server.get('/workorders/refresh/:number', (request, response) => {
  response.send('workorder refreshed by number: ' + request.params.number);
});

server.post('/users/save', (request, response) => {
  response.send('user saved: ' + request.body);
});

const port = process.env.PORT || 3000;
const host = process.env.BIND_IP || "127.0.0.1";
const http = server.listen(port, host, () =>
  console.log(`*** server is running @ http://${host}:${port}/`),
  console.log(`*** new pin verified: ${newPin()}`)
);

process.on('SIGINT', () => {
  http.close(() => {
    shutdown();
  });
});

process.on('SIGTERM', () => {
  http.close(() => {
    shutdown();
  });
});

function shutdown() {
  console.log('*** server shutting down ...');
  store.disconnect();
  console.log('*** server shutdown.');
  process.exit();
}