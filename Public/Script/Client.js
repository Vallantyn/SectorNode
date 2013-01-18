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

require(['GameEngine', 'Screen', 'Asset.Scene/Sample', 'Asset.GameObject/Ship'],

function (GameEngine, Screen, Scene, Ship)
{
    Screen.Set('canvas');

    var Game =   new GameEngine(),
        scene =     new Scene();

    //#region com
    //var backBuffer = document.createElement('canvas');
    //backBuffer.width = WIDTH, backBuffer.height = HEIGHT;

    //var bCtx = backBuffer.getContext('2d');

    //        Input.init();

    /*var _bg = new Starfield();
    _bg.set(1000);
    _bg.Init(backBuffer, 0, 500);
    _bg.setSpeed(0, 0, 2);
    */
    //#endregion

    Game.ChangeScene(scene)
        .Start();

    //#region com2
    /*var backSpeed = new Vector2(2, 0);

    var i = 0;
    var zspd = 0;

    onEachFrame(function ()
    {

        document.getElementById('FPS').innerHTML = 'FPS: ' + FPS;
        document.getElementById('PING').innerHTML = 'PING: ' + PING;

        if (local)
        {
            var locPlayer = playerStack[local];
            locPlayer.Update(locPlayer.parseKey(__Input__.keyDown));

            if (82 in __Input__.keyDown)
            {
                zspd += 0.1;
            }

            if (69 in __Input__.keyDown)
            {
                zspd -= 0.1;
            }

            if (70 in __Input__.keyDown)
            {
                zspd = 2 + zspd / 1.1;
            }

            _bg.update(locPlayer.dir.X, locPlayer.dir.Y, zspd);

            var _t = _t || new Date().getTime();

            if (i < 5)
            {
                i++;
            }
            else
            {
                socket.emit('update', {
                    POS: [
                        locPlayer.pos.X,
                        locPlayer.pos.Y
                    ],
                    ID: local,
                    D: locPlayer.dir
                });
                i = 0;
            }

            bCtx.clearRect(0, 0, WIDTH, HEIGHT);
            _bg.render(bCtx);

            for (var p in playerStack)
            {
                if (playerStack.hasOwnProperty(p))
                {
                    if (p !== local.toString()) playerStack[p].Update();
                    playerStack[p].Render(bCtx);
                }
            }

            cx.clearRect(0, 0, WIDTH, HEIGHT);

            cx.drawImage(backBuffer, 0, 0);
        }
    });*/
    //#endregion
});