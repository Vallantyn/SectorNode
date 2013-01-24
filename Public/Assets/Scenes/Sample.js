/*global define:true*/

'use strict';

define('Asset.Scene/Sample',

['Scene', 'Screen', 'UI','Asset.GameObject/Ship', 'Asset.GameObject/PlayerDistant', 'Asset.GameObject/StarField', 'GameObject'],

function (Scene, Screen, UI, Ship, Ally, StarField, GameObject)
{
    return function ()
    {
        var scene = new Scene(),
        starfield = new StarField();

        var users = {};

        scene.AddObject(starfield);

        function getUser()
        {
            var user = prompt('Hi, type your login to Create an account or for sign-in', localStorage.getItem('sectornode.user'));

            if (typeof user === typeof null) getUser();
            else return user;
        }

        socket.on('log', function (d)
        {
            console.log(d);
        });

        socket.on('connect', function ()
        {
            //var txt = new GameObject();
            //txt.transform.Translate({ x: Screen.bounds.width /2, y: Screen.bounds.height /2 });

            /*var div = document.createElement('div');
            div.style.position = 'absolute';
            var form = document.createElement('form');
            var input = document.createElement('input');
            input.placeholder

            document.body.appendChild(div);
            */
            //UI.CreateTextInput('username');

            /*var label = {
                active: true,
                UI: function ()
                {
                    Screen.context.textBaseline = 'middle';
                    UI.Label('Username :', txt.transform.position.Add({ x: -(Screen.context.measureText('Username').width + 10), y: 0 }));

                    UI.TextField('username', txt.transform.position.Add({ x: (Screen.context.measureText('Username').width + 10), y: 0 }),
                        { x: 200, y: 24 }, localStorage.getItem('sectornode.user'));

                    if (UI.Button('Login', txt.transform.position.Add({ x: (Screen.context.measureText('Username').width + 220), y: 0 })))
                    {

                        console.log('blub');
                        localStorage.setItem('sectornode.user', document.getElementById('username').value);

                        socket.emit('user', { user: localStorage.getItem('sectornode.user') }, function (name)
                        {
                            var ship = new Ship();
                            ship.transform.Translate({ x: Screen.bounds.width * Math.random(), y: Screen.bounds.height * Math.random() });

                            var label = {
                                active: true,
                                UI: function ()
                                {
                                    UI.Label(name, ship.transform.position.Add({ x: 0, y: 50 }));
                                }
                            }

                            ship.AddComponent(label);

                            scene.RemoveObject(txt);
                            scene.AddObject(ship);

                            console.info('<Server> =Connected= as %s', localStorage.getItem('sectornode.user'));
                        });
                        this.active = false;
                    }
                }
            };

            txt.AddComponent(label);

            scene.AddObject(txt);

            /*if (!!localStorage.getItem('sectornode.user'))
            {
                if (!confirm('Do you want to sign-in as ' + localStorage.getItem('sectornode.user') + ' ?'))
                    localStorage.setItem('sectornode.user', getUser());
            }
            else localStorage.setItem('sectornode.user', getUser());

            socket.emit('user', { user: localStorage.getItem('sectornode.user') }, function (name)
            {
                var ship = new Ship();
                ship.transform.Translate({ x: Screen.bounds.width * Math.random(), y: Screen.bounds.height * Math.random() });

                var label = {
                    active: true,
                    UI: function ()
                    {
                        UI.Label(name, ship.transform.position.Add({ x: 0, y: 50 }));
                    }
                }

                ship.AddComponent(label);

                scene.AddObject(ship);

                console.info('<Server> =Connected= as %s', localStorage.getItem('sectornode.user'));
            });*/
        });

        socket.on('distant connect', function (name)
        {
            console.log(name);

            var ship = new Ally();
            ship.transform.Translate({ x: Screen.bounds.width * Math.random(), y: Screen.bounds.height * Math.random() });

            var label = {
                active: true,
                UI: function ()
                {
                    UI.Label(name.name, ship.transform.position.Add({ x: 0, y: 50 }));
                }
            };

            ship.AddComponent(label);

            scene.AddObject(ship);

            users[name.name] = ship;
        });


        socket.on('user disconnect', function (user)
        {
            scene.RemoveObject(users[user.name]);
            delete users[user.name];
        });

        return scene;
    };
});