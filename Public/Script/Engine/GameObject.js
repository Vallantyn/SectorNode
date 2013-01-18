/*global define:true*/

'use strict';

define('GameObject',

['Transform'],

function (Transform)
{
    /*
    GameObject Class
    Represent the Base object of the Engine
    */
    return function ()
    {
        // PRIVATE part of the class
        var id = Math.floor(Math.random() * 1000000); // Used to identify the object
        var additionalComp = 0; // Used to keep a trace of the added behaviours

        // Common components
        var components = {
            camera: null,               //Represent an in-game view
            collider: null,             // Used on physics
            mesh: null,                 // Raw Model data
            renderer: null,             // Used to render the object

            transform: new Transform()  // Always present on a gameobject, used to place the object in the scene, and hold the hierarchy of the object (parent/child relationship)
        };

        // PUBLIC part of the class
        var that =
            {
                active: true,   // Used to know if the Game Object will be updated each frame
                tag: 'none', // Tag the object with the Tag Enum. Usefull in terms of GamePlay Mechanics.

                get id()
                {
                    return id;
                },

                // Used to add behaviours to the Game Object
                AddComponent: function (/*Component*/ comp)
                {
                    //Set the gameObject reference
                    Object.defineProperty(comp, 'gameObject', {
                        get: function ()
                        {
                            return that;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    components[additionalComp] = comp;  // Add the behaviour to the array
                    additionalComp++;   // Increment the additional component integer

                    return that;
                },

                // Used to add behaviours to the Game Object
                SetComponent: function (/*String*/ name, /*Component*/ comp)
                {
                    //Set the gameObject reference
                    Object.defineProperty(comp, 'gameObject', {
                        get: function ()
                        {
                            return that;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    //Set the gameObject reference
                    Object.defineProperty(that, name, {
                        get: function ()
                        {
                            return comp;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    components[name] = comp;

                    return that;
                },

                // Init active component
                Start: function ()
                {
                    if (!that.active) return; // If the gameObject is inactive, it's component won't be initiated

                    for (var i in components)
                    {
                        if (components[i] !== null && components[i].active)
                        {
                            if (components[i].Start) components[i].Start();
                        }
                    }
                },

                // Update active components
                Update: function ()
                {
                    if (!that.active) return; // If the gameObject is inactive, it's component won't be updated

                    for (var i in components)
                    {
                        if (components[i] !== null && components[i].Update && components[i].active) components[i].Update();
                    }
                },

                // Update loop executed at fixed interval
                FixedUpdate: function ()
                {
                    if (!that.active) return; // If the gameObject is inactive, it's component won't be updated

                    for (var i in components)
                    {
                        if (components[i] !== null && components[i].FixedUpdate && components[i].active) components[i].FixedUpdate();
                    }
                },

                // Executed after ALL updates
                LateUpdate: function ()
                {
                    if (!that.active) return; // If the gameObject is inactive, it's component won't be updated

                    for (var i in components)
                    {
                        if (components[i] !== null && components[i].LateUpdate && components[i].active) components[i].LateUpdate();
                    }
                },

                // Call the Renderer (if any)
                Render: function ()
                {
                    /*
                    Tricky part :
                        if the gameObject is inactive, it will be rendered
                        BUT if the renderer is inactive, it won't
                    */
                    if (components.renderer !== null && components.renderer.active)
                        components.renderer.Render();

                    if (!that.active) return; // If the gameObject is inactive, the GUI Element won't be rendered
                    for (var i in components)
                        if (components[i] !== null && components[i].UI && components[i].active)
                            components[i].UI();
                }
            };

        // Little loop used to set the component attributes, and to add a read-only reference to the gameobject in the components
        for (var i in components)
        {
            if (components.hasOwnProperty(i))
            {
                // Gameobject Read attributes
                Object.defineProperty(that, i, {
                    get: function ()
                    {
                        return components[i];
                    },

                    set: function (comp)
                    {
                        // We're checking if we're not passing a wrong component, and throw an error we are
                        if (typeof comp !== 'object')
                        {
                            throw new Error('Invalid Component Type');
                        }

                        components[i] = comp;   // Assign the component to the array

                        // Set the read attribute
                        Object.defineProperty(this, i, {
                            get: function ()
                            {
                                return comp;
                            },
                            enumerable: true,
                            configurable: true
                        });

                        // Set the component "gameObject" attribute
                        Object.defineProperty(comp, 'gameObject', {
                            get: function ()
                            {
                                return that;
                            },
                            enumerable: true,
                            configurable: true
                        });
                    },

                    enumerable: true,
                    configurable: true
                });

                // Set Components GameObject reference
                if (components[i] !== null)
                    Object.defineProperty(components[i], 'gameObject', {
                        get: function ()
                        {
                            return that;
                        },
                        enumerable: true,
                        configurable: true
                    });
            }
        }

        return that; // Return the public part of the class
    };
});