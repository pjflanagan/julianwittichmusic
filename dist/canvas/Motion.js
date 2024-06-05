import { Geometry, ZERO_POINT } from './Geometry';
export class Motion {
    static isClose(source, target, threshold) {
        return Math.abs(source - target) < threshold;
    }
    static hasReachedPoint(sourcePoint, targetPoint, threshold) {
        return Geometry.distance(sourcePoint, targetPoint) < threshold;
    }
    static isInBounds(pos, upperBounds, lowerBounds = ZERO_POINT) {
        return (pos.x > lowerBounds.x &&
            pos.x < upperBounds.x &&
            pos.y > lowerBounds.y &&
            pos.y < upperBounds.y);
    }
    static isOutOfBounds(pos, upperBounds, lowerBounds = ZERO_POINT) {
        return !Motion.isInBounds(pos, upperBounds, lowerBounds);
    }
    static getPointInDirection(cur, angle, radius) {
        return {
            x: cur.x + Math.cos(angle) * radius,
            y: cur.y + Math.sin(angle) * radius,
        };
    }
    static moveTowardsPoint(cur, to, speed) {
        if (Motion.hasReachedPoint(cur, to, speed)) {
            return cur;
        }
        const angle = Math.atan2(to.y - cur.y, to.x - cur.x);
        return Motion.moveAtAngle(cur, angle, speed);
    }
    static moveAtAngle(pos, angle, speed) {
        return {
            x: pos.x + Math.cos(angle) * speed,
            y: pos.y + Math.sin(angle) * speed,
        };
    }
    static moveInDirectionOfAngle(pos, angle, speed) {
        return {
            x: pos.x + Math.sin(angle) * -speed,
            y: pos.y + Math.cos(angle) * -speed,
        };
    }
    static rotateTowardsAngleAtSpeed(sourceAngle, targetAngle, rotationSpeed) {
        const deltaAngle = Geometry.getDeltaAngle(sourceAngle, targetAngle);
        if (Math.abs(deltaAngle) < Math.abs(rotationSpeed)) {
            return sourceAngle;
        }
        return sourceAngle - Math.sign(deltaAngle) * rotationSpeed;
    }
}
//# sourceMappingURL=Motion.js.map