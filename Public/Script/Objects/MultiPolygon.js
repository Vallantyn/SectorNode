/// <reference path="/public/script/IntelliSense.js" />

var MultiPolygon = function (pos) {
    /// <param name="pos" type="Vector2">Multi Polygonal Object Center Position</param>

    var that = this;

    if (arguments.length > 0) {
        MultiPolygon.prototype.base.constructor.call(this, pos);
    }

    /// <var type="Array" elementType="Vector2">Points Array</var> 
    this.points = new Array();
    /// <var type="Array" elementType="Array">Indice Array</var> 
    this._indice = new Array();
    /// <var type="Array" elementType="String">Face Color</var> 
    this._pointColorz = new Array();

    this.setFace = function (p, c) {
        /// <param name="p" type="Array">Face Points Array</param>
        /// <param name="c" type="String">Face Color</param>
        this._indice.push(p);
        this._pointColorz.push(c);
    };


    this.Rotate = function (d) {
        /// <param name="d" type="Number">Angle in Radians</param>
        for (var p in this.points) {
            this.points[p].rotate(d);
        }
    };

    this.Render = function (cx, pos) {
        /// <param name="cx" type="CanvasRenderingContext2D">Main Canvas 2D Context</param>

        if (arguments.length > 0) {

            for (var j = 0; j < this._pointColorz.length; j++) {

                var pt = this.points[this._indice[j][0]];

                //console.log(pt);

                var dx = pt.X;

                var dy = pt.Y;

                var dz = pt.Z + 0;

                var scale = 350 / dz;

                pt.rx = scale * dx + pos.X;

                pt.ry = scale * dy + pos.Y;

                pt.rz = scale;

                cx.beginPath();

                cx.moveTo(pt.rx, pt.ry);

                for (var i = 1; i < this._indice[j].length; i++) {

                    var pt = this.points[this._indice[j][i]];

                    var dx = pt.X;

                    var dy = pt.Y;

                    var dz = pt.Z + 0;

                    var scale = 350 / dz;

                    pt.rx = scale * dx + pos.X;

                    pt.ry = scale * dy + pos.Y;

                    pt.rz = scale;

                    //console.log([pt.rx, pt.ry, pt.rz]);

                    cx.lineTo(
                        pt.rx,
                        pt.ry)
                }
                cx.closePath();

                cx.strokeStyle = this._pointColorz[j];
                cx.fillStyle = '#000';
                cx.lineWidth = '2';

                cx.stroke();
                cx.fill();
            };
        }
    };

    //return this;
};

MultiPolygon.inheritsFrom(Polygon);