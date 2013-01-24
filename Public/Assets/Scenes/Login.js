/*global define:true*/

'use strict';

define('Asset.Scene/Login',

['Scene', 'GameObject', 'Network', 'Screen', 'UI', 'Vector2', 'Asset.Scene/LobbyMain'],

function (Scene, GameObject, socket, Screen, UI, Vector2, Lobby)
{
    return function ()
    {
        var scene = new Scene(),
            login = new GameObject(),
            users = {};

        login.transform.Translate(new Vector2(Screen.bounds.width / 2, Screen.bounds.height / 2));

        var input = document.createElement('input');
        input.type = 'text';
        input.id = 'username';
        input.style.position = 'absolute';
        input.style.opacity = 0;

        function loading(user)
        {
            var circStart = 0,
                circEnd = Math.PI,
                loadingIcon = {
                    active: true,
                    UI: function ()
                    {
                        Screen.context.beginPath();
                        Screen.context.arc(login.transform.position.x + 120, login.transform.position.y, 10, circStart, circEnd);
                        Screen.context.arc(login.transform.position.x + 120, login.transform.position.y, 7, circEnd, circStart, true);
                        Screen.context.closePath();

                        Screen.context.fill();

                        circStart += 0.1;
                        circEnd += 0.1;
                    }
                }

            login.AddComponent(loadingIcon);
            socket.emit('login', user);
        }

        function enterInput(e)
        {
            if (e.keyCode === 13)
            {
                loading(input.value);
            }

            return false;
        }

        input.addEventListener('keydown', enterInput);

        socket.on('logged in', function (userdata)
        {
            var width = Screen.context.measureText('User: ' + userdata.name + ' Lvl' + userdata.lvl).width,
                user = new GameObject();

            user.transform.Translate(new Vector2(Screen.bounds.width - 100, 20));

            var userUI = {
                active: true,
                UI: function ()
                {
                    UI.Label('User: ' + userdata.name + ' Lvl' + userdata.lvl, user.transform.position);
                    UI.Label('Xp: ' + userdata.xp, user.transform.position.Add(new Vector2(0, 20)));
                }
            }

            user.AddComponent(userUI);

            input.removeEventListener('keydown', enterInput);
            document.body.removeChild(input);

            var lobby = new Lobby();
            lobby.AddObject(user);

            var distantUser = new GameObject();
            var distantUserUI = {
                active: true,
                UI: function ()
                {
                    var userArray = Object.keys(users);
                    for (var i = 0; i < userArray.length; i++)
                    {
                        UI.Label(
                            users[userArray[i]].name + ' Lvl' + users[userArray[i]].lvl,
                            distantUser.transform.position.Add(new Vector2(0, 20 * i)),
                            { hover: true, click: false });
                    }
                }
            }

            distantUser.transform.Translate(new Vector2(100, 40));

            distantUser.AddComponent(distantUserUI);
            lobby.AddObject(distantUser);

            socket.on('distant connect', function (userdata)
            {
                console.log(userdata.name + ' connected');
                users[userdata._id] = userdata;
            });

            socket.on('user disconnect', function (id)
            {
                console.log(users[id].name + ' disconnected');
                delete users[id];
            });

            socket.emit('logged in');

            ChangeScene(lobby);
        });

        var loginUI = {
            active: true,
            UI: function ()
            {
                UI.Label('Welcome to Sector Node', login.transform.position.Add(new Vector2(0, -40)));
                UI.Label('Please Log-In', login.transform.position.Add(new Vector2(0, -20)));
                UI.TextField('username', login.transform.position, new Vector2(200, 20), false, { hover: true, click: true });
            }
        };

        document.body.appendChild(input);
        login.AddComponent(loginUI);
        scene.AddObject(login);

        return scene;
    };
});