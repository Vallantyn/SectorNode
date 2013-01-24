'use strict';

function logError(error)
{
    console.log('[' + error + ']');
}

var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('connecting', function ()
{
    console.log('<DataBase> [Connecting] to DataBase...');
});
db.on('connected', function ()
{
    console.log('<DataBase> [Connected] !!!');
});
db.on('open', function ()
{
    console.log('<DataBase> [Opened].');
});

db.on('disconnecting', function ()
{
    console.log('<DataBase> [Disconnecting] from DataBase...');
});
db.on('disconnected', function ()
{
    console.log('<DataBase> [Disconnected] !!!');
});
db.on('close', function ()
{
    console.log('<DataBase> [Closed].');
});

db.on('error', function ()
{
    console.log('<DataBase> [<!> =ERROR= <!>]');
});

var userScheme = new mongoose.Schema({
    name: { type: String, match: /^[a-zA-Z0-9-_]+$/ },
    lvl: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    creation: { type: Date, default: Date.now },
    lastlogin: { type: Date, default: Date.now }
});

userScheme.pre('init', function (next)
{
    console.log('<DataBase> [Initating] User ...');
    next();
});
userScheme.post('init', function (usr)
{
    console.log('<DataBase> User (%s)<%s> [Initiated].', usr.id, usr.name);
});

userScheme.pre('validate', function (next)
{
    console.log('<DataBase> [Validating] User ...');
    next();
});
userScheme.post('validate', function (usr)
{
    console.log('<DataBase> User (%s)<%s> [Validated].', usr.id, usr.name);
});

userScheme.pre('save', function (next)
{
    console.log('<DataBase> [Saving] User ...');
    next();
});
userScheme.post('save', function (usr)
{
    console.log('<DataBase> User (%s)<%s> [Saved].', usr.id, usr.name);
});

userScheme.pre('remove', function (next)
{
    console.log('<DataBase> [Removing] User ...');
    next();
});
userScheme.post('remove', function (usr)
{
    console.log('<DataBase> User (%s)<%s> [Removed].', usr.id, usr.name);
});

var User = mongoose.model('User', userScheme);

exports.login = function (uname, socket)
{
    console.log('<Server> - Incoming Connexion -');

    if (db) db.close();

    mongoose.connect('mongodb://' + process.env.MONGO_LOGIN +
                              ':' + process.env.MONGO_PASS +
                           '@ds0' + process.env.MONGO_PORT +
                 '.mongolab.com:' + process.env.MONGO_PORT +
                              '/' + process.env.MONGO_DB,
                              function (err)
                              {
                                  if (err) logError(err);
                              });

    db.once('open', function ()
    {
        function signIn(err, result)
        {
            if (err) logError(err);

            if (!!result)
            {
                User.update({ name: result.name }, { lastlogin: new Date() }, function (err)
                {
                    if (err) logError(err);

                    var usr = JSON.stringify(result);
                    socket.set('user', usr, function ()
                    {
                        socket.on('logged in', function ()
                        {
                            require('./Users').connect(socket, result);
                        });

                        socket.emit('logged in', result);

                        db.close();
                    });
                });
            }
            else
            {
                user.save(function (err)
                {
                    if (err) logError(err);

                    var usr = JSON.stringify(result);
                    socket.set('user', usr, function ()
                    {
                        socket.on('logged in', function ()
                        {
                            require('./Users').connect(socket, user);
                        });

                        socket.emit('logged in', user);

                        db.close();
                    });
                });
            }
        }

        var user = new User({ name: uname });
        console.log('<Database> Looking for: %s', user.name);

        User.findOne(null)
                 .where('name', user.name)
                 .exec(signIn);
    });
};