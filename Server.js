'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io').listen(server);

io.set('loglevel', 1);

var port = process.env.port || 8042;

server.listen(port);

app.use(express.static(__dirname + '/Public'));
app.set('views',__dirname + '/Views');

app.get('/', function (request, response)
{
    response.render('Main.jade');

});

//require('./game.js').init(io);