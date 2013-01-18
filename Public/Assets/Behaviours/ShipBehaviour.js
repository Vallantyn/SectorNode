/*global define:true*/

'use strict';

define('Asset.Behaviour/ShipBehaviour',

['Time', 'Input', 'UI', 'Asset.GameObject/Laser'],

function (Time, Input, UI, Laser)
{
    /*
    ShipBehaviour Class
    ShipBehaviour Description
    */
    return function ()
    {
        // PRIVATE part of the class
        var speed = 0,
            shot = true;
        // PUBLIC part of the class
        var that =
            {
                // Define the component as Active or not
                active: true,

                UI: function ()
                {
                    var position = this.gameObject.transform.position;
                    var transform = this.gameObject.transform;

                    if(!UI.Label('Vallantyn', position.Add({ x: 0, y: 50 })))
                        transform.Rotate(-Math.PI * Time.deltaTime);
                },

                // Update the ShipBehaviour
                Update: function ()
                {
                    var transform = this.gameObject.transform;

                    if (Input.GetKey(32) && shot)
                    {
                        shot = false;

                        var laser1 = new Laser();
                        laser1.transform.Translate(transform.position);
                        laser1.transform.Translate(transform.up.Multiply(20));
                        laser1.transform.Rotate(transform.rotation);


                        var laser2 = new Laser();
                        laser2.transform.Translate(transform.position);
                        laser2.transform.Translate(transform.up.Multiply(-20));
                        laser2.transform.Rotate(transform.rotation);

                        Instantiate(laser1);
                        Instantiate(laser2);
                    }

                    if (!Input.GetKey(32)) shot = true;

                    if (Input.GetKey(39))
                        transform.Rotate(Math.PI * Time.deltaTime);

                    if (Input.GetKey(38))
                    {
                        speed+=2;
                    } else
                    {
                        if (speed > 0) speed-=4;
                        else speed = 0;
                    }

                    if (Input.GetKey(37))
                        transform.Rotate(-Math.PI * Time.deltaTime);

                    transform.Translate(transform.forward.Multiply(speed * Time.deltaTime));
                }
            };

        return that;
    };
});