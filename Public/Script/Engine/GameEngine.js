/*global define:true*/

'use strict';

// Global var used to keep a reference to the Engine Object
/*jshint camelcase:false*/ var __Game__;

define('GameEngine',

['Screen', 'Time', 'Input'],

function (Screen, Time, Input)
{
    return function ()
    {
        // PRIVATE part of the class.
        var scene;                 // The current scene
            //screen = new Screen();  // Used to Manage the screen: canvas, rendering, ...

        //var tick; // Used to keep a reference to the game loop

        //Input.Awake();

        // PUBLIC part of the class.
        var that =
            {
                // Reference to the scene, in read only.
                get scene()
                {
                    return scene;
                },

                // Initialization Method.
                Start: function ()
                {
                    //UI.Start();           // Initialize the UI ...

                    Time.Start();           // ... init the Time library ...
                    Input.Start();           // ... init the Input library ...

                    scene.Start();          // ... and the current scene ...

                    that.Update();          // ... finally launch the update loop.
                    that.FixedUpdate();     // And fixed update Loop.
                },

                // Update Loop.
                Update: function ()
                {
                    //Input.Update();               // Update Input

                    Time.Update();                  // Used to update time.deltaTime value

                    scene.Update();                 // Update the current scene
                    scene.LateUpdate();             // Late Update
                    that.Render();                  // Render our Game

                    Time.OnEachFrame(that.Update);  // Start the Loop !
                },

                // Fixed Interval Update Loop.
                FixedUpdate: function ()
                {
                    scene.FixedUpdate();                        // Update the current scene, at fixed Interval. (Used mainly for physics)

                    Time.OnFixedEachFrame(that.FixedUpdate);    // Start the fixed Loop
                },

                // Render Method, called by the Update
                Render: function ()
                {
                    scene.Render(); // Render the current scene.
                    Screen.SwapBuffer();
                    //UI.Render();    // Then render the UI. (The UI will always be on top of the scene)
                },

                // Used on click event
                OnClick: function ()
                {
                    // Do something usefull...
                },

                // Used to change current scene to an other one
                ChangeScene: function (/*Scene*/ scn)
                {
                    var firstTime = false;

                    //UI.UnLoad();    // Unload the UI
                    if (typeof scene !== 'undefined')
                    {
                        firstTime = true;
                        scene.UnLoad();     // then the current scene, if Any
                    }

                    scene = scn;    // change current scene
                    
                    if (!firstTime)
                        scene.Start();  // And Initialize It (only if the game has already started)!

                    return that;
                }
            };

        __Game__ = that;    //Set the global var

        // Global method used to easily instantiate GameObjects
        window.Instantiate = function (/*GameObject*/ object)
        {
            scene.AddObject(object);
        };

        // Global method used to easily destroy GameObjects
        window.Destroy = function (/*GameObject*/ object)
        {
            scene.RemoveObject(object);
        };

        // Global method used to easily destroy GameObjects
        window.ChangeScene = function (/*GameObject*/ scene)
        {
            that.ChangeScene(scene);
        };

        return that;        // Then return it !
    };
});