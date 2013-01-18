/// <reference path="/public/script/IntelliSense.js" />

var Renderable = function () {

    Renderable.prototype.base.constructor.call(this);

    this.Render = function () { };
};

Renderable.inheritsFrom(GameObject);