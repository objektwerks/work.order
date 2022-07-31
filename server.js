import express from 'express';

var server = express();
server.use( express.static('public') )
server.use(express.json());

server.get('/register', (request, response) => {
  response.send('register');
});

server.post('/register/add', (request, response) => {
  response.send('registration added: ' + request.body);
});

server.post('/register/update', (request, response) => {
  response.send('registration updated: ' + request.body);
});

server.get('/login', (request, response) => {
  response.send('logged in: ' + request.body);
});

server.get('/users', (request, response) => {
  response.send('users');
});

server.get('/user/:name', (request, response) => {
  response.send('user name: ' + request.params.name);
});

server.post('/user/add', (request, response) => {
  response.send('user added: ' + request.body);
});

server.post('/user/update', (request, response) => {
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

server.get('/workorders/close/:number', (request, response) => {
  response.send('workorder closed on number: ' + request.params.number);
});

var port = process.env.PORT || 3000;
var host = "127.0.0.1";
server.listen(port, host, () =>
  console.log(`*** nodejs-express server running at http://${host}:${port}/`)
);