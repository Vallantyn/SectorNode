/*global define:true*/

'use strict';

define('Asset.GameObject/Missile',

['GameObject', 'Renderer', 'Asset.Model/MissileMesh', 'Asset.Material/MissileMaterial', 'Asset.Behaviour/MissileBehaviour'],

function (GameObject, Renderer, Mesh, Material, Behaviour)
{
    /*
    Missile Class
    Missile Description
    */
    return function ()
    {
        // PRIVATE part of the class
        var Missile = new GameObject(),
            renderer = new Renderer(),
            mesh = new Mesh(),
            behaviour = new Behaviour();

        Missile.AddComponent(behaviour)
            .SetComponent('mesh', mesh)
            .SetComponent('renderer', renderer)
            .renderer.material = Material;

        return Missile;
    };
});