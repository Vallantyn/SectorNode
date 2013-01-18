/*global define:true*/

'use strict';

define('Camera',

//['Dependency'],

function (/*Dependency*/)
{
    /*
    Camera Class
    Camera Description
    */
    return function ()
    {
        // PRIVATE part of the class

        // PUBLIC part of the class
        var that =
            {
                // Define the component as Active or not
                active: true,

                // Init the Camera
                Start: function ()
                {

                },

                // Update the Camera
                Update: function ()
                {

                },

                // Update the Camera, at fixed interval
                FixedUpdate: function ()
                {

                },

                // Update the Camera, after all update call
                LateUpdate: function ()
                {

                },

                // Render the Camera
                Render: function ()
                {

                }
            };

        return that;
    };
});