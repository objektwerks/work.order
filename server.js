import express from 'express';

var server = express();
server.use( express.static('public') )

server.get('/register', (request, response) => {
  response.send('register');
});

server.get('/login', (request, response) => {
  response.send('login');
});

server.get('/users', (request, response) => {
  response.send('users');
});

server.get('/user/:name', (request, response) => {
  response.send('user name' + request.params.name);
});

server.get('/workorders', (request, response) => {
  response.send('workorders');
});

server.get('/workorders/:number', (request, response) => {
  response.send('workorder number' + request.params.number);
});

var host = "127.0.0.1";
var port = 1337;
server.listen(port, host, () =>
  console.log('Running server at http://localhost:' + port + '/')
);