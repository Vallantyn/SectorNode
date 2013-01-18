/*global define:true*/

'use strict';

define('Asset.GameObject/PlayerLocal',

['GameObject', 'Renderer', 'Asset.Model/PlayerLocalMesh', 'Asset.Material/PlayerLocalMaterial', 'Asset.Behaviour/PlayerLocalBehaviour'],

function (GameObject, Renderer, Mesh, Material, Behaviour)
{
    /*
    PlayerLocal Class
    PlayerLocal Description
    */
    return function ()
    {
        // PRIVATE part of the class
        var PlayerLocal = new GameObject(),
            renderer = new Renderer(),
            mesh = new Mesh(),
            behaviour = new Behaviour();

        PlayerLocal.AddComponent(behaviour)
            .SetComponent('mesh', mesh)
            .SetComponent('renderer', renderer)
            .renderer.material = Material;

        return PlayerLocal;
    };
});