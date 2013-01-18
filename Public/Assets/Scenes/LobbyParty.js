/*global define:true*/

'use strict';

define('Asset.Scene/LobbyParty',

['Scene', 'Asset.GameObject/Ship'],

function (Scene, Ship)
{
    return function ()
    {
        var scene = new Scene(),
            ship = new Ship();
            
        ship.transform.Translate({x: 450, y: 225});

        scene.AddObject(ship);

        return scene;
    };
});