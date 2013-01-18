/// <reference path="/public/script/IntelliSense.js" />

function PlayerShip(pos, color, ID) {
    ///<summary>
    ///A User controlled Ship (Client Side)
    ///</summary>
    ///<param name='pos' type="Vector2">Ship's Position</param>
    ///<param name='color' type="String">Ship's Color (default: Blue)</param>
    ///<param name='ID' type="Number">Player's ID (provided by the server)</param>

    if (arguments.length > 0) PlayerShip.prototype.base.constructor.call(this, pos, color, ID);

    this._trailcolor = '#0ff';

    this._ID = ID;

    this.locPos = new Vector3(450, 400, 0);

    this.dir = new Vector2(0, 0);
    this._speed = 0;
    this._angle = 0;
    this._dAngle = 0;

    var _key = {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        STOP: 81,
        FTL: 83
    };

    this.parseKey = function (key) {
        ///<summary returns='String'>Parse User's key</summary>
        ///<param name='key'>Object with KeyBoard Info inside</param>
        /// <returns type="Object" />

        this._dAngle = 0;

        if (_key.LEFT in key) {
            this.dir.X -= SPEED;
        }

        if (_key.UP in key) {
            this.dir.Y -= SPEED;
        }

        if (_key.RIGHT in key) {
            this.dir.X += SPEED;
        }

        if (_key.DOWN in key) {
            this.dir.Y += SPEED;
        }

        if (_key.STOP in key) {
            this.dir.X *= SPEED * 9;
            this.dir.Y *= SPEED * 9;
        }

        if (_key.FTL in key) {
            this.dir.X <= 1 ? this.dir.X = 3 : 0;
            this.dir.X += this.dir.X >= 100 ? 0 : Math.log(this.dir.X / 2);
        } else {
            if (this.dir.X >= 10) {
                this.dir.X = 10;
            }

            if (this.dir.Y >= 10) {
                this.dir.Y = 10;
            }

            if (this.dir.X <= -5) {
                this.dir.X = -5;
            }

            if (this.dir.Y <= -10) {
                this.dir.Y = -10;
            }
        }

        return { d: this.dir, dl: new Vector2(0, 0) }
    }

    this.Update = function (spec) {
        ///<summary>Update Ship Coordinates</summary>
        ///<param name='spec' value='{d={X:0, Y:0}, dl:{X:0, Y:0}}'>Ship's Direction, and decalage</param>
        /// <returns type="Void" />

        var dX = spec.d.X - spec.dl.X, dY = spec.d.Y - spec.dl.Y;

        this.pos.X += dX;
        this.pos.Y += dY;

        this.trail.Update(this.locPos, spec.d, true);
    };

    this.Render = function (cx) {
        ///<summary>Draw Ship</summary>
        ///<param name='cx' type='CanvasRenderingContext2D'>Rendering Canvas</param>
        /// <returns type="Void" />

        this.trail.Render(cx, this.locPos);
        this.base.Render.call(this, cx, this.locPos);
    }
};

PlayerShip.inheritsFrom(ShipObject);