'use strict';

var users = 0;

function logError(error)
{
    Debug.log('#bold[#magenta[' + error + ']]')
};

var mongoose = require('mongoose'),
    colorize = require('colorize'),
    Debug = colorize.console;

var db = mongoose.connection;
db.on('connecting', function ()
{
    Debug.log('<DataBase> #green[=Connecting=] to DataBase...');
});
db.on('connected', function ()
{
    Debug.log('<DataBase> #bold[#green[=Connected=]] !!!');
});
db.on('open', function ()
{
    Debug.log('<DataBase> #cyan[=Opened=].');
});

db.on('disconnecting', function ()
{
    Debug.log('<DataBase> #magenta[=Disconnecting=] from DataBase...');
});
db.on('disconnected', function ()
{
    Debug.log('<DataBase> #red[=Disconnected=] !!!');
});
db.on('close', function ()
{
    Debug.log('<DataBase> #bold[#red[=Closed=]].');
});

db.on('error', function ()
{
    Debug.log('<DataBase> #bold[#red[<!> =ERROR= <!>]]');
});

var userScheme = new mongoose.Schema({
    name: { type: String, match: /^[a-zA-Z0-9-_]+$/ },
    lvl: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    creation: { type: Date, default: Date.now },
    lastlogin: { type: Date, default: Date.now }
});

userScheme.pre('init', function (next)
{
    Debug.log('<DataBase> #magenta[=Initating=] User ...');
    next();
});
userScheme.post('init', function (usr)
{
    Debug.log('<DataBase> User (#bold[#magenta[%s]])<#magenta[%s]> =Initiated=.', usr.id, usr.name);
});

userScheme.pre('validate', function (next)
{
    Debug.log('<DataBase> #green[=Validating=] User ...');
    next();
});
userScheme.post('validate', function (usr)
{
    Debug.log('<DataBase> User (#bold[#green[%s]])<#green[%s]> =Validated=.', usr.id, usr.name);
});

userScheme.pre('save', function (next)
{
    Debug.log('<DataBase> #cyan[=Saving=] User ...');
    next();
});
userScheme.post('save', function (usr)
{
    Debug.log('<DataBase> User (#bold[#cyan[%s]])<#cyan[%s]> =Saved=.', usr.id, usr.name);
});

userScheme.pre('remove', function (next)
{
    Debug.log('<DataBase> #red[=Removing=] User ...');
    next();
});
userScheme.post('remove', function (usr)
{
    Debug.log('<DataBase> User (#bold[#red[%s]])<#red[%s]> =Removed=.', usr.id, usr.name);
});

var User = mongoose.model('User', userScheme);

exports.init = function (io)
{
    io.sockets.on('connection', function (socket)
    {

        Debug.log('<Server> -#magenta[#bold[Incoming Connexion]]-');

        socket.broadcast.emit('distant connect');

        for (var i = 0; i < users; i++)
        {
            socket.emit('distant connect');
        }

        socket.on('user', function (data, fn)
        {
            if (db) db.close();

            mongoose.connect('mongodb://vallantyn:Sh1w4$h!@ds049237.mongolab.com:49237/sector_node', function (err) { if (err) logError(err); });

            db.once('open', function ()
            {
                function callback(err, result)
                {
                    if (err) logError(err);

                    if (!!result)
                    {
                        User.update({ name: result.name }, { lastlogin: new Date() }, function (err)
                        {
                            if (err) logError(err);

                            db.close();

                            if (fn) fn();
                        });
                    }
                    else
                    {
                        user.save(function (err, blb)
                        {
                            if (err) logError(err);

                            db.close();

                            if (fn) fn();
                        });
                    }
                };

                var user = new User({ name: data.user });
                Debug.log('<Database> Looking for: #cyan[%s]', user.name);

                User.findOne(null)
                         .where('name', user.name)
                         .exec(callback);
            });
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