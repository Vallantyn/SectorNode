/*global define:true*/

'use strict';

define('Asset.Model/ShipMesh',

['Mesh', 'Vector2'],

function (Mesh, Vector2)
{
    /*
    ShipMesh Class
    ShipMesh Description
    */
    return function ()
    {
        var mesh = new Mesh();

        mesh.BeginFace()
            .Vertex(new Vector2( -5,  10))
            .Vertex(new Vector2( -8,  25))
            .Vertex(new Vector2(-13,  28))
            .Vertex(new Vector2(-13,  10))
            .Vertex(new Vector2(-10,   2))
            .EndFace()

            .BeginFace()
            .Vertex(new Vector2( -5, -10))
            .Vertex(new Vector2( -8, -25))
            .Vertex(new Vector2(-13, -28))
            .Vertex(new Vector2(-13, -10))
            .Vertex(new Vector2(-10,  -2))
            .EndFace()
            
            .BeginFace()
            .Vertex(new Vector2(-15,   2))
            .Vertex(new Vector2(-10,   5))
            .Vertex(new Vector2( 18,   0))
            .Vertex(new Vector2(-10,  -5))
            .Vertex(new Vector2(-15,  -2))
            .EndFace();

        return mesh;
    };
});