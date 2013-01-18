/*global define:true*/

'use strict';

define('Asset.Behaviour/StarFieldBehaviour',

['Time', 'Input', 'Screen', 'Mesh'/*, StarMesh, StarRenderer*/],

function (Time, Input, Screen, Mesh/*, StarMesh, StarRenderer*/)
{
    /*
    StarFieldBehaviour Class
    StarFieldBehaviour Description
    */
    return function ()
    {
        // PRIVATE part of the class
        var camera = {
            x: 0,
            y: 0,
            z: 0,
            zMin: 0, /** The near plane */
            zMax: 500, /** The far plane */
            width: Screen.bounds.width, /** Screen Width */
            height: Screen.bounds.height, /** Screen Height */
            offsetX: Screen.bounds.width / 2, /** Point of view X coordinate */
            offsetY: Screen.bounds.height / 2, /** Point of view Y coordinate */
            depth: 350 /** Depth. */
        },
        speed = {
            x: 0,
            y: 0,
            z: 0
        },
        n = 100,
        stars;

        // PUBLIC part of the class
        var that =
            {
                // Define the component as Active or not
                active: true,

                Start: function() {
                    stars = new Array(n);

                    for (var i = 0; i < n; i++)
                    {
                        var _x = Math.round(Math.random() * camera.width),
                            _y = Math.round(Math.random() * camera.height),
                            _z = Math.random() * camera.zMax;

                        var star = {
                            x: _x,
                            y: _y,
                            z: _z
                        };

                        stars[i] = star;
                    }
                },

                // Update the StarFieldBehaviour
                Update: function ()
                {
                    for (var i = 0; i < n; i++)
                    {
                        var star = stars[i],

                            dX = Time.deltaTime * 200,
                            dY = 0,
                            dZ = 0;

                        star.z -= dZ + speed.z;
                        star.x -= dX + speed.x;
                        star.y -= dY + speed.y;


                        if (star._z > camera.zMax)
                        {
                            star.z -= camera.zMax;
                            star._z -= camera.zMax;
                        }

                        if (star.z < camera.zMin)
                        {
                            star.z += camera.zMax;
                            star._z += camera.zMax;
                        }

                        if (star.x < -camera.offsetX)
                        {
                            star.x += camera.width;
                            star._x += camera.width;
                        }

                        if (star.x > camera.offsetX)
                        {
                            star.x -= camera.width;
                            star._x -= camera.width;
                        }

                        if (star.y < -camera.offsetY)
                        {
                            star.y += camera.height;
                            star._y += camera.height;
                        }

                        if (star.y > camera.offsetY)
                        {
                            star.y -= camera.height;
                            star._y -= camera.height;
                        }

                        var dx = star.x - camera.x,
                            _dx = star._x - camera.x,

                            dy = star.y - camera.y,
                            _dy = star._y - camera.y,

                            dz = star.z - camera.z,
                            _dz = star._z - camera.z,

                            scale = camera.depth / dz,
                            _scale = camera.depth / _dz;

                        star.rx = scale * dx + camera.offsetX;
                        star._rx = _scale * _dx + camera.offsetX;

                        star.ry = scale * dy + camera.offsetY;
                        star._ry = _scale * _dy + camera.offsetY;

                        star.rz = scale;
                        star._rz = _scale;

                        var ctx = Screen.context;

                        ctx.fillStyle = '#FFF';
                        ctx.strokeStyle = '#FFF';
                        ctx.lineJoin = 'round';
                        ctx.lineCap = 'round';
                        ctx.lineWidth = 2;
                        ctx.globalAlpha = (1 - star.z / camera.zMax) > 0 ? (1 - star.z / camera.zMax) : 0;

                        if (star.rx === star._rx && star.ry === star._ry)
                        {
                            ctx.fillRect(star.rx, star.ry, 2, 2);
                        } else
                        {
                            ctx.beginPath();
                            ctx.moveTo(star._rx, star._ry);
                            ctx.lineTo(star.rx, star.ry);
                            ctx.closePath();

                            ctx.stroke();
                        }

                        star._z = star.z;
                        star._x = star.x;
                        star._y = star.y;

                        ctx.globalAlpha = 1;
                    }
                }
            };

        return that;
    };
});