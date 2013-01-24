'use strict';

var socket = io.connect();

socket.on('online', function ()
{
    document.getElementById('server').classList.remove('offline');
    document.getElementById('server').classList.add('online');
});

socket.on('logged in', function (user)
{
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('login-title').style.border = 'none';
    document.getElementById('login-container').style.marginTop = '20px';

    document.getElementById('connected-users').classList.remove('hidden');
    document.getElementById('local-user-menu').classList.remove('hidden');

    var usr = generateUserDiv(user);

    var xp = document.createElement('div');
    xp.innerText = 'Xp: ' + user.xp;
    usr.appendChild(xp);

    document.getElementById('local-user').appendChild(usr);
});

var users = {};

socket.on('distant connect', function (user)
{
    var usr = generateUserDiv(user);

    document.getElementById('connected-users').appendChild(usr);

    users[user._id] = user;
});


socket.on('user disconnect', function (id)
{
    console.log(document.getElementById(id));
    document.getElementById('connected-users').removeChild(document.getElementById(id));
    delete users[id];
});

function Loading()
{
    var user = document.getElementById('login');
    socket.emit('login', user.value);

    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');
}

function EnterKey(e)
{
    if (e.keyCode === 13)
    {
        Loading();
    }

    return false;
}

function createParty()
{
    socket.emit('create party');
}

function generateUserDiv(user)
{
    var usr = document.createElement('div');
    var status = document.createElement('div');
    var name = document.createElement('div');
    status.classList.add('status');
    status.classList.add('online');
    name.classList.add('name');
    name.innerText = 'Lvl ' + user.lvl + ' ' + user.name;
    usr.id = user._id;
    usr.classList.add('user');

    usr.appendChild(status);
    usr.appendChild(name);

    return usr;
}