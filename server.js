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
  response.send('registered ' + request.body);
});

server.post('/login', (request, response) => {
  response.send('logged in: ' + request.body);
});

server.get('/users', (request, response) => {
  response.send('users');
});

server.get('/users/:name', (request, response) => {
  response.send('user name: ' + request.params.name);
});

server.post('/users/add', (request, response) => {
  response.send('user added: ' + request.body);
});

server.post('/users/update', (request, response) => {
  response.send('user updated: ' + request.body);
});

server.get('/workorders', (request, response) => {
  response.send('workorders');
});

server.get('/workorders/:number', (request, response) => {
  response.send('workorder number: ' + request.params.number);
});

server.post('/workorders/add', (request, response) => {
  response.send('workorder added: ' + request.body);
});

server.post('/workorders/update', (request, response) => {
  response.send('workorders updated: ' + request.body);
});

server.post('/workorders/close', (request, response) => {
  response.send('workorder closed: ' + request.body);
});

const port = process.env.PORT || 3000;
const host = "127.0.0.1";
server.listen(port, host, () =>
  console.log(`*** nodejs-express server running at http://${host}:${port}/`),
  service.ping()
);