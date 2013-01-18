/*global define:true*/

'use strict';

define('Asset.Behaviour/MissileBehaviour',

['Time', 'Input'],

function (Time, Input)
{
    /*
    MissileBehaviour Class
    MissileBehaviour Description
    */
    return function ()
    {
        // PRIVATE part of the class

        // PUBLIC part of the class
        var that =
            {
                // Define the component as Active or not
                active: true,

                // Update the MissileBehaviour
                Update: function ()
                {
                    
                }
            };

        return that;
    };
});