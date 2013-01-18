/// <reference path="IntelliSense.js" />

var Vector3 = function (v) {
    if (typeof v !== 'undefined') {
        this.X = v.X || v.R || v[0];
        this.Y = v.Y || v.G || v[1];
        this.Z = v.Z || v.B || v[2];
    }
};

Vector3.prototype = {
    get R() {
        return this.X;
    },

    get G() {
        return this.Y;
    },

    get B() {
        return this.Z;
    },

    get XYZ() {
        return [this.X, this.Y, this.Z];
    },
    get RGB() {
        return [this.X, this.Y, this.Z];
    }
};