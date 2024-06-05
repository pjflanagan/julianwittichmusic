"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visual = void 0;
const Geometry_1 = require("./Geometry");
const Motion_1 = require("./Motion");
class Visual {
    constructor(context) {
        this.ctx = context;
        this.isRunning = false;
        this.frameIndex = 0;
        this.W = window.innerWidth;
        this.H = window.innerHeight;
        this.shorterSideLength = Math.min(this.W, this.H);
        this.longerSideLength = Math.max(this.W, this.H);
        this.diagonalLength = Geometry_1.Geometry.distance({ x: 0, y: 0 }, { x: this.W, y: this.H });
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleStopStart = this.toggleStopStart.bind(this);
        this.maxScrollHeight = 0;
        this.mousePos = {
            x: 0,
            y: 0,
        };
        this.scrollY = 0;
    }
    setup() {
        throw 'Method needs to be implemented by child of Canvas.';
    }
    drawFrame() {
        throw 'Method needs to be implemented by child of Canvas.';
    }
    getContext() {
        return this.ctx;
    }
    getSize() {
        return {
            H: this.H,
            W: this.W,
            shorterSideLength: this.shorterSideLength,
            diagonalLength: this.diagonalLength,
        };
    }
    getUserPosition() {
        return {
            scrollY: this.scrollY,
            mousePos: this.mousePos,
        };
    }
    handleMouseMove(e) {
        this.mousePos = {
            x: e.clientX,
            y: e.clientY,
        };
    }
    handleMouseDown(_e) {
        return;
    }
    handleScroll(scrollY) {
        this.scrollY = scrollY;
    }
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }
    animate() {
        this.frameIndex = 0;
        this.drawFrame();
        this.animationReq = window.requestAnimationFrame(this.animate.bind(this));
    }
    stop() {
        if (this.animationReq) {
            window.cancelAnimationFrame(this.animationReq);
        }
        this.isRunning = false;
    }
    toggleStopStart() {
        if (this.isRunning) {
            this.stop();
        }
        else {
            this.start();
        }
    }
    isPointInBounds(point) {
        return Motion_1.Motion.isInBounds(point, { x: this.W, y: this.H }, { x: 0, y: 0 });
    }
}
exports.Visual = Visual;
