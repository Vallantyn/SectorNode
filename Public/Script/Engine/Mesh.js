/*global define:true*/

'use strict';

define('Mesh',

//['Dependency'],

function (/*Dependency*/)
{
    /*
    Mesh Class
    Mesh Description
    */

    function MeshError(type)
    {
        var types = {
            'BeginError' :  'Previous face wasn\'t ended.',
            'EndError':     'No face was previously started.',
            'VertexError':  'A face must be started before adding vertice.'
        };

        this.name = 'Mesh Error';
        this.message = types[type] || 'Unknown Error Happened... =(';
    }

    MeshError.prototype = new Error();
    MeshError.prototype.constructor = MeshError;

    return function ()
    {
        // PRIVATE part of the class
        var vertexBuffer,
            face = [],
            faceStarted = false;

        // PUBLIC part of the class
        var that =
            {
                // Define the component as Active or not
                active: true,

                get data()
                {
                    return face;
                },

                BeginFace: function ()
                {
                    if (!faceStarted)
                        faceStarted = true;
                    else throw new MeshError('BeginError');

                    vertexBuffer = [];

                    return that;
                },

                EndFace: function ()
                {
                    if (faceStarted)
                        faceStarted = false;
                    else throw new MeshError('EndError');

                    face.push(vertexBuffer);

                    return that;
                },

                
                Vertex: function (/*Vector2*/ v)
                {
                    if (!faceStarted)
                        throw new MeshError('VertexError');

                    vertexBuffer.push(v.xy);

                    return that;
                }
            };

        return that;
    };
});