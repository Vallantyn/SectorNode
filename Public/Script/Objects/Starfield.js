/**
 * Starfield blah blah lghjgkgk
 * @version 1.01
 */

define(function () {
    /**
     * A starfield parallax using a depth effect.
     *
     * @module
     * @exports Starfield
     * @version 1.1 
     */


    /**
     * Create a new Starfield, unconfigured.
     * @constructor
     */
    var StarField = function () {

        /**
         * Starfield's canvas, used as double buffer.
         */
        this.canvas = document.createElement("canvas");
        this.context;

        var that = this;
        /**
         * The camera configuration. Only used for depth effect.
         * @member
         */
        this.camera = {
            x: 0,
            y: 0,
            z: 0,
            zMin: 0, /** The near plane */
            zMax: 0, /** The far plane */
            width: 0, /** Screen Width */
            height: 0, /** Screen Height */
            offsetX: 0, /** Point of view X coordinate */
            offsetY: 0, /** Point of view Y coordinate */
            depth: 0, /** Depth. */

            /**
             * Set the camera whith the width, height, depth, near and far plane.
             *
             * @param {number} width The canvas width.
             * @param {number} height The canvas height.
             * @param {number} depth The canvas depth.
             * @param {number} min The near plane.
             * @param {number} max The far plane.
             * @this {Starfield.camera}
             */
            set: function (width, height, depth, min, max) {
                this.width = width;
                this.offsetX = width / 2;
                this.height = height;
                this.offsetY = height / 2;
                this.depth = depth;
                this.zMin = min;
                this.zMax = max;

                that.canvas.setAttribute("width", this.width);
                that.canvas.setAttribute("height", this.height);
                that.context = that.canvas.getContext("2d");
            }
        };

        this.canvasWidth; /** Canvas Width */
        this.canvasHeight; /** Canvas Height */

        this.color = "#FFF"; /** Stars color */

        this.xSpeed = 0; /** The Z speed */
        this.ySpeed = 0; /** The Z speed */
        this.zSpeed = 0; /** The Z speed */
    };


    /**
     * Define the number of stars.
     *
     * @param {number} n The number of stars the starfield will contain.
     * @this {Starfield}
     */
    StarField.prototype.set = function (n) {

        if (typeof n === 'number') {
            this._stars = new Array(n);
            return true;
        } else {
            throw new TypeError('The argument must be a Number.');
            return false;
        }
    };


    /**
     * Init the star field and configure the camera.
     *
     * @param {canvas} canvas The HTML canvas.
     * @param {number} min The near plane.
     * @param {number} max The far plane.
     * @this {Starfield}
     */
    StarField.prototype.Init = function (canvas, min, max) {

        for (var i = 0, l = this._stars.length; i < l; i++) {
            this.canvasWidth = canvas.width, this.canvasHeight = canvas.height;

            this.camera.set(this.canvasWidth, this.canvasHeight, 350, min, max);

            var _x = Math.round(Math.random() * this.canvasWidth),
                _y = Math.round(Math.random() * this.canvasHeight),
                _z = Math.random() * this.camera.zMax;

            this._stars[i] = {
                x: _x,
                y: _y,
                z: _z
            };
        }

        return true;
    };

    /**
     * Change the background speed.
     *
     * @param {number} x the new X speed.
     * @param {number} y the new Y speed.
     * @param {number} z the new Z speed.
     * @this {Starfield}
     */
    StarField.prototype.setSpeed = function (x, y, z) {

        var x = y || 0;
        var y = y || 0;
        var z = z || 0;

        this.xSpeed = x;
        this.ySpeed = y;
        this.zSpeed = z;
    };

    /**
     * Change the stars color.
     *
     * @param {number} c the stars color.
     * @this {Starfield}
     */
    StarField.prototype.setColor = function (c) {

        this.color = c;
    };

    /**
     * Update Loop
     *
     * @param {number} dX the X movement difference.
     * @param {number} dY the Y movement difference.
     * @param {number} dZ the Z movement difference.
     * @this {Starfield}
     */
    StarField.prototype.update = function (dX, dY, dZ) {

        for (var i = 0, l = this._stars.length; i < l; i++) {

            var star = this._stars[i];
            var cam = this.camera

            var dX = dX || 0;
            var dY = dY || 0;
            var dZ = dZ || 0;

            star.z -= dZ + this.zSpeed;
            star.x -= dX + this.xSpeed;
            star.y -= dY + this.ySpeed;


            if (star._z > cam.zMax) {
                star.z -= cam.zMax;
                star._z -= cam.zMax;
            }

            if (star.z < cam.zMin) {
                star.z += cam.zMax;
                star._z += cam.zMax;
            }

            if (star.x < -cam.offsetX) {
                star.x += cam.width;
                star._x += cam.width;
            }

            if (star.x > cam.offsetX) {
                star.x -= cam.width;
                star._x -= cam.width;
            }

            if (star.y < -cam.offsetY) {
                star.y += cam.height;
                star._y += cam.height;
            }

            if (star.y > cam.offsetY) {
                star.y -= cam.height;
                star._y -= cam.height;
            }

            var dx = star.x - cam.x;
            var _dx = star._x - cam.x;

            var dy = star.y - cam.y;
            var _dy = star._y - cam.y;

            var dz = star.z - cam.z;
            var _dz = star._z - cam.z;

            var scale = cam.depth / dz;
            var _scale = cam.depth / _dz;

            star.rx = scale * dx + cam.offsetX;
            star._rx = _scale * _dx + cam.offsetX;

            star.ry = scale * dy + cam.offsetY;
            star._ry = _scale * _dy + cam.offsetY;

            star.rz = scale;
            star._rz = _scale;
        }
    };


    /**
     * Render Loop
     *
     * @param {CanvasRenderingContext2D} cx the canvas rendering context.
     * @this {Starfield}
     */
    StarField.prototype.render = function (cx) {

        var ctx = this.context;

        ctx.clearRect(0, 0, this.camera.width, this.camera.height);

        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 2;

        for (var i = 0, l = this._stars.length; i < l; i++) {
            var star = this._stars[i];

            ctx.globalAlpha = 1 - star.z / this.camera.zMax > 0 ? (1 - star.z / this.camera.zMax) : 0;

            if (star.rx == star._rx && star.ry == star._ry) {
                ctx.fillRect(star.rx, star.ry, 2, 2);
            } else {
                ctx.beginPath();
                ctx.moveTo(star._rx, star._ry);
                ctx.lineTo(star.rx, star.ry);
                ctx.closePath;

                ctx.stroke();
            }

            star._z = star.z;
            star._x = star.x;
            star._y = star.y;

            ctx.globalAlpha = 1;

        }

        cx.drawImage(this.canvas, 0, 0);
    };

    return StarField;
});