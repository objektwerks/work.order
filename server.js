import express from 'express';

var server = express();
server.use( express.static('public') )

var host = "127.0.0.1";
var port = 1337;
server.listen(port, host, () =>
  console.log('Running server at http://localhost:' + port + '/')
);