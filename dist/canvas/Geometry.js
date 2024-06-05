"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Geometry = exports.ZERO_POINT = void 0;
exports.ZERO_POINT = { x: 0, y: 0 };
class Geometry {
    static difference(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        };
    }
    static distance(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }
    static distance3D(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2));
    }
    static ellipseCircleIntersection({ ellipseRadiusX, ellipseRadiusY, circleRadius, }) {
        const num = ellipseRadiusX * ellipseRadiusX - circleRadius * circleRadius;
        const denom = (ellipseRadiusX * ellipseRadiusX) / (ellipseRadiusY * ellipseRadiusY) - 1;
        const y = Math.sqrt(num / denom);
        const x = Math.sqrt(circleRadius * circleRadius - y * y);
        const values = [
            { x, y, phi: Math.atan2(y, x), theta: -1 },
            { x: -x, y, phi: Math.atan2(y, -x), theta: -1 },
            { x, y: -y, phi: Math.atan2(-y, x), theta: -1 },
            { x: -x, y: -y, phi: Math.atan2(-y, -x), theta: -1 },
        ];
        values.forEach((v) => {
            v.theta = Math.atan((ellipseRadiusX / ellipseRadiusY) * Math.tan(v.phi));
        });
        return values;
    }
    static getAngleTo(sourcePoint, targetPoint) {
        return Math.atan2(targetPoint.x - sourcePoint.x, targetPoint.y - sourcePoint.y);
    }
    static getDeltaAngle(sourceAngle, targetAngle) {
        return Math.atan2(Math.sin(targetAngle - sourceAngle), Math.cos(targetAngle - sourceAngle));
    }
    static degToRad(deg) {
        return deg * (Math.PI / 180);
    }
    static isEqual(a, b) {
        return a.x === b.x && a.y === b.y;
    }
}
exports.Geometry = Geometry;
