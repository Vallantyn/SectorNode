/*global define:true*/

'use strict';

define('UI',

['Screen', 'Input'],

/*
UI Class
Represent the User Interface
*/

function (Screen, Input)
{

    return {
        Label: function (/*String*/ string, /*Vector2*/ anchor)
        {
            var cx = Screen.context,
                x = anchor.x - cx.measureText(string).width / 2,
                y = anchor.y + 7;
            /*
            //if (Input.GetMouse(0))
            //{
            var _x = Input.Mouse.x,
                _y = Input.Mouse.y,
                width = cx.measureText(string).width,
                height = 14;

            if (_x > x + width ||
                _x < x ||
                _y < y - height ||
                _y > y)
            {*/

                cx.fillStyle = 'white';
                cx.font = '14px sans-serif';

                cx.fillText(string, x, y);
            /*
                return false;
            }
            else
            {
                cx.fillStyle = 'red';
                cx.font = '14px sans-serif';

                cx.fillText(string, x, y);

                return true;
            }*/
        }
    };
});