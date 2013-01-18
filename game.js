'use strict';

exports.init = function (io)
{
    io.sockets.on('connection', function (socket)
    {

        socket.broadcast.emit('request', function (data)
        {
            socket.broadcast.emit('new player', { X: data.X, Y: data.Y, C: '#7F7', ID: data.ID });
        });

        function generateId()
        {
            return Math.round(Math.random() * 999999999);
        }

        var id = generateId();
        var X = 100 + Math.round((Math.random() - 1) * 200);
        var Y = 250 + Math.round((Math.random() - 1) * 400);

        socket.emit('connect', { X: X, Y: Y, C: '#77F', ID: id });
        socket.broadcast.emit('new player', { X: X, Y: Y, C: '#7F7', ID: id });

        socket.on('update', function (data)
        {
            socket.broadcast.emit('update', data);
        });
    });
};