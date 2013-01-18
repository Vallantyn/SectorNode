/*global define:true*/

'use strict';

define('Asset.GameObject/Asteroid',

['GameObject', 'Renderer', 'Asset.Model/AsteroidMesh', 'Asset.Material/AsteroidMaterial', 'Asset.Behaviour/AsteroidBehaviour'],

function (GameObject, Renderer, Mesh, Material, Behaviour)
{
    /*
    Asteroid Class
    Asteroid Description
    */
    return function ()
    {
        // PRIVATE part of the class
        var Asteroid = new GameObject(),
            renderer = new Renderer(),
            mesh = new Mesh(),
            behaviour = new Behaviour();

        Asteroid.AddComponent(behaviour)
            .SetComponent('mesh', mesh)
            .SetComponent('renderer', renderer)
            .renderer.material = Material;

        return Asteroid;
    };
});