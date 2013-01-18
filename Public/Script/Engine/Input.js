/*global define:true*/

'use strict';

define('Input',

['Screen', 'Vector2'],

function (Screen, Vector2)
{
    var keysDown = {}, mouseDown = {}, mouse = {};

    return {
        GetKey: function (key)
        {
            return key in keysDown;
        },

        GetMouse: function (button)
        {
            return button in mouseDown;
        },

        get Mouse()
        {
            return mouse;
        },

        Start: function ()
        {
            window.addEventListener('keydown', function (e)
            {
                keysDown[e.keyCode] = true;
            }, false);
            window.addEventListener('keyup', function (e)
            {
                delete keysDown[e.keyCode];
            }, false);

            window.addEventListener('mousedown', function (e)
            {
                mouseDown[e.button] = true;
            }, false);
            window.addEventListener('mouseup', function (e)
            {
                delete mouseDown[e.button];
            }, false);

            window.addEventListener('mousemove', function (e)
            {
                mouse = new Vector2(e.clientX - Screen.rect.left, e.clientY - Screen.rect.top);
            }, false);
        }
    };
});