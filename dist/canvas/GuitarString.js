import { Canvas } from './Canvas';
import { Motion } from './Motion';
import { Geometry } from './Geometry';
export const GUITAR_STRING = {
    OFFSCREEN: 120,
    MAX_OFFSET_X: 42,
    WIDTH: 4,
};
export class GuitarString {
    constructor(visual, x) {
        this.visual = visual;
        this.position = { x, y: -GUITAR_STRING.OFFSCREEN };
        this.pullPoint = this.getDefaultPullPoint();
        this.state = 'released';
        this.to = this.pullPoint;
    }
    getDefaultPullPoint() {
        const { H } = this.visual.getSize();
        return { x: 0, y: H / 2 + GUITAR_STRING.OFFSCREEN };
    }
    setNextToPoint() {
        const defaultPoint = this.getDefaultPullPoint();
        const newX = -1 * Math.sign(this.pullPoint.x) * Math.abs(this.pullPoint.x) - 1;
        const newY = this.pullPoint.y - 14 * Math.sign(this.pullPoint.y - defaultPoint.y);
        this.to = { x: newX, y: newY };
        if (Geometry.distance(this.to, defaultPoint) < 12) {
            this.to = defaultPoint;
        }
    }
    movePullPoint() {
        this.pullPoint = Motion.moveTowardsPoint(this.pullPoint, this.to, 2);
    }
    shouldStop() {
        const defaultPoint = this.getDefaultPullPoint();
        return (Geometry.distance(this.pullPoint, defaultPoint) < 3
            && Geometry.isEqual(this.to, defaultPoint));
    }
    move() {
        const { mousePos } = this.visual.getUserPosition();
        if (Motion.isClose(mousePos.x, this.position.x, 12)) {
            this.state = 'held';
        }
        else if (!Motion.isClose(mousePos.x, this.position.x, GUITAR_STRING.MAX_OFFSET_X)) {
            this.state = 'released';
        }
        if (this.state === 'held') {
            this.pullPoint = Geometry.difference(mousePos, this.position);
            this.setNextToPoint();
        }
        else if (!this.shouldStop()) {
            this.movePullPoint();
            if (Geometry.distance(this.pullPoint, this.to) < 3) {
                this.setNextToPoint();
            }
        }
    }
    draw() {
        const { H } = this.visual.getSize();
        Canvas.draw(this.visual.getContext(), {
            position: this.position,
            layers: [
                {
                    id: 'string',
                    strokes: [
                        ['moveTo', 0, 0],
                        ['quadraticCurveTo', this.pullPoint.x, this.pullPoint.y, 0, H + GUITAR_STRING.OFFSCREEN * 2],
                    ],
                    lineWidth: GUITAR_STRING.WIDTH,
                    strokeStyle: '#fff',
                },
            ]
        });
    }
}
//# sourceMappingURL=GuitarString.js.map