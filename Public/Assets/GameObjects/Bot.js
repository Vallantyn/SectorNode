/*global define:true*/

'use strict';

define('Asset.GameObject/Bot',

['GameObject', 'Renderer', 'Asset.Model/BotMesh', 'Asset.Material/BotMaterial', 'Asset.Behaviour/BotBehaviour'],

function (GameObject, Renderer, Mesh, Material, Behaviour)
{
    /*
    Bot Class
    Bot Description
    */
    return function ()
    {
        // PRIVATE part of the class
        var Bot = new GameObject(),
            renderer = new Renderer(),
            mesh = new Mesh(),
            behaviour = new Behaviour();

        Bot.AddComponent(behaviour)
            .SetComponent('mesh', mesh)
            .SetComponent('renderer', renderer)
            .renderer.material = Material;

        return Bot;
    };
});