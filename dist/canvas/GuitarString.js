"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuitarString = exports.GUITAR_STRING = void 0;
const Canvas_1 = require("./Canvas");
const Motion_1 = require("./Motion");
const Geometry_1 = require("./Geometry");
exports.GUITAR_STRING = {
    OFFSCREEN: 120,
    MAX_OFFSET_X: 42,
    WIDTH: 4,
};
class GuitarString {
    constructor(visual, x, isEndString = false) {
        this.visual = visual;
        this.position = { x, y: -exports.GUITAR_STRING.OFFSCREEN };
        this.isEndString = isEndString;
        this.pullPoint = this.getDefaultPullPoint();
        this.state = 'released';
        this.to = this.pullPoint;
    }
    getDefaultPullPoint() {
        const { H } = this.visual.getSize();
        return { x: 0, y: H / 2 + exports.GUITAR_STRING.OFFSCREEN };
    }
    setNextToPoint() {
        const defaultPoint = this.getDefaultPullPoint();
        const newX = -1 * Math.sign(this.pullPoint.x) * Math.abs(this.pullPoint.x) - 1;
        const newY = this.pullPoint.y - 14 * Math.sign(this.pullPoint.y - defaultPoint.y);
        this.to = { x: newX, y: newY };
        if (Geometry_1.Geometry.distance(this.to, defaultPoint) < 12) {
            this.to = defaultPoint;
        }
    }
    movePullPoint() {
        this.pullPoint = Motion_1.Motion.moveTowardsPoint(this.pullPoint, this.to, 2);
    }
    shouldStop() {
        const defaultPoint = this.getDefaultPullPoint();
        return (Geometry_1.Geometry.distance(this.pullPoint, defaultPoint) < 3
            && Geometry_1.Geometry.isEqual(this.to, defaultPoint));
    }
    move() {
        const { mousePos } = this.visual.getUserPosition();
        if (Motion_1.Motion.isClose(mousePos.x, this.position.x, 12)) {
            this.state = 'held';
        }
        else if (!Motion_1.Motion.isClose(mousePos.x, this.position.x, exports.GUITAR_STRING.MAX_OFFSET_X)) {
            this.state = 'released';
        }
        if (this.state === 'held') {
            this.pullPoint = Geometry_1.Geometry.difference(mousePos, this.position);
            this.setNextToPoint();
        }
        else if (!this.shouldStop()) {
            this.movePullPoint();
            if (Geometry_1.Geometry.distance(this.pullPoint, this.to) < 3) {
                this.setNextToPoint();
            }
        }
    }
    draw() {
        const { H } = this.visual.getSize();
        const maxH = H + exports.GUITAR_STRING.OFFSCREEN * 2;
        const endStringBlockerLayer = this.isEndString ? [{
                id: 'endStringBlocker',
                strokes: [
                    ['moveTo', 0, 0],
                    ['quadraticCurveTo', this.pullPoint.x, this.pullPoint.y, 0, maxH],
                    ['lineTo', 60, maxH],
                    ['lineTo', 60, 0],
                    ['lineTo', 0, 0],
                ],
                lineWidth: exports.GUITAR_STRING.WIDTH,
                fillStyle: '#00f',
            }] : [];
        Canvas_1.Canvas.draw(this.visual.getContext(), {
            position: this.position,
            layers: [
                ...endStringBlockerLayer,
                {
                    id: 'string',
                    strokes: [
                        ['moveTo', 0, 0],
                        ['quadraticCurveTo', this.pullPoint.x, this.pullPoint.y, 0, maxH],
                    ],
                    lineWidth: exports.GUITAR_STRING.WIDTH,
                    strokeStyle: '#fff',
                },
            ]
        });
    }
}
exports.GuitarString = GuitarString;
