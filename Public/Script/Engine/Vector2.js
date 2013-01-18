/*global define:true*/

'use strict';

define('Vector2',

function ()
{
    /*
    Represent a 2 component Vector
    */
    return function Vector2(/*Float*/ x,/*Float*/ y)
    {
        // PRIVATE part of the class
        var data = [x, y]; // Raw data of the Vector

        // PUBLIC part of the class
        var that =
            {
                // x component read attribute
                get x()
                {
                    return data[0];
                },
                // x component write attribute
                set x(/*Float*/ val)
                {
                    data[0] = val;
                },

                // y component read attribute
                get y()
                {
                    return data[1];
                },
                // y component write attribute
                set y(/*Float*/ val)
                {
                    data[1] = val;
                },

                // return the raw data as an Array
                get xy()
                {
                    return data;
                },

                // Multiplication by a scalar
                Multiply: function (/*Float*/ f)
                {
                    return new Vector2(data[0] * f, data[1] * f);
                },

                // Cross Product
                Cross: function (/*Vector2*/ v)
                {
                    var x = v.y - data[1],
                        y = v.x - data[0];

                    return new Vector2(x, y);
                },

                // Dot Product
                Dot: function (/*Vector 2*/ v)
                {
                    var x = data[0],
                        y = data[1];

                    return x * v.x + y * v.y;
                },

                // Gives the norm form of the vector
                Norm: function ()
                {
                    var x = data[0],
                        y = data[1];

                    return Math.sqrt(x * x + y * y);
                },

                // Gives the normalized form of the vector
                Normalize: function ()
                {
                    var x = data[0],
                        y = data[1],

                        ax = Math.abs(x),
                        ay = Math.abs(y),

                        r = Math.sqrt(ax * ax + ay * ay);

                    return new Vector2(x / r, y / r);
                },

                // Add a vector to another
                Add: function (/*Vector2*/ v)
                {
                    return new Vector2(data[0] + v.x, data[1] + v.y);
                }
            };

        return that; // Return the public part
    };
});