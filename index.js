var express = require('express');
const winston = require('winston')

var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(8080);
winston.log('info', 'Listening to port 8080...');