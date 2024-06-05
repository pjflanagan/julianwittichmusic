"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visual = void 0;
var Geometry_1 = require("./Geometry");
var Motion_1 = require("./Motion");
var Visual = /** @class */ (function () {
    function Visual(context) {
        this.ctx = context;
        this.isRunning = false;
        this.frameIndex = 0;
        // properties
        this.W = window.innerWidth;
        this.H = window.innerHeight;
        this.shorterSideLength = Math.min(this.W, this.H);
        this.longerSideLength = Math.max(this.W, this.H);
        this.diagonalLength = Geometry_1.Geometry.distance({ x: 0, y: 0 }, { x: this.W, y: this.H });
        // user input
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleStopStart = this.toggleStopStart.bind(this);
        this.maxScrollHeight = 0;
        // user position
        this.mousePos = {
            x: 0,
            y: 0,
        };
        this.scrollY = 0;
    }
    Visual.prototype.setup = function () {
        throw 'Method needs to be implemented by child of Canvas.';
    };
    Visual.prototype.drawFrame = function () {
        throw 'Method needs to be implemented by child of Canvas.';
    };
    Visual.prototype.getContext = function () {
        return this.ctx;
    };
    Visual.prototype.getSize = function () {
        return {
            H: this.H,
            W: this.W,
            shorterSideLength: this.shorterSideLength,
            diagonalLength: this.diagonalLength,
        };
    };
    Visual.prototype.getUserPosition = function () {
        return {
            scrollY: this.scrollY,
            mousePos: this.mousePos,
        };
    };
    Visual.prototype.handleMouseMove = function (e) {
        this.mousePos = {
            x: e.clientX,
            y: e.clientY,
        };
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Visual.prototype.handleMouseDown = function (_e) {
        return;
    };
    Visual.prototype.handleScroll = function (scrollY) {
        this.scrollY = scrollY;
    };
    Visual.prototype.start = function () {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    };
    Visual.prototype.animate = function () {
        this.frameIndex = 0;
        this.drawFrame();
        this.animationReq = window.requestAnimationFrame(this.animate.bind(this));
    };
    Visual.prototype.stop = function () {
        if (this.animationReq) {
            window.cancelAnimationFrame(this.animationReq);
        }
        this.isRunning = false;
    };
    Visual.prototype.toggleStopStart = function () {
        if (this.isRunning) {
            this.stop();
        }
        else {
            this.start();
        }
    };
    Visual.prototype.isPointInBounds = function (point) {
        return Motion_1.Motion.isInBounds(point, { x: this.W, y: this.H }, { x: 0, y: 0 });
    };
    return Visual;
}());
exports.Visual = Visual;
