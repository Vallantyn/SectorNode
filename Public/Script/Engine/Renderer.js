/*global define:true*/

'use strict';

define('Renderer',

['Screen'],

function (Screen)
{
    /*
    Renderer Class
    Renderer Description
    */
    return function ()
    {
        // PRIVATE part of the class
        var material,
            defaultMaterial = {
                'strokeStyle': 'white',
                'fillStyle': 'white',
                'shadowColor': 'black',
                'shadowBlur': '0',
                'shadowOffsetX': '0',
                'shadowOffsetY': '0',
                'lineJoin': 'square',
                'lineCap': 'square',
                'lineWidth': '1',
                'globalAlpha': '1'
            };
        // PUBLIC part of the class
        var that =
            {
                // Define the component as Active or not
                active: true,

                get material()
                {
                    return material;
                },
                set material(/*Material*/ mat)
                {
                    material = mat;
                },

                // Render the Renderer
                Render: function ()
                {
                    var mesh = this.gameObject.mesh.data,
                        position = this.gameObject.transform.position,
                        matrix = this.gameObject.transform.matrix;

                    var cx = Screen.context;

                    function applyMaterial(mat)
                    {
                        for (var i in mat)
                            if (cx.hasOwnProperty(i))
                                cx[i] = mat[i];
                    }

                    applyMaterial(defaultMaterial);

                    if (typeof material !== 'undefined')
                        applyMaterial(material);

                    mesh.forEach(function (face)
                    {
                        cx.beginPath();

                        face.forEach(function (vertex)
                        {
                            var x = position.x + (vertex[0] * matrix[0] + vertex[1] * matrix[1]),
                                y = position.y + (vertex[0] * matrix[3] + vertex[1] * matrix[4]);

                            cx.lineTo(x, y);
                        });

                        cx.closePath();
                        cx.fill();
                        cx.stroke();
                    });
                }
            };

        return that;
    };
});