/*global requirejs:true*/

'use strict';

requirejs.config({
    baseUrl:                'Script/Engine',

    paths: {
        'Lib':              '../Libs',
        'Net':              '../Network',
        'Obj':              '../Objects',
        'Base':             '../',

        'Asset.Scene':      '../../Assets/Scenes',
        'Asset.GameObject': '../../Assets/GameObjects',
        'Asset.Model':      '../../Assets/Models',
        'Asset.Material':   '../../Assets/Materials',
        'Asset.Behaviour':  '../../Assets/Behaviours'
    }
});

require(['GameEngine', 'Screen', 'Asset.Scene/Login', 'Asset.GameObject/Ship'],

function (GameEngine, Screen, Scene, Ship)
{
    Screen.Set('canvas');

    var Game =   new GameEngine(),
        scene =     new Scene();

    Game.ChangeScene(scene)
        .Start();
});