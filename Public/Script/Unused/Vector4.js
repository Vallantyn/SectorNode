/// <reference path="IntelliSense.js" />

var Vector4 = function (v) {
    if (typeof v !== 'undefined') {
        this.X = v.X || v.R || v[0];
        this.Y = v.Y || v.G || v[1];
        this.Z = v.Z || v.B || v[2];
        this.W = v.W || v.A || v[3];
    }
};

Vector4.prototype = {
    get R() {
        return this.X;
    },

    get G() {
        return this.Y;
    },

    get B() {
        return this.Z;
    },
    
    get A() {
        return this.W;
    },

    get XYZW() {
        return [this.X, this.Y, this.Z, this.W];
    },
    get RGBA() {
        return [this.X, this.Y, this.Z, this.W];
    }
};