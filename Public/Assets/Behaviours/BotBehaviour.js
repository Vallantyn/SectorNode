/*global define:true*/

'use strict';

define('Asset.Behaviour/BotBehaviour',

['Time', 'Input'],

function (Time, Input)
{
    /*
    BotBehaviour Class
    BotBehaviour Description
    */
    return function ()
    {
        // PRIVATE part of the class

        // PUBLIC part of the class
        var that =
            {
                // Define the component as Active or not
                active: true,

                // Update the BotBehaviour
                Update: function ()
                {
                    
                }
            };

        return that;
    };
});