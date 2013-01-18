/// <reference path="IntelliSense.js" />

var Matrix3 = function (m) {
    data = m || [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
    ]

    this.toIdentity = function () {
        data = [1, 0, 0, 0, 1, 0, 0, 0, 1];
        return data;
    }
};


Matrix3.prototype = {
    get value() {
        return this._value;
    },

    set value(val) {
        if (typeof val === 'object' && val.length === 9) {
            this._value = val;
        } else {
            throw new Error("Wrong attribute type or size");
        }
    }
}

var Mat3 = {
    Identity: function () {
        var _m = [1, 0, 0, 0, 1, 0, 0, 0, 1];
        return _m;
    }
}