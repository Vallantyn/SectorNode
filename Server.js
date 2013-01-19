'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);

//#region DB

//#endregion

var io = require('socket.io').listen(server);

io.set('loglevel', 1);

var port = process.env.PORT;

console.log('listening on port: ' + port);
server.listen(port);

app.use(express.static(__dirname + '/Public'));
app.set('views', __dirname + '/Views');

app.get('/', function (request, response)
{
    response.render('Main.jade');
});

console.log('<Server> App started dood');

require('./Public/Script/Network/Main.js').init(io);
//require('./game.js').init(io);