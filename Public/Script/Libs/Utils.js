/*global FPS:true*/

'use strict';

Function.prototype.inheritsFrom = function (Parent)
{
    this.prototype = new Parent;
    this.prototype.constructor = this;
    this.prototype.base = parent.prototype;

    return this;
};

var time;

var perSecond = function () {
    time = time || new Date();
    var t = new Date();
    var dt = 1000 / (60 - (t - time) / 1000);

    time = t;
    return dt;
};

var requestAnimationFrame = /*window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    ||*/ function (callback) {
        var ps = perSecond();
        var dt = 1000 / (60 * ps);
        window.setTimeout(callback, dt);
        FPS = Math.round(dt * 6000) / 100;
    };

var onEachFrame = function (cb) {
    var _cb = function () {
        cb();
        requestAnimationFrame(_cb);
    };
    _cb();
};