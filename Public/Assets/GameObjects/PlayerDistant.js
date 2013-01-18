/*global define:true*/

'use strict';

define('Asset.GameObject/PlayerDistant',

['GameObject', 'Renderer', 'Asset.Model/ShipMesh', 'Asset.Material/PlayerDistantMaterial'],

function (GameObject, Renderer, Mesh, Material)
{
    /*
    PlayerDistant Class
    PlayerDistant Description
    */
    return function ()
    {
        // PRIVATE part of the class
        var PlayerDistant = new GameObject(),
            renderer = new Renderer(),
            mesh = new Mesh();

        PlayerDistant.SetComponent('mesh', mesh)
            .SetComponent('renderer', renderer)
            .renderer.material = Material;

        return PlayerDistant;
    };
});