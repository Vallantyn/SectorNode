/*global define:true*/

'use strict';

define('Asset.GameObject/Ship',

['GameObject', 'Renderer', 'Vector2', 'Asset.Model/ShipMesh', 'Asset.Material/ShipMaterial', 'Asset.Behaviour/ShipBehaviour'],

function (GameObject, Renderer, Vector2, Mesh, Material, Behaviour)
{
    /*
    Ship Class
    Ship Description
    */
    return function ()
    {
        // PRIVATE part of the class
        var Ship = new GameObject(),
            renderer = new Renderer(),
            mesh = new Mesh(),
            behaviour = new Behaviour();

        Ship.AddComponent(behaviour)
            .SetComponent('mesh', mesh)
            .SetComponent('renderer', renderer)
            .renderer.material = Material;

        return Ship;
    };
});