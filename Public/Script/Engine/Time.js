/*global define:true*/

'use strict';

/*
Time Library
*/

define('Time',

function ()
{
    var time, start, deltaTime,
        tick, fixedTick,

        requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback)
        {
            window.setTimeout(callback, 1000 / 60);
        };

    return {
        // Access to time variation
        get mainLoop()
        {
            return tick;
        },

        // Access to time variation
        get fixedMainLoop()
        {
            return fixedTick;
        },

        // Return the time since the Engine Start.
        get sinceStart()
        {
            var _time = new Date().getTime();

            return _time - start;
        },

        // Access to time variation
        get deltaTime()
        {
            return deltaTime / 1000;
        },

        // And his Fixed Interval Version
        get fixedDeltaTime()
        {
            return (1000 / 60) / 1000;
        },

        // Classic loop,
        OnEachFrame: function (/*Function*/ callback)
        {
            tick = requestAnimationFrame(callback);
        },

        // Loop, at fixed interval (~16ms),
        OnFixedEachFrame: function (/*Function*/ callback)
        {
            fixedTick = window.setTimeout(callback, 1000 / 60);
        },

        // Initialization
        Start: function ()
        {
            time = start = new Date().getTime();
        },

        // Update Loop (used for updating deltaTime value)
        Update: function ()
        {
            var _time = new Date().getTime();   // Get the current Date, in ms.
            var dt = _time - time;                   // Update deltaTime

            deltaTime = dt;

            time = _time;                               // re set the time variable, for the next Loop.
        }
    };
});