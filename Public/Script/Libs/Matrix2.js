/// <reference path="/public/script/IntelliSense.js" />

function Matrix2(m) {
    ///<summary>
    ///A 2x2 Matrix
    ///</summary>
    ///<param name='m' type="Array" elementType='Number' optional='true'>Matrix Array</param>
    
    this.data = m || [
    0, 0,
    0, 0
    ]


    this.getData = function () {
        /// <summary>Return the Matrix</summary>
        /// <returns type="Matrix2"/>

        return this.data;
    }

    this.toIdentity = function () {
        /// <summary>Set this matrix as an Identity Matrix</summary>
        /// <returns type="Matrix2" />

        this.data = [1, 0, 0, 1];
        return this.data;
    }
};

/// <var>Matrix 2 Global Operations</var>
var Mat2 = {}
Mat2.identity = function () {
    /// <summary>Return an Identity Matrix</summary>
    /// <returns type="Matrix2" />

    var _m = [1, 0, 0, 1];

    return _m;
};

Mat2.rotation = function (d) {
    /// <summary>Return a Rotation Matrix</summary>
    /// <param name="d" type="Number">Angle (In radians)</param>
    /// <returns type="Matrix2" />

    var c = Math.cos(d),
        s = Math.sin(d);

    var a00 = c, a01 = s,
        a10 = -s, a11 = c;

    return [a00, a01, a10, a11];
};

Mat2.multiplyVec2 = function (m, v) {
    /// <summary>Multiply a Matrix2 by a Vector2</summary>
    /// <param name="m" type="Matrix2">A Matrix2</param>
    /// <param name="v" type="Vector2">A Vector2</param>
    /// <returns type="Vector2" />

    var _x = m.getData()[0] * v.X + m.getData()[1] * v.Y,
        _y = m.getData()[2] * v.X + m.getData()[3] * v.Y;

    return new Vector2(_x, _y);
};