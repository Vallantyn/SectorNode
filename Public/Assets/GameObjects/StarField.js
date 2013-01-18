/*global define:true*/

'use strict';

define('Asset.GameObject/StarField',

['GameObject', 'Renderer', 'Asset.Model/StarFieldMesh', 'Asset.Material/StarFieldMaterial', 'Asset.Behaviour/StarFieldBehaviour'],

function (GameObject, Renderer, Mesh, Material, Behaviour)
{
    /*
    StarField GameObject
    Represent a Star-filled background
    */
    return function ()
    {
        // PRIVATE part of the class
        var StarField = new GameObject(),
            behaviour = new Behaviour();

        StarField.AddComponent(behaviour);

        return StarField;
    };
});