/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GuitarVisual: () => (/* binding */ GuitarVisual)
/* harmony export */ });
/* harmony import */ var _util_Visual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _GuitarString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var DRAW_SPEED = 6;
var GUITAR_STRING_COUNT = 6;
var GUITAR_STRING_GAP = _GuitarString__WEBPACK_IMPORTED_MODULE_1__.GUITAR_STRING.MAX_OFFSET_X / 2 + 24;
var NECK_WIDTH = GUITAR_STRING_COUNT * _GuitarString__WEBPACK_IMPORTED_MODULE_1__.GUITAR_STRING.WIDTH + (GUITAR_STRING_COUNT - 1) * GUITAR_STRING_GAP;
var GuitarVisual = /** @class */ (function (_super) {
    __extends(GuitarVisual, _super);
    function GuitarVisual(context) {
        var _this = _super.call(this, context) || this;
        _this.strings = [];
        return _this;
    }
    GuitarVisual.prototype.setup = function () {
        for (var i = 0; i < GUITAR_STRING_COUNT; ++i) {
            var halfWidth = this.W / 2;
            var halfNeck = NECK_WIDTH / 2;
            var stringPosition = i * GUITAR_STRING_GAP + i * _GuitarString__WEBPACK_IMPORTED_MODULE_1__.GUITAR_STRING.WIDTH;
            var absolutePosition = halfWidth - halfNeck + stringPosition;
            var isEndString = i === GUITAR_STRING_COUNT - 1;
            var guitarString = new _GuitarString__WEBPACK_IMPORTED_MODULE_1__.GuitarString(this, absolutePosition, isEndString);
            this.strings.push(guitarString);
        }
    };
    GuitarVisual.prototype.drawFrame = function () {
        this.drawBackground();
        this.strings.forEach(function (s) {
            for (var i = 0; i < DRAW_SPEED; ++i) {
                s.move();
            }
            s.draw();
        });
    };
    GuitarVisual.prototype.drawBackground = function () {
        this.ctx.clearRect(0, 0, this.W, this.H);
    };
    GuitarVisual.visualName = 'Guitar';
    GuitarVisual.visualLink = 'guitar';
    return GuitarVisual;
}(_util_Visual__WEBPACK_IMPORTED_MODULE_0__.Visual));



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Visual: () => (/* binding */ Visual)
/* harmony export */ });
/* harmony import */ var _Geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

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
        this.diagonalLength = _Geometry__WEBPACK_IMPORTED_MODULE_0__.Geometry.distance({ x: 0, y: 0 }, { x: this.W, y: this.H });
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
        throw 'Method needs to be implemented by child of Visual.';
    };
    Visual.prototype.drawFrame = function () {
        throw 'Method needs to be implemented by child of Visual.';
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
    return Visual;
}());



/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Geometry: () => (/* binding */ Geometry),
/* harmony export */   ZERO_POINT: () => (/* binding */ ZERO_POINT)
/* harmony export */ });
var ZERO_POINT = { x: 0, y: 0 };
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
    Geometry.isEqual = function (a, b) {
        return a.x === b.x && a.y === b.y;
    };
    return Geometry;
}());



/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GUITAR_STRING: () => (/* binding */ GUITAR_STRING),
/* harmony export */   GuitarString: () => (/* binding */ GuitarString)
/* harmony export */ });
/* harmony import */ var _util_Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _util_Geometry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _util_Motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};



var GUITAR_STRING = {
    OFFSCREEN: 120,
    MAX_OFFSET_X: 42,
    WIDTH: 4,
};
var GuitarString = /** @class */ (function () {
    function GuitarString(visual, x, isEndString) {
        if (isEndString === void 0) { isEndString = false; }
        this.visual = visual;
        this.position = { x: x, y: -GUITAR_STRING.OFFSCREEN };
        // used in the UI version to block background
        this.isEndString = isEndString;
        this.pullPoint = this.getDefaultPullPoint();
        this.state = 'released';
        this.to = this.pullPoint;
    }
    GuitarString.prototype.getDefaultPullPoint = function () {
        var H = this.visual.getSize().H;
        return { x: 0, y: H / 2 + GUITAR_STRING.OFFSCREEN };
    };
    GuitarString.prototype.setNextToPoint = function () {
        var defaultPoint = this.getDefaultPullPoint();
        // this.to will be set to (-1 * pullPoint.x, y - 1) once we get there we set a new this.to
        var newX = -1 * Math.sign(this.pullPoint.x) * Math.abs(this.pullPoint.x) - 1;
        var newY = this.pullPoint.y - 14 * Math.sign(this.pullPoint.y - defaultPoint.y);
        this.to = { x: newX, y: newY };
        // if the to point is close to the default, then just use the default
        if (_util_Geometry__WEBPACK_IMPORTED_MODULE_1__.Geometry.distance(this.to, defaultPoint) < 12) {
            this.to = defaultPoint;
        }
    };
    GuitarString.prototype.movePullPoint = function () {
        this.pullPoint = _util_Motion__WEBPACK_IMPORTED_MODULE_2__.Motion.moveTowardsPoint(this.pullPoint, this.to, 2);
    };
    GuitarString.prototype.shouldStop = function () {
        var defaultPoint = this.getDefaultPullPoint();
        return (_util_Geometry__WEBPACK_IMPORTED_MODULE_1__.Geometry.distance(this.pullPoint, defaultPoint) < 3
            && _util_Geometry__WEBPACK_IMPORTED_MODULE_1__.Geometry.isEqual(this.to, defaultPoint));
    };
    GuitarString.prototype.move = function () {
        var mousePos = this.visual.getUserPosition().mousePos;
        // if the pointer has reached the string
        if (_util_Motion__WEBPACK_IMPORTED_MODULE_2__.Motion.isClose(mousePos.x, this.position.x, 12)) {
            // we consider the string being held
            this.state = 'held';
        }
        else if (!_util_Motion__WEBPACK_IMPORTED_MODULE_2__.Motion.isClose(mousePos.x, this.position.x, GUITAR_STRING.MAX_OFFSET_X)) {
            // if we pass the max offset, it has been released
            this.state = 'released';
        }
        if (this.state === 'held') {
            // if it's held then the pull point is the mouse position and we should prep the next to point
            this.pullPoint = _util_Geometry__WEBPACK_IMPORTED_MODULE_1__.Geometry.difference(mousePos, this.position);
            this.setNextToPoint();
        }
        else if (!this.shouldStop()) {
            // Otherwise we have released and we should move the pull point
            this.movePullPoint();
            // If we are close to the to point, set a new to point
            if (_util_Geometry__WEBPACK_IMPORTED_MODULE_1__.Geometry.distance(this.pullPoint, this.to) < 3) {
                this.setNextToPoint();
            }
        }
    };
    GuitarString.prototype.draw = function () {
        var H = this.visual.getSize().H;
        var maxH = H + GUITAR_STRING.OFFSCREEN * 2;
        var endStringBlockerLayer = this.isEndString ? [{
                id: 'endStringBlocker',
                strokes: [
                    ['moveTo', 0, 0],
                    ['quadraticCurveTo', this.pullPoint.x, this.pullPoint.y, 0, maxH],
                    ['lineTo', 60, maxH],
                    ['lineTo', 60, 0],
                    ['lineTo', 0, 0],
                ],
                lineWidth: GUITAR_STRING.WIDTH,
                fillStyle: '#120701', // TODO: this it the background color https://medium.com/@christian.tonye_16869/scss-variables-in-react-typescript-components-de19d7f96245 (importings scss vars)
            }] : [];
        _util_Canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.draw(this.visual.getContext(), {
            position: this.position,
            layers: __spreadArray(__spreadArray([], endStringBlockerLayer, true), [
                {
                    id: 'string',
                    strokes: [
                        ['moveTo', 0, 0],
                        ['quadraticCurveTo', this.pullPoint.x, this.pullPoint.y, 0, maxH],
                    ],
                    lineWidth: GUITAR_STRING.WIDTH,
                    strokeStyle: '#deddd799',
                },
            ], false)
        });
    };
    return GuitarString;
}());



/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Canvas: () => (/* binding */ Canvas)
/* harmony export */ });
function drawStroke(ctx, step, position) {
    var _a = position || { x: 0, y: 0 }, x = _a.x, y = _a.y;
    var moveType = step[0];
    switch (moveType) {
        case 'moveTo':
            ctx.moveTo(x + step[1], y + step[2]);
            break;
        case 'lineTo':
            ctx.lineTo(x + step[1], y + step[2]);
            break;
        case 'quadraticCurveTo':
            ctx.quadraticCurveTo(x + step[1], y + step[2], x + step[3], y + step[4]);
            break;
        case 'arc':
            ctx.arc(x + step[1], y + step[2], step[3], step[4], step[5], step[6]);
            break;
        case 'rect':
            ctx.rect(x + step[1], y + step[2], step[3], step[4]);
            break;
        case 'ellipse':
            ctx.ellipse(x + step[1], y + step[2], step[3], step[4], step[5], step[6], step[7], step[8]);
            break;
        default:
            throw "Unrecognized moveType [".concat(moveType, "] in step");
    }
}
function drawLayer(ctx, layer, position, modifiers) {
    ctx.beginPath();
    try {
        layer.strokes.forEach(function (s) { return drawStroke(ctx, s, position); });
    }
    catch (e) {
        throw "Error in shape [id: ".concat(layer.id, "]: ").concat(e);
    }
    var fillStyle = (modifiers === null || modifiers === void 0 ? void 0 : modifiers.fillStyle) || layer.fillStyle;
    if (fillStyle) {
        if (typeof fillStyle === 'string') {
            ctx.fillStyle = fillStyle;
        }
        else {
            if (fillStyle.type === 'PREDEFINED') {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ctx.fillStyle = fillStyle.gradient;
            }
            else {
                // ctx.fillStyle = Canvas.createLinearGradient(ctx, fillStyle);
            }
        }
        ctx.fill();
    }
    if (layer.strokeStyle) {
        if (layer.lineDash) {
            ctx.setLineDash(layer.lineDash);
        }
        ctx.strokeStyle = layer.strokeStyle;
        ctx.lineWidth = layer.lineWidth || 1;
        ctx.stroke();
        ctx.setLineDash([]);
    }
}
var Canvas = /** @class */ (function () {
    function Canvas() {
    }
    // Draws a fix shape that can be moved (not rotated or resized)
    // If you want to draw something with some parts fixed and some parts variable, you will have to do so manually
    Canvas.draw = function (ctx, instructions, modifiers) {
        var drawingPosition = (modifiers === null || modifiers === void 0 ? void 0 : modifiers.position) || instructions.position;
        // const drawingRotation = modifiers?.rotation || instructions.rotation;
        instructions.layers.forEach(function (l) {
            var _a;
            var shapeModifiers = (_a = modifiers === null || modifiers === void 0 ? void 0 : modifiers.layerModifiers) === null || _a === void 0 ? void 0 : _a.find(function (m) { return m.id === l.id; });
            drawLayer(ctx, l, drawingPosition, shapeModifiers);
        });
    };
    return Canvas;
}());



/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Motion: () => (/* binding */ Motion)
/* harmony export */ });
/* harmony import */ var _Geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

var Motion = /** @class */ (function () {
    function Motion() {
    }
    Motion.isClose = function (source, target, threshold) {
        return Math.abs(source - target) < threshold;
    };
    Motion.hasReachedPoint = function (sourcePoint, targetPoint, threshold) {
        return _Geometry__WEBPACK_IMPORTED_MODULE_0__.Geometry.distance(sourcePoint, targetPoint) < threshold;
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
    return Motion;
}());



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _canvas_GuitarVisual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

function main() {
    var canvasElement = document.getElementById('canvas');
    if (!canvasElement) {
        throw "Unable to get canvas context";
    }
    var context = canvasElement.getContext("2d");
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
    if (!context) {
        throw "Unable to get canvas context";
    }
    var visual = new _canvas_GuitarVisual__WEBPACK_IMPORTED_MODULE_0__.GuitarVisual(context);
    visual.setup();
    visual.start();
}
main();

})();

/******/ })()
;