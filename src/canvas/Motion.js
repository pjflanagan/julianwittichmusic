"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Motion = void 0;
var Geometry_1 = require("./Geometry");
var Motion = /** @class */ (function () {
    function Motion() {
    }
    Motion.isClose = function (source, target, threshold) {
        return Math.abs(source - target) < threshold;
    };
    Motion.hasReachedPoint = function (sourcePoint, targetPoint, threshold) {
        return Geometry_1.Geometry.distance(sourcePoint, targetPoint) < threshold;
    };
    Motion.isInBounds = function (pos, upperBounds, lowerBounds) {
        if (lowerBounds === void 0) { lowerBounds = Geometry_1.ZERO_POINT; }
        return (pos.x > lowerBounds.x &&
            pos.x < upperBounds.x &&
            pos.y > lowerBounds.y &&
            pos.y < upperBounds.y);
    };
    Motion.isOutOfBounds = function (pos, upperBounds, lowerBounds) {
        if (lowerBounds === void 0) { lowerBounds = Geometry_1.ZERO_POINT; }
        return !Motion.isInBounds(pos, upperBounds, lowerBounds);
    };
    Motion.getPointInDirection = function (cur, angle, radius) {
        return {
            x: cur.x + Math.cos(angle) * radius,
            y: cur.y + Math.sin(angle) * radius,
        };
    };
    // returns a new position in the direction of a point
    // if the point is closer than the speed, it returns the original point
    Motion.moveTowardsPoint = function (cur, to, speed) {
        if (Motion.hasReachedPoint(cur, to, speed)) {
            return cur;
        }
        var angle = Math.atan2(to.y - cur.y, to.x - cur.x);
        return Motion.moveAtAngle(cur, angle, speed);
    };
    // returns a new position in the direction of an angle
    Motion.moveAtAngle = function (pos, angle, speed) {
        return {
            x: pos.x + Math.cos(angle) * speed,
            y: pos.y + Math.sin(angle) * speed,
        };
    };
    // returns a new position in the direction of an angle
    Motion.moveInDirectionOfAngle = function (pos, angle, speed) {
        return {
            x: pos.x + Math.sin(angle) * -speed,
            y: pos.y + Math.cos(angle) * -speed,
        };
    };
    // returns the new angle source should be rotated at
    // if the delta is less than the rotation speed, it does not change the angle
    Motion.rotateTowardsAngleAtSpeed = function (sourceAngle, targetAngle, rotationSpeed) {
        var deltaAngle = Geometry_1.Geometry.getDeltaAngle(sourceAngle, targetAngle);
        if (Math.abs(deltaAngle) < Math.abs(rotationSpeed)) {
            return sourceAngle;
        }
        return sourceAngle - Math.sign(deltaAngle) * rotationSpeed;
    };
    return Motion;
}());
exports.Motion = Motion;
