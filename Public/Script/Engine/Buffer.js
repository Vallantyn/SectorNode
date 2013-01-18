/*global define:true*/

'use strict';

define('Buffer',

function ()
{
    /*
    Buffer Class
    Represent a back/front canvas
    */
    return function ()
    {
        // PRIVATE part of the class
        var canvas,     //Canvas HTML Element
            context;    //Canvas' context

        // PUBLIC part of the class
        var that =
            {
                // Define the component as Active or not
                active: true,

                get width()
                {
                    return Number(canvas.getAttribute('width'));
                },
                set width(w)
                {
                    canvas.setAttribute('width', w);
                },

                get height()
                {
                    return Number(canvas.getAttribute('height'));
                },
                set height(h)
                {
                    canvas.setAttribute('height', h);
                },

                get data()
                {
                    return canvas;
                },

                get context() {
                    return context;
                },
                set context(/*String*/ cx) {
                    context = canvas.getContext(cx);
                },

                // Create a Buffer from existing HTML Canvas
                CreateFromHTML: function(/*String*/ id) {
                    canvas = document.getElementById(id);

                    return that;
                },
                
                // Create a Back Buffer
                Create: function (/*Int*/ w, /*Int*/ h)
                {
                    canvas = document.createElement('canvas');

                    canvas.setAttribute('width', w);
                    canvas.setAttribute('height', h);

                    return that;
                }
            };

        return that;
    };
});