/*global define:true*/

'use strict';

define('Asset.Scene/Sample',

['Scene', 'Screen', 'Asset.GameObject/Ship', 'Asset.GameObject/StarField'],

function (Scene, Screen, Ship, StarField)
{
    return function ()
    {
        var scene = new Scene(),
            ship = new Ship(),
        starfield = new StarField();
            
        console.log(ship.transform);

        ship.transform.Translate({ x: Screen.bounds.width / 2, y: Screen.bounds.height / 2 });

        scene.AddObject(ship);
        scene.AddObject(starfield);

        return scene;
    };
});