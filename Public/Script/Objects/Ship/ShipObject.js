/// <reference path="/public/script/IntelliSense.js" />

function ShipObject(pos, color, ID) {
    ///<summary>
    ///Ship base Class
    ///</summary>
    ///<param name='pos' type="Vector2">Ship's Position</param>
    ///<param name='color' type="String">Ship's Color (default: Blue)</param>
    ///<param name='ID' type="Number" optional='true'>Player's ID (provided by the server)</param>

    ShipObject.prototype.base.constructor.call(this, pos);

    this._trailcolor = '#7f0';

    this.dir = new Vector2(0, 0);

    this._angle = 0;
    this._ID = ID;

    this.color = color;
    this.trail = new Trail();

    this.getColor = function () {
        return this.color;
    };

    this.Init = function () {
        ///<summary>
        ///Init the Ship 
        ///</summary>
        /// <returns type="Void" />

        this.addPoint(new Vector3(-5, 1, 10));
        this.addPoint(new Vector3(-8, 1, 25));
        this.addPoint(new Vector3(-13, 1, 28));
        this.addPoint(new Vector3(-13, 1, 10));
        this.addPoint(new Vector3(-10, 1, 2));
        this.setFace([0, 1, 2, 3, 4], "#fff");

        this.addPoint(new Vector3(-5, 1, -10));
        this.addPoint(new Vector3(-8, 1, -25));
        this.addPoint(new Vector3(-13, 1, -28));
        this.addPoint(new Vector3(-13, 1, -10));
        this.addPoint(new Vector3(-10, 1, -2));
        this.setFace([5, 6, 7, 8, 9], "#fff");

        this.addPoint(new Vector3(15, 1, 1.5));
        this.addPoint(new Vector3(-10, 1, 5));
        this.addPoint(new Vector3(-18, 1, 350));
        this.addPoint(new Vector3(-10, 1, -5));
        this.addPoint(new Vector3(15, 1, -1.5));
        this.setFace([10, 11, 12, 13, 14], this.color);

        //this.trail.addTrail(new Vector2(-23, -6), this._trailcolor, 3);
        this.trail.addTrail(new Vector2(-28, 0), this._trailcolor, 4);
        //this.trail.addTrail(new Vector2(-23, 6), this._trailcolor, 3);
    };

    this.Set = function (data) {
        this.pos = new Vector3(data.pos[0], data.pos[1], 0);
        this.dir = data.d;

    };

    this.Update = function (spec) {
        this.pos.X += this.dir.X;
        this.pos.Y += this.dir.Y;

        this.trail.Update(this.pos, this.dir, false);
    };

    this.Render = function (cx, pos) {
        pos = pos || this.pos;

        this.trail.Render(cx, pos);
        ShipObject.prototype.Render.call(this, cx, pos);
    };
};

ShipObject.inheritsFrom(MultiPolygon);