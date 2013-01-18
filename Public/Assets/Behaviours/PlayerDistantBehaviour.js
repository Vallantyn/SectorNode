/*global define:true*/

'use strict';

define('Asset.Behaviour/PlayerDistantBehaviour',

['Time', 'Input'],

function (Time, Input)
{
    /*
    PlayerDistantBehaviour Class
    PlayerDistantBehaviour Description
    */
    return function ()
    {
        // PRIVATE part of the class

        // PUBLIC part of the class
        var that =
            {
                // Define the component as Active or not
                active: true,

                // Update the PlayerDistantBehaviour
                Update: function ()
                {
                    
                }
            };

        return that;
    };
});