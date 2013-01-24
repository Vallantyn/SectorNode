'use strict';

var users = {};
var partys = {};

exports.connect = function (socket, user)
{
    socket.broadcast.emit('distant connect', user);

    for (var usr in users)
    {
        socket.emit('distant connect', users[usr]);
    }

    for (var party in partys)
    {
        socket.emit('new party', users[party]);
    }

    users[user._id] = user;

    socket.on('disconnect', function ()
    {
        console.log(user.name + ' Disconnected');
        socket.broadcast.emit('user disconnect', user._id);

        delete users[user._id];
        delete partys[user._id];
    });

    socket.on('get users', function (toto, fn)
    {
        console.log('--- GET USERS ---');
        fn(users);
    });

    socket.on('create party', function (party, callback)
    {
        if (party in partys)
        {
            console.log('party ' + party + ' already exist')
        }
        else
        {
            partys[user._id] = {};

            console.log(user.name + ' Created a Party !');

            socket.join(user._id);
            callback(user._id);
        }
    });

    socket.on('join party', function (party, callback)
    {
        if (party in partys)
        {
            if (user._id in partys[party])
            {
                console.log(user.name + ' is already in party ' + party);
                callback(false);
            }
            else
            {
                socket.join(party);
                partys[party][user._id] = user;
                callback(true);
            }
        }
        else
        {
            console.log('party ' + party + ' doesn\'t exist');
            callback(false);
        }
    });

    socket.on('leave party', function (party)
    {
        if (party in partys)
        {
            if (user._id in partys[party])
            {
                socket.leave(party);
                delete partys[party][user._id];
            }
            else console.log(user.name + ' already leave or wasn\'t in party ' + party);
        }
        else
        {
            console.log('party ' + party + ' doesn\'t exist')
        }
    });
};