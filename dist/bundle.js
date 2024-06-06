/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setupCanvas: () => (/* reexport safe */ _setup__WEBPACK_IMPORTED_MODULE_0__.setupCanvas)
/* harmony export */ });
/* harmony import */ var _setup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setupCanvas: () => (/* binding */ setupCanvas)
/* harmony export */ });
/* harmony import */ var _GuitarVisual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

function setupCanvas() {
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
    var visual = new _GuitarVisual__WEBPACK_IMPORTED_MODULE_0__.GuitarVisual(context);
    visual.setup();
    visual.start();
    document.body.addEventListener('mousemove', visual.handleMouseMove);
    window.addEventListener('resize', setupCanvas);
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GuitarVisual: () => (/* binding */ GuitarVisual)
/* harmony export */ });
/* harmony import */ var _util_Visual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _GuitarString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _style_theme_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
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
var GUITAR_STRING_COUNT = parseInt(_style_theme_module_scss__WEBPACK_IMPORTED_MODULE_2__.guitarStringCount);
var GUITAR_STRING_GAP = parseInt(_style_theme_module_scss__WEBPACK_IMPORTED_MODULE_2__.guitarStringGap);
var NECK_WIDTH = parseInt(_style_theme_module_scss__WEBPACK_IMPORTED_MODULE_2__.guitarNeckWidth);
var GuitarVisual = (function (_super) {
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
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Visual: () => (/* binding */ Visual)
/* harmony export */ });
/* harmony import */ var _Geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

var Visual = (function () {
    function Visual(context) {
        this.ctx = context;
        this.isRunning = false;
        this.frameIndex = 0;
        this.W = window.innerWidth;
        this.H = window.innerHeight;
        this.shorterSideLength = Math.min(this.W, this.H);
        this.longerSideLength = Math.max(this.W, this.H);
        this.diagonalLength = _Geometry__WEBPACK_IMPORTED_MODULE_0__.Geometry.distance({ x: 0, y: 0 }, { x: this.W, y: this.H });
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
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Geometry: () => (/* binding */ Geometry),
/* harmony export */   ZERO_POINT: () => (/* binding */ ZERO_POINT)
/* harmony export */ });
var ZERO_POINT = { x: 0, y: 0 };
var Geometry = (function () {
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
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GUITAR_STRING: () => (/* binding */ GUITAR_STRING),
/* harmony export */   GuitarString: () => (/* binding */ GuitarString)
/* harmony export */ });
/* harmony import */ var _util_Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _util_Geometry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _util_Motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _style_theme_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
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
    MAX_OFFSET_X: parseInt(_style_theme_module_scss__WEBPACK_IMPORTED_MODULE_3__.guitarMaxOffsetX),
    WIDTH: parseInt(_style_theme_module_scss__WEBPACK_IMPORTED_MODULE_3__.guitarStringWidth),
};
var SIDEBAR_PADDING = parseInt(_style_theme_module_scss__WEBPACK_IMPORTED_MODULE_3__.sidebarGuitarOffset) + 6;
var GuitarString = (function () {
    function GuitarString(visual, x, isEndString) {
        if (isEndString === void 0) { isEndString = false; }
        this.visual = visual;
        this.position = { x: x, y: -GUITAR_STRING.OFFSCREEN };
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
        var newX = -1 * Math.sign(this.pullPoint.x) * Math.abs(this.pullPoint.x) - 1;
        var newY = this.pullPoint.y - 14 * Math.sign(this.pullPoint.y - defaultPoint.y);
        this.to = { x: newX, y: newY };
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
        if (_util_Motion__WEBPACK_IMPORTED_MODULE_2__.Motion.isClose(mousePos.x, this.position.x, 12)) {
            this.state = 'held';
        }
        else if (!_util_Motion__WEBPACK_IMPORTED_MODULE_2__.Motion.isClose(mousePos.x, this.position.x, GUITAR_STRING.MAX_OFFSET_X)) {
            this.state = 'released';
        }
        if (this.state === 'held') {
            this.pullPoint = _util_Geometry__WEBPACK_IMPORTED_MODULE_1__.Geometry.difference(mousePos, this.position);
            this.setNextToPoint();
        }
        else if (!this.shouldStop()) {
            this.movePullPoint();
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
                    ['lineTo', SIDEBAR_PADDING, maxH],
                    ['lineTo', SIDEBAR_PADDING, 0],
                    ['lineTo', 0, 0],
                ],
                lineWidth: GUITAR_STRING.WIDTH,
                fillStyle: _style_theme_module_scss__WEBPACK_IMPORTED_MODULE_3__.background,
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
                    strokeStyle: _style_theme_module_scss__WEBPACK_IMPORTED_MODULE_3__.stringColor,
                },
            ], false)
        });
    };
    return GuitarString;
}());



/***/ }),
/* 7 */
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
                ctx.fillStyle = fillStyle.gradient;
            }
            else {
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
var Canvas = (function () {
    function Canvas() {
    }
    Canvas.draw = function (ctx, instructions, modifiers) {
        var drawingPosition = (modifiers === null || modifiers === void 0 ? void 0 : modifiers.position) || instructions.position;
        instructions.layers.forEach(function (l) {
            var _a;
            var shapeModifiers = (_a = modifiers === null || modifiers === void 0 ? void 0 : modifiers.layerModifiers) === null || _a === void 0 ? void 0 : _a.find(function (m) { return m.id === l.id; });
            drawLayer(ctx, l, drawingPosition, shapeModifiers);
        });
    };
    return Canvas;
}());



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Motion: () => (/* binding */ Motion)
/* harmony export */ });
/* harmony import */ var _Geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

var Motion = (function () {
    function Motion() {
    }
    Motion.isClose = function (source, target, threshold) {
        return Math.abs(source - target) < threshold;
    };
    Motion.hasReachedPoint = function (sourcePoint, targetPoint, threshold) {
        return _Geometry__WEBPACK_IMPORTED_MODULE_0__.Geometry.distance(sourcePoint, targetPoint) < threshold;
    };
    Motion.moveTowardsPoint = function (cur, to, speed) {
        if (Motion.hasReachedPoint(cur, to, speed)) {
            return cur;
        }
        var angle = Math.atan2(to.y - cur.y, to.x - cur.x);
        return Motion.moveAtAngle(cur, angle, speed);
    };
    Motion.moveAtAngle = function (pos, angle, speed) {
        return {
            x: pos.x + Math.cos(angle) * speed,
            y: pos.y + Math.sin(angle) * speed,
        };
    };
    return Motion;
}());



/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   background: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_theme_module_scss__WEBPACK_IMPORTED_MODULE_6__.background),
/* harmony export */   backgroundDark: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_theme_module_scss__WEBPACK_IMPORTED_MODULE_6__.backgroundDark),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   guitarMaxOffsetX: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_theme_module_scss__WEBPACK_IMPORTED_MODULE_6__.guitarMaxOffsetX),
/* harmony export */   guitarNeckWidth: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_theme_module_scss__WEBPACK_IMPORTED_MODULE_6__.guitarNeckWidth),
/* harmony export */   guitarStringCount: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_theme_module_scss__WEBPACK_IMPORTED_MODULE_6__.guitarStringCount),
/* harmony export */   guitarStringGap: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_theme_module_scss__WEBPACK_IMPORTED_MODULE_6__.guitarStringGap),
/* harmony export */   guitarStringWidth: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_theme_module_scss__WEBPACK_IMPORTED_MODULE_6__.guitarStringWidth),
/* harmony export */   sidebarGuitarOffset: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_theme_module_scss__WEBPACK_IMPORTED_MODULE_6__.sidebarGuitarOffset),
/* harmony export */   stringColor: () => (/* reexport safe */ _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_theme_module_scss__WEBPACK_IMPORTED_MODULE_6__.stringColor)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_theme_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_theme_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_theme_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_theme_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_theme_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 10 */
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 11 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 12 */
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 13 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 14 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 15 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 16 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   background: () => (/* binding */ background),
/* harmony export */   backgroundDark: () => (/* binding */ backgroundDark),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   guitarMaxOffsetX: () => (/* binding */ guitarMaxOffsetX),
/* harmony export */   guitarNeckWidth: () => (/* binding */ guitarNeckWidth),
/* harmony export */   guitarStringCount: () => (/* binding */ guitarStringCount),
/* harmony export */   guitarStringGap: () => (/* binding */ guitarStringGap),
/* harmony export */   guitarStringWidth: () => (/* binding */ guitarStringWidth),
/* harmony export */   sidebarGuitarOffset: () => (/* binding */ sidebarGuitarOffset),
/* harmony export */   stringColor: () => (/* binding */ stringColor)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, ""]);
// Exports
var background = `#0b0400`;
var backgroundDark = `#080300`;
var stringColor = `rgba(232, 230, 215, 0.9215686275)`;
var guitarStringWidth = `2px`;
var guitarStringGap = `18px`;
var guitarStringCount = `4`;
var guitarNeckWidth = `62px`;
var guitarMaxOffsetX = `42px`;
var sidebarGuitarOffset = `21px`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 17 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 18 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

function main() {
    (0,_canvas__WEBPACK_IMPORTED_MODULE_0__.setupCanvas)();
}
main();

})();

/******/ })()
;