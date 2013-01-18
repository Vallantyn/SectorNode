/*global define:true*/

'use strict';

define('Screen',

['Buffer', 'Rect'],

function (Buffer, Rect)
{
    /*
    Screen Library
    Represent the whole Screen
    Contain a back and front buffer
    */
    var back = new Buffer(),
        front = new Buffer();

    return {        // Define the component as Active or not
        active: true,

        get bounds()
        {
            return {
                width: back.width,
                height: back.height
            }
        },

        get rect()
        {
            return front.data.getBoundingClientRect();
        },

        get context()
        {
            return back.context;
        },

        // Set the screen, create a front buffer from parameter, and create a back buffer.
        Set: function (/*String*/ id)
        {
            front.CreateFromHTML(id)
                 .context = '2d';

            back.Create(front.width, front.height)
                .context = '2d';
        },

        // Draw the back buffer content on the front buffer
        SwapBuffer: function ()
        {
            front.context.clearRect(0, 0, front.width, front.height);
            front.context.drawImage(back.data, 0, 0);
            back.context.clearRect(0, 0, back.width, back.height);
        }
    };
});