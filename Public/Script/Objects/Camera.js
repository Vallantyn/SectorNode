/**
 * Camera blah blah lghjgkgk
 * @version 1.06
 *
 */
define('script/Objects/Camera', function () {
    /**
     * A camera Object used by the starfield
     *
     * @exports Camera
     * @version 1.02
     */
    return Camera;
});


function Camera() {
    /** The near plane */
    this.zMin = 0;
    /** The far plane */
    this.zMax = 0;
    /** Screen Width */
    this.width = 0;
    /** Screen Height */
    this.height = 0;
    /** Point of view X coordinate */
    this.offsetX = 0;
    /** Point of view Y coordinate */
    this.offsetY = 0;
    /** Depth. */
    this.depth = 0;
};

/**
 * Set the camera whith the width, height, depth, near and far plane.
 *
 * @param {number} width The canvas width.
 * @param {number} height The canvas height.
 * @param {number} depth The canvas depth.
 * @param {number} min The near plane.
 * @param {number} max The far plane.
 * @this {Camera}
 */
Camera.prototype.set = function (width, height, depth, min, max) {
    this.width = width;
    this.offsetX = width / 2;
    this.height = height;
    this.offsetY = height / 2;
    this.depth = depth;
    this.zMin = min;
    this.zMax = max;
};