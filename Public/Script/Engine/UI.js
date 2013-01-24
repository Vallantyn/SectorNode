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
    var style = {
        normal: 'white',
        hover: 'silver',
        click: 'gray',
    },
    font = {
        size: '14px',
        family: 'sans-serif',
        toString: function ()
        {
            return this.size + ' ' + this.family;
        }
    };

    var click = false,
        press = false;

    return {
        Label: function (/*String*/ string, /*Vector2*/ anchor, options)
        {
            var cx = Screen.context,
                x = anchor.x - cx.measureText(string).width / 2,
                y = anchor.y + 0;

            var _x = Input.Mouse.x,
                _y = Input.Mouse.y,
                width = cx.measureText(string).width,
                height = 14;

            cx.fillStyle = style.normal;
            cx.font = font.toString();

            if (_x > x + width ||
                _x < x ||
                _y < y - height ||
                _y > y)
            {
                cx.fillStyle = style.normal;
                press = false;
                click = false;
                document.body.style.cursor = 'default';
            }
            else if (!!options)
            {
                if (options.click && Input.GetMouse(0))
                {
                    if (!press)
                        click = true;
                    else click = false;

                    cx.fillStyle = style.click;
                    press = true;
                }
                else if (options.hover)
                {
                    document.body.style.cursor = 'pointer';
                    click = false;
                    press = false;
                    cx.fillStyle = style.hover;
                }
            }

            cx.fillText(string, x, y);
            return click;
        },

        Box: function (/*Vector2*/ anchor, /*Vector2*/ size, options)
        {
            var cx = Screen.context,
                x = anchor.x - size.x / 2,
                y = anchor.y - size.y / 2;

            var _x = Input.Mouse.x,
                _y = Input.Mouse.y,
                width = size.x,
                height = size.y;

            cx.strokeStyle = style.normal;
            cx.fillStyle = 'transparent';
            cx.font = font.toString();

            if (_x > x + width ||
                _x < x ||
                _y > y + height ||
                _y < y)
            {
                cx.strokeStyle = style.normal;
                document.body.style.cursor = 'default';
            }
            else if (!!options)
            {
                if (options.click && Input.GetMouse(0))
                {
                    click = true;
                    cx.strokeStyle = style.click;
                }
                else if (options.hover)
                {
                    document.body.style.cursor = 'pointer';
                    cx.strokeStyle = style.hover;
                }
            }

            cx.fillRect(x, y, size.x, size.y);
            cx.strokeRect(x, y, size.x, size.y);

            return click;
        },

        Button: function (label, anchor)
        {
            var cx = Screen.context,
                x = anchor.x - (Screen.context.measureText(label).width + 10) / 2,
                y = anchor.y - 12;

            this.Box(anchor, { x: Screen.context.measureText(label).width + 10, y: 24 });
            this.Label(label, anchor);

            if (Input.GetMouse(0))
            {
                var _x = Input.Mouse.x,
                    _y = Input.Mouse.y,
                    width = cx.measureText(label).width + 10,
                    height = 24;

                if (_x > x + width ||
                    _x < x ||
                    _y > y + height ||
                    _y < y)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        },

        TextField: function (id, anchor, size, defaultText, options)
        {
            var text = document.getElementById(id);

            text.autofocus = true;

            if (!!defaultText)
                text.defaultValue = defaultText;

            if (this.Box(anchor, size, options))
            {
                click = true;
                text.focus();
            }

            this.Label(text.value, anchor, options);

            return click;
        },
    };
});