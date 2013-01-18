/*global define:true*/

'use strict';

define('Asset.Behaviour/PlayerLocalBehaviour',

['Time', 'Input'],

function (Time, Input)
{
    /*
    PlayerLocalBehaviour Class
    PlayerLocalBehaviour Description
    */
    return function ()
    {
        // PRIVATE part of the class

        // PUBLIC part of the class
        var that =
            {
                // Define the component as Active or not
                active: true,

                // Update the PlayerLocalBehaviour
                Update: function ()
                {
                    
                }
            };

        return that;
    };
});