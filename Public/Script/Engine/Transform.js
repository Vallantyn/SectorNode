/*global define:true, Matrix3:true*/

'use strict';

/*
Transform Class
Represent the Object matrix
Used to apply transformation to the object
Hold the Parent/Child relationship of the Object
*/

define('Transform',

['Vector2'],

function (Vec2)
{
    /*
    Transform Class
    Represent the object Matrix, and the transformation linked to it
    */
    return function ()
    {
        // PRIVATE part of the class
        //var child = new Array(); // The object childs
        //var parent = null; // The object parent

        // Object Matrix. Used to locate the object in space.
        var matrix = new Array(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1);
        var rotation = 0;
        // PUBLIC part of the class
        var that =
            {
                // get parent
                // set parent

                // get child
                // addChild
                // childCount

                // Object matrix as read attribute
                get matrix()
                {
                    return matrix;
                },

                // position as read attribute
                get position()
                {
                    return new Vec2(matrix[6], matrix[7]);
                },

                get rotation()
                {
                    return rotation;
                },

                //rotation: 0,        // rotation as read attribute
                scale: new Vec2(1, 1),    // scale as read attribute

                get forward() // Unit Vector pointing forward
                {
                    var x = matrix[0],
                        y = matrix[3];

                    return new Vec2(x, y);
                },

                get up()    //Unit Vector pointing up
                {
                    var x = matrix[1],
                        y = matrix[4];

                    return new Vec2(x, y);
                },

                // translate the object in space. Only way to modify the position.
                Translate: function (/*Vector2*/ vector)
                {
                    matrix[6] += vector.x;
                    matrix[7] += vector.y;
                    //Matrix3.translate(matrix, vector.xy);
                },

                // rotate the object in space. Only way to modify the rotation.
                Rotate: function (/*Float*/ angle)
                {
                    var c = Math.cos(rotation + angle),
                        s = Math.sin(rotation + angle);

                    rotation += angle;

                    if (rotation > Math.PI)
                    {
                        rotation = -Math.PI + (rotation - Math.PI);
                    }
                    else if (rotation < -Math.PI)
                    {
                        rotation = Math.PI - (rotation + Math.PI);
                    }

                    matrix[0] = c; matrix[1] = -s;
                    matrix[3] = s; matrix[4] = c;
                },

                // Scale uniform the object in space.
                ScaleUniform: function (/*Float*/ ratio)
                {
                    Matrix3.scale(matrix, ratio);
                },

                // Scale the object in space along x and y axis.
                Scale: function (/*Vector2*/ vector)
                {
                    Matrix3.scaleV2(matrix, vector.xy);
                }
            };

        return that; // Return Public part
    };
});