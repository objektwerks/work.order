import Store from './server/store.js';
import Service from './server/service.js';
import express from 'express';

const url = process.env.DATABASE_URL;
const store = new Store(url);
const service = new Service(store)

const server = express();
server.use( express.static('client') )
server.use(express.json());

server.post('/register/homeowner', (request, response) => {
  response.send('registered homeowner: ' + request.body);
});

server.post('/register/serviceprovider', (request, response) => {
  response.send('registered service provider: ' + request.body);
});

server.post('/login', (request, response) => {
  response.send('logged in: ' + request.body);
});

server.get('/homeowners', (request, response) => {
  response.send('homeowners');
});

server.get('/homeowners/:email_address', (request, response) => {
  response.send('homeowner by email address: ' + request.params.name);
});

server.post('/homeowners/save', (request, response) => {
  response.send('homeowner saved: ' + request.body);
});

server.get('/serviceproviders', (request, response) => {
  response.send('service providers');
});

server.get('/serviceproviders/:email_address', (request, response) => {
  response.send('service provider by email address: ' + request.params.name);
});

server.post('/serviceproviders/save', (request, response) => {
  response.send('service provider saved: ' + request.body);
});

server.get('/workorders', (request, response) => {
  response.send('workorders');
});

server.get('/workorders/:number', (request, response) => {
  response.send('workorder by number: ' + request.params.number);
});

server.post('/workorders/save', (request, response) => {
  response.send('workorder saved: ' + request.body);
});

const port = process.env.PORT || 3000;
const host = "127.0.0.1";
server.listen(port, host, () =>
  console.log(`*** server is running @ http://${host}:${port}/`)
);