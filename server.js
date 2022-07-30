import express from 'express';

var server = express();
server.use( express.static('public') )

server.get('/register', (req, res) => {
  res.send('register');
});

server.get('/login', (req, res) => {
  res.send('register');
});

server.get('/users', (req, res) => {
  res.send('users');
});

server.get('/user/:name', (req, res) => {
  res.send('user name' + req.params.name);
});

server.get('/workorders', (req, res) => {
  res.send('workorders');
});

server.get('/workorders/:number', (req, res) => {
  res.send('workorder number' + req.params.number);
});

var host = "127.0.0.1";
var port = 1337;
server.listen(port, host, () =>
  console.log('Running server at http://localhost:' + port + '/')
);