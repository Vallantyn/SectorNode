'use strict';

var users = 0;

exports.init = function (io)
{
    io.sockets.on('connection', function (socket)
    {

        console.log('NEW CONNECTION DOOD MOTHERFUCKER');

        socket.broadcast.emit('distant connect');

        socket.on('blah', function ()
        {
            console.log('BLAH DOOD BLAH');
        });

        for (var i = 0; i < users; i++)
        {
            socket.emit('distant connect');
        }

        socket.broadcast.on('distant connect', function ()
        {
            socket.broadcast.emit('connect request');
        });

        socket.on('disconnect', function (d)
        {
            socket.broadcast.emit('user disconnect');

            users--;
            console.log(d);
        });

        users++;
    });
};