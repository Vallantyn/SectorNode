/*global define:true*/

'use strict';

define('Asset.Scene/Sample',

['Scene', 'Screen', 'Asset.GameObject/Ship', 'Asset.GameObject/PlayerDistant', 'Asset.GameObject/StarField'],

function (Scene, Screen, Ship, Ally, StarField)
{
    return function ()
    {
        var scene = new Scene(),
        starfield = new StarField();

        var users = [];

        scene.AddObject(starfield);

        socket.on('connect', function ()
        {
            var ship = new Ship();
            ship.transform.Translate({ x: Screen.bounds.width * Math.random(), y: Screen.bounds.height * Math.random() });
            scene.AddObject(ship);

            console.log('welcome motherfucker');
        });

        socket.on('distant connect', function ()
        {
            var ship = new Ally();
            ship.transform.Translate({ x: Screen.bounds.width * Math.random(), y: Screen.bounds.height * Math.random() });
            scene.AddObject(ship);

            users.push(ship);

            console.log('new distant motherfucker added');

            socket.emit('blah');
        });


        socket.on('user disconnect', function ()
        {
            scene.RemoveObject(users[users.length - 1]);
            users.pop();
        });

        return scene;
    };
});