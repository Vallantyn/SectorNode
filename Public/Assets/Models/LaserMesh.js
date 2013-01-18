/*global define:true*/

'use strict';

define('Asset.Model/LaserMesh',

['Mesh', 'Vector2'],

function (Mesh, Vector2)
{
    /*
    LaserMesh Class
    LaserMesh Description
    */
    return function ()
    {
        var mesh = new Mesh();

        mesh.BeginFace()
            .Vertex(new Vector2(-10, 0))
            .Vertex(new Vector2(10, 0))
            .EndFace();

        return mesh;
    };
});