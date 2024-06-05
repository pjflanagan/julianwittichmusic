"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuitarString = exports.GUITAR_STRING = void 0;
var Canvas_1 = require("./Canvas");
var Motion_1 = require("./Motion");
var Geometry_1 = require("./Geometry");
exports.GUITAR_STRING = {
    OFFSCREEN: 120,
    MAX_OFFSET_X: 42,
    WIDTH: 4,
};
var GuitarString = /** @class */ (function () {
    function GuitarString(visual, x) {
        this.visual = visual;
        this.position = { x: x, y: -exports.GUITAR_STRING.OFFSCREEN };
        this.pullPoint = this.getDefaultPullPoint();
        this.state = 'released';
        this.to = this.pullPoint;
    }
    GuitarString.prototype.getDefaultPullPoint = function () {
        var H = this.visual.getSize().H;
        return { x: 0, y: H / 2 + exports.GUITAR_STRING.OFFSCREEN };
    };
    GuitarString.prototype.setNextToPoint = function () {
        var defaultPoint = this.getDefaultPullPoint();
        // this.to will be set to (-1 * pullPoint.x, y - 1) once we get there we set a new this.to
        var newX = -1 * Math.sign(this.pullPoint.x) * Math.abs(this.pullPoint.x) - 1;
        var newY = this.pullPoint.y - 14 * Math.sign(this.pullPoint.y - defaultPoint.y);
        this.to = { x: newX, y: newY };
        // if the to point is close to the default, then just use the default
        if (Geometry_1.Geometry.distance(this.to, defaultPoint) < 12) {
            this.to = defaultPoint;
        }
    };
    GuitarString.prototype.movePullPoint = function () {
        this.pullPoint = Motion_1.Motion.moveTowardsPoint(this.pullPoint, this.to, 2);
    };
    GuitarString.prototype.shouldStop = function () {
        var defaultPoint = this.getDefaultPullPoint();
        return (Geometry_1.Geometry.distance(this.pullPoint, defaultPoint) < 3
            && Geometry_1.Geometry.isEqual(this.to, defaultPoint));
    };
    GuitarString.prototype.move = function () {
        var mousePos = this.visual.getUserPosition().mousePos;
        // if the pointer has reached the string
        if (Motion_1.Motion.isClose(mousePos.x, this.position.x, 12)) {
            // we consider the string being held
            this.state = 'held';
        }
        else if (!Motion_1.Motion.isClose(mousePos.x, this.position.x, exports.GUITAR_STRING.MAX_OFFSET_X)) {
            // if we pass the max offset, it has been released
            this.state = 'released';
        }
        if (this.state === 'held') {
            // if it's held then the pull point is the mouse position and we should prep the next to point
            this.pullPoint = Geometry_1.Geometry.difference(mousePos, this.position);
            this.setNextToPoint();
        }
        else if (!this.shouldStop()) {
            // Otherwise we have released and we should move the pull point
            this.movePullPoint();
            // If we are close to the to point, set a new to point
            if (Geometry_1.Geometry.distance(this.pullPoint, this.to) < 3) {
                this.setNextToPoint();
            }
        }
    };
    GuitarString.prototype.draw = function () {
        var H = this.visual.getSize().H;
        Canvas_1.Canvas.draw(this.visual.getContext(), {
            position: this.position,
            layers: [
                {
                    id: 'string',
                    strokes: [
                        ['moveTo', 0, 0],
                        ['quadraticCurveTo', this.pullPoint.x, this.pullPoint.y, 0, H + exports.GUITAR_STRING.OFFSCREEN * 2],
                    ],
                    lineWidth: exports.GUITAR_STRING.WIDTH,
                    strokeStyle: '#fff',
                },
                // {
                //   id: 'pull',
                //   strokes: [['arc', this.pullPoint.x, this.pullPoint.y, 4, 0, 2 * Math.PI, false]],
                //   fillStyle: '#f00'
                // },
                // {
                //   id: 'to',
                //   strokes: [['arc', this.to.x, this.to.y, 4, 0, 2 * Math.PI, false]],
                //   fillStyle: '#0f0'
                // }
            ]
        });
    };
    return GuitarString;
}());
exports.GuitarString = GuitarString;
