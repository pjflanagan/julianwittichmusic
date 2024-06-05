"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Geometry = exports.ZERO_POINT = void 0;
exports.ZERO_POINT = { x: 0, y: 0 };
var Geometry = /** @class */ (function () {
    function Geometry() {
    }
    Geometry.difference = function (a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        };
    };
    Geometry.distance = function (a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    };
    Geometry.distance3D = function (a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2));
    };
    // Gets the 4 intersection points of a concentric ellipse and circle
    // phi, idk what this represents anymore, but it's used to calculate theta
    // theta is the angle that x and y are at to the center
    Geometry.ellipseCircleIntersection = function (_a) {
        var ellipseRadiusX = _a.ellipseRadiusX, ellipseRadiusY = _a.ellipseRadiusY, circleRadius = _a.circleRadius;
        // https://www.analyzemath.com/EllipseProblems/ellipse_intersection.html
        var num = ellipseRadiusX * ellipseRadiusX - circleRadius * circleRadius;
        var denom = (ellipseRadiusX * ellipseRadiusX) / (ellipseRadiusY * ellipseRadiusY) - 1;
        var y = Math.sqrt(num / denom);
        var x = Math.sqrt(circleRadius * circleRadius - y * y);
        var values = [
            { x: x, y: y, phi: Math.atan2(y, x), theta: -1 },
            { x: -x, y: y, phi: Math.atan2(y, -x), theta: -1 },
            { x: x, y: -y, phi: Math.atan2(-y, x), theta: -1 },
            { x: -x, y: -y, phi: Math.atan2(-y, -x), theta: -1 },
        ];
        // https://www.petercollingridge.co.uk/tutorials/computational-geometry/finding-angle-around-ellipse/
        values.forEach(function (v) {
            v.theta = Math.atan((ellipseRadiusX / ellipseRadiusY) * Math.tan(v.phi));
        });
        return values;
    };
    Geometry.getAngleTo = function (sourcePoint, targetPoint) {
        return Math.atan2(targetPoint.x - sourcePoint.x, targetPoint.y - sourcePoint.y);
    };
    // returns the signed delta angle between two angles
    Geometry.getDeltaAngle = function (sourceAngle, targetAngle) {
        return Math.atan2(Math.sin(targetAngle - sourceAngle), Math.cos(targetAngle - sourceAngle));
    };
    Geometry.degToRad = function (deg) {
        return deg * (Math.PI / 180);
    };
    Geometry.isEqual = function (a, b) {
        return a.x === b.x && a.y === b.y;
    };
    return Geometry;
}());
exports.Geometry = Geometry;
