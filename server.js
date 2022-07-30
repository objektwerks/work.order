var host = "127.0.0.1";
var port = 1337;
var express = require("express");

var server = express();
server.use( express.static('public') )
server.listen(port, host);

console.log('Running server at http://localhost:' + port + '/');