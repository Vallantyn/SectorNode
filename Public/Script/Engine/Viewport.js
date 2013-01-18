/*global define:true*/

'use strict';

define('Viewport',

//['Dependency'],

function (/*Dependency*/)
{
    /*
    Viewport Class
    Viewport Description
    */
    return function ()
    {
        // PRIVATE part of the class

        // PUBLIC part of the class
        var that =
            {
                // Define the component as Active or not
                active: true,

                // Init the Viewport
                Start: function ()
                {

                },

                // Update the Viewport
                Update: function ()
                {

                },

                // Update the Viewport, at fixed interval
                FixedUpdate: function ()
                {

                },

                // Update the Viewport, after all update call
                LateUpdate: function ()
                {

                },

                // Render the Viewport
                Render: function ()
                {

                }
            };

        return that;
    };
});