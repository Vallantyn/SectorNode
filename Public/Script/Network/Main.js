'use strict';

exports.init = function (uname, io)
{
    io.sockets.on('connection', function (socket)
    {
        socket.emit('logclient');
        require('./Database.js').login(uname, socket);
    });
};