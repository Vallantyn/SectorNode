/*global io:true, playerStack:true, PlayerShip:true, ShipObject:true, PING:true, _t:true*/

'use strict';

var socket = io.connect(),
    local/*, ping*/;

function bleh(stack, data)
{
    for (var i in stack) if (i === data.ID.toString()) return true;
    return false;
}

socket.on('connect', function (data) {
    if (data) {
        local = data.ID;
        //var _data = data;

        var player = new PlayerShip([data.X, data.Y], data.C, data.ID);
        player.Init();

        playerStack[player._ID] = player;

        socket.on('new player', function (data) {
            if (!bleh(playerStack, data)) {

                var _x = playerStack[local].locPos.X + playerStack[local].pos.X - data.X,
                    _y = playerStack[local].locPos.Y + playerStack[local].pos.Y - data.Y;

                var _player = new ShipObject([_x, _y], data.C, data.ID);
                _player.Init();

                playerStack[_player._ID] = _player;
            }
        });

        socket.on('request', function (fn) {
            fn({ X: player.pos.X, Y: player.pos.Y, ID: player._ID });
        });

        socket.on('update', function (data)
        {
            var _dt = new Date().getTime();

            var _x = playerStack[local].locPos.X + data.POS[0] - playerStack[local].pos.X;
            var _y = playerStack[local].locPos.Y + data.POS[1] - playerStack[local].pos.Y;

            playerStack[data.ID].Set({
                pos: [_x, _y],
                d: data.D,
                dl: playerStack[local].dir
            });

            PING = _dt - _t;

            _t = _dt;
        });
    }
});