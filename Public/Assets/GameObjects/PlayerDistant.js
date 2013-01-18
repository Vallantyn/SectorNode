/*global define:true*/

'use strict';

define('Asset.GameObject/PlayerDistant',

['GameObject', 'Renderer', 'Asset.Model/PlayerDistantMesh', 'Asset.Material/PlayerDistantMaterial', 'Asset.Behaviour/PlayerDistantBehaviour'],

function (GameObject, Renderer, Mesh, Material, Behaviour)
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
            mesh = new Mesh(),
            behaviour = new Behaviour();

        PlayerDistant.AddComponent(behaviour)
            .SetComponent('mesh', mesh)
            .SetComponent('renderer', renderer)
            .renderer.material = Material;

        return PlayerDistant;
    };
});