'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io').listen(server);

io.set('loglevel', 1);

var port = process.env.PORT;

console.log('listening on port: ' + port);
server.listen(port);

app.use(express.static(__dirname + '/Public'));
app.use(express.bodyParser());

app.set('views', __dirname + '/Views');

app.get('/', function (request, response)
{
    response.render('Main.jade');
    console.log('<Server> App started dood');
});

io.sockets.on('connection', function (socket)
{
    //socket.emit('online');

    socket.on('login', function (username)
    {
        require('./Public/Script/Network/Database.js').login(username, socket);
    });
});