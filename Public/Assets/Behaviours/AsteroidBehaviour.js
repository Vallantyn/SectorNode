/*global define:true*/

'use strict';

define('Asset.Behaviour/AsteroidBehaviour',

['Time', 'Input'],

function (Time, Input)
{
    /*
    AsteroidBehaviour Class
    AsteroidBehaviour Description
    */
    return function ()
    {
        // PRIVATE part of the class

        // PUBLIC part of the class
        var that =
            {
                // Define the component as Active or not
                active: true,

                // Update the AsteroidBehaviour
                Update: function ()
                {
                    
                }
            };

        return that;
    };
});