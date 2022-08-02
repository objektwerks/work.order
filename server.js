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

server.get('/users/:role', (request, response) => {
  response.send('users by role: ' + request.params.name);
});

server.post('/users/save', (request, response) => {
  response.send('user saved: ' + request.body);
});

server.get('/workorders/homeowner/:id', (request, response) => {
  response.send('workorder by homeowner id: ' + request.params.number);
});

server.get('/workorders/serviceprovider/:id', (request, response) => {
  response.send('workorder by service provider id: ' + request.params.number);
});

server.post('/workorders/save', (request, response) => {
  response.send('workorder saved: ' + request.body);
});

const port = process.env.PORT || 3000;
const host = process.env.BIND_IP || "127.0.0.1";
server.listen(port, host, () =>
  console.log(`*** server is running @ http://${host}:${port}/`),
  console.log(`*** new pin verified: ${newPin()}`)
);