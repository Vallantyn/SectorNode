/*global define:true*/

'use strict';

/*
Represent a Game Scene
A Game Scene Manage the objects, the rendering, and the events.
*/

define('Scene',
function ()
{
    return function ()
    {
        // PRIVATE part
        var objects = {};               // Contains the Scene Game Objects
        var mainCamera = '';  // Refer to the active camera
        var started = false;

        // PUBLIC part
        var that =
            {
                // Add a new object to the scene
                AddObject: function (/*GameObject*/ object)
                {
                    objects[object.id] = object;
                    if (started) objects[object.id].Start();
                },

                // Remove an Object from the scene
                RemoveObject: function (/*GameObject*/ object)
                {
                    for (var i in objects)
                    {
                        if (Number(i) === Number(object.id)) delete objects[i];
                    }
                },

                // Use an ID to get an Object. If there is no object with this ID, return undefined.
                GetObjectById: function (/*Int*/ id)
                {
                    return objects[id];
                },

                // Init the Scene
                Start: function ()
                {
                    started = true;

                    for (var i in objects)
                    {
                        if (objects[i].active) objects[i].Start();
                    }
                },

                // Update the scene
                Update: function ()
                {
                    //console.log('SCN UPD');

                    for (var i in objects)
                    {
                        if (objects[i].active) objects[i].Update();
                    }
                },

                // Update the scene, at fixed interval
                FixedUpdate: function ()
                {
                    for (var i in objects)
                    {
                        if (objects[i].active) objects[i].FixedUpdate();
                    }
                },

                // Update the scene after all update calls
                LateUpdate: function ()
                {
                    for (var i in objects)
                    {
                        if (objects[i].active) objects[i].LateUpdate();
                    }
                },

                // Render the Scene
                Render: function ()
                {
                    for (var i in objects)
                    {
                        if (i !== mainCamera)
                        {
                            objects[i].Render();
                        }
                    }
                },

                // Used to pick an Object in the scene
                OnClick: function ()
                {
                    for (var i in objects)
                    {
                        if (objects[i].active) objects[i].OnClick();
                    }
                },

                // UnLoad the scene, unInstanciate all objects
                UnLoad: function ()
                {
                    for (var i in objects)
                    {
                        if (objects.hasOwnProperty(i))
                        {
                            this.RemoveObject(objects[i]);
                        }
                    }
                }
            };

        return that;
    };
});