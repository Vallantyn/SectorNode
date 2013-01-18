/// <reference path="/public/script/IntelliSense.js" />

var Polygon = function (pos) {
    /// <param name="pos" type="Vector2">Polygonal Object Center Position</param>
    //var this = new Updatable();

    if (arguments.length > 0 && arguments[0]) {
        console.log(arguments)

        Polygon.prototype.base.constructor.call(this);
        this.pos = new Vector3(pos[0], pos[1], 0);
    }

    /// <var type="Array" elementType="Vector2">Points Array</var> 
    this.points = new Array();
    /// <var type="Array" elementType="Array">Indice Array</var> 
    this._indice = new Array();
    /// <var type="String">Face Color</var> 
    this._pointColor = new String();

    this.addPoint = function (p) {
        /// <param name="p" type="Vector2">Point Position</param>
        this.points.push(p);
        //console.log(this.points);
    };

    this.setFace = function (p, c) {
        /// <param name="p" type="Array">Face Points Array</param>
        /// <param name="c" type="String">Face Color</param>
        this._indice = p;
        this._pointColor = c;
    };

    this.Rotate = function (d) {
        /// <param name="d" type="Number">Angle in Radians</param>
        for (var p in _points) {
            this.points[p].rotate(d);
        }
    };

    this.Render = function (cx, pos) {
        /// <param name="cx" type="CanvasRenderingContext2D">Main Canvas 2D Context</param>

        console.log(this.points);
        console.log(this._indice);
        console.log(pos);

        cx.beginPath();

        cx.moveTo(
            this.pos.X + this.points[this._indice[0]].X,
            this.pos.Y + this.points[this._indice[0]].Y);

        for (var i = 1; i < this._indice.length; i++) {
            cx.lineTo(
                this.pos.X + this.points[this._indice[i]].X,
                this.pos.Y + this.points[this._indice[i]].Y);
        }

        cx.closePath();

        cx.strokeStyle = this._pointColor;
        cx.fillStyle = '#000';
        cx.lineWidth = '2';
        cx.stroke();
        cx.fill();
    };
};

Polygon.inheritsFrom(Updatable);