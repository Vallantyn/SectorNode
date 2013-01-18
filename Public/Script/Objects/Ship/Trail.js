/// <reference path="/public/script/IntelliSense.js" />

function Trail () {
    ///<summary>Create a trail behind a ship</summary>

    Trail.prototype.base.constructor.call(this);

    ///<field type="Vector2">Decalage</field>
    this.decal = new Vector2(0, 0);
    ///<field type="Vector2">Decalage</field>

    this.array = new Array();

    this.line = new Array();

    this.addTrail = function (pos, c, s) {
        /// <param name="pos" type="Vector2">Trail Position</param>
        /// <param name="c" type="String">Trail Color</param>
        /// <param name="s" type="Number">Trail Size</param>
        this.array.push([pos, c, s]);
        this.line.push(new Array());
    }

    this.Update = function (pos, d, p) {
        /// <param name="pos" type="Vector2">Ship Position</param>
        /// <param name="d" type="Vector2">Ship Direction</param>
        /// <param name="p" type="Boolean">Local Player Trail</param>

        for (var i = 0; i < this.array.length; i++) {
            var part = new Vector2(this.array[i][0].X, this.array[i][0].Y);

            this.line[i].unshift([part.X, part.Y]);

            while (this.line[i].length > 30) {
                this.line[i].pop();
            }

            var _x = 2;

            for (var j = 0; j < this.line[i].length; j++) {
                this.line[i][j][0] -= (d.X + _x);
                this.line[i][j][1] -= d.Y;
            }
        }
    };

    this.Render = function (cx, p) {
        /// <param name="cx" type="CanvasRenderingContext2D">Rendering Canvas</param>
        /// <param name="p" type="Vector2">Position</param>
        cx.lineCap = 'round';
        cx.lineJoin = 'round';

        for (var i = 0; i < this.line.length; i++) {
            for (var j = 0; j < this.line[i].length - 1; j++) {
                cx.globalAlpha = (this.line[i].length - j) / this.line[i].length;

                cx.beginPath();
                cx.moveTo(p.X + this.line[i][j][0], p.Y + this.line[i][j][1]);
                cx.lineTo(p.X + this.line[i][j + 1][0], p.Y + this.line[i][j + 1][1]);
                cx.closePath();

                cx.strokeStyle = this.array[i][1];
                cx.lineWidth = this.array[i][2];
                cx.stroke();
            }
        }
        cx.globalAlpha = 1;
    }
};

Trail.inheritsFrom(Updatable);