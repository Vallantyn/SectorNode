/// <reference path="IntelliSense.js" />

Updatable = function() {
    Updatable.prototype.base.constructor.call(this);

    this.Update = function () { };
};

Updatable.inheritsFrom(Renderable);