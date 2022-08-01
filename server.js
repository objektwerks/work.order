import Store from './server/store.js';
import Service from './server/service.js';
import express from 'express';

const url = process.env.DATABASE_URL;
const store = new Store(url);
const service = new Service(store)

const server = express();
server.use( express.static('client') )
server.use(express.json());

server.post('/register', (request, response) => {
  response.send('registered user: ' + request.body);
});

server.post('/login', (request, response) => {
  response.send('logged in user: ' + request.body);
});

server.get('/users', (request, response) => {
  response.send('users');
});

server.get('/users/:email_address', (request, response) => {
  response.send('user by email address: ' + request.params.name);
});

server.post('/users/save', (request, response) => {
  response.send('user saved: ' + request.body);
});

server.get('/workorders/:homeowner_id', (request, response) => {
  response.send('workorder by homeowner id: ' + request.params.number);
});

server.get('/workorders/:serviceprovider_id', (request, response) => {
  response.send('workorder by service provider id: ' + request.params.number);
});

server.post('/workorders/save', (request, response) => {
  response.send('workorder saved: ' + request.body);
});

const port = process.env.PORT || 3000;
const host = "127.0.0.1";
server.listen(port, host, () =>
  console.log(`*** server is running @ http://${host}:${port}/`)
);