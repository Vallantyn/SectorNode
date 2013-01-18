/*global define:true*/

'use strict';

define('Asset.Behaviour/LaserBehaviour',

['Time', 'Input'],

function (Time, Input)
{
    /*
    LaserBehaviour Class
    LaserBehaviour Description
    */
    return function ()
    {
        // PRIVATE part of the class
        var start;

        // PUBLIC part of the class
        var that =
            {
                // Define the component as Active or not
                active: true,

                Start: function ()
                {
                    start = new Date().getTime();

                    setTimeout(function ()
                    {
                        Destroy(that.gameObject);
                    }, 1500);
                },

                // Update the LaserBehaviour
                Update: function ()
                {
                    var now = new Date().getTime();

                    this.gameObject.transform.Translate(this.gameObject.transform.forward.Multiply(800 * Time.deltaTime));
                    this.gameObject.renderer.material.globalAlpha = (1500 + start - now) / 1500;
                }
            };

        return that;
    };
});