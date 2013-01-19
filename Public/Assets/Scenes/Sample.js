/*global define:true*/

'use strict';

define('Asset.Scene/Sample',

['Scene', 'Screen', 'UI','Asset.GameObject/Ship', 'Asset.GameObject/PlayerDistant', 'Asset.GameObject/StarField'],

function (Scene, Screen, UI, Ship, Ally, StarField)
{
    return function ()
    {
        var scene = new Scene(),
        starfield = new StarField();

        var users = [];

        scene.AddObject(starfield);

        function getUser()
        {
            var user = prompt('Hi, type your login to Create an account or for sign-in', localStorage.getItem('sectornode.user'));

            if (typeof user === typeof null) getUser();
            else return user;
        }

        socket.on('connect', function ()
        {
            if (!!localStorage.getItem('sectornode.user'))
            {
                if (!confirm('Do you want to sign-in as ' + localStorage.getItem('sectornode.user') + ' ?'))
                    localStorage.setItem('sectornode.user', getUser());
            }
            else localStorage.setItem('sectornode.user', getUser());

            socket.emit('user', { user: localStorage.getItem('sectornode.user') }, function ()
            {
                var ship = new Ship();
                ship.transform.Translate({ x: Screen.bounds.width * Math.random(), y: Screen.bounds.height * Math.random() });

                var label = {
                    active: true,
                    UI: function ()
                    {
                        UI.Label(localStorage.getItem('sectornode.user'), ship.transform.position.Add({ x: 0, y: 50 }));
                    }
                }

                ship.AddComponent(label);

                scene.AddObject(ship);

                console.info('<Server> =Connected= as %s', localStorage.getItem('sectornode.user'));
            });
        });

        socket.on('distant connect', function ()
        {
            var ship = new Ally();
            ship.transform.Translate({ x: Screen.bounds.width * Math.random(), y: Screen.bounds.height * Math.random() });
            scene.AddObject(ship);

            users.push(ship);
        });


        socket.on('user disconnect', function ()
        {
            scene.RemoveObject(users[users.length - 1]);
            users.pop();
        });

        return scene;
    };
});