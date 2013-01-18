/*global define:true*/

'use strict';

define('Asset.GameObject/Laser',

['GameObject', 'Renderer', 'Asset.Model/LaserMesh', 'Asset.Material/LaserMaterial', 'Asset.Behaviour/LaserBehaviour'],

function (GameObject, Renderer, Mesh, Material, Behaviour)
{
    /*
    Laser Class
    Laser Description
    */
    return function ()
    {
        // PRIVATE part of the class
        var Laser = new GameObject(),
            renderer = new Renderer(),
            mesh = new Mesh(),
            behaviour = new Behaviour();

        Laser.AddComponent(behaviour)
            .SetComponent('mesh', mesh)
            .SetComponent('renderer', renderer)
            .renderer.material = Object.create(Material);

        return Laser;
    };
});