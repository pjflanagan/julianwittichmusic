"use strict";
var __extends = (this && this.__extends) || (function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuitarVisual = void 0;
var Canvas_1 = require("./Canvas");
var Visual_1 = require("./Visual");
var GuitarString_1 = require("./GuitarString");
var GUITAR_STRING_COUNT = 4;
var GUITAR_STRING_GAP = GuitarString_1.GUITAR_STRING.MAX_OFFSET_X / 2 + 24;
var NECK_WIDTH = GUITAR_STRING_COUNT * (GuitarString_1.GUITAR_STRING.WIDTH + GUITAR_STRING_GAP);
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
            var stringPosition = i * GUITAR_STRING_GAP;
            var guitarString = new GuitarString_1.GuitarString(this, halfWidth - halfNeck + stringPosition);
            this.strings.push(guitarString);
        }
    };
    GuitarVisual.prototype.drawFrame = function () {
        this.drawBackground();
        this.strings.forEach(function (s) {
            for (var i = 0; i < 6; ++i) {
                s.move();
            }
            s.draw();
        });
    };
    GuitarVisual.prototype.drawBackground = function () {
        // this.ctx.clearRect(0, 0, this.W, this.H);
        Canvas_1.Canvas.draw(this.ctx, {
            layers: [
                {
                    id: 'background',
                    strokes: [['rect', 0, 0, this.W, this.H]],
                    fillStyle: '#1c1c1c',
                },
            ],
        });
    };
    GuitarVisual.visualName = 'Guitar';
    GuitarVisual.visualLink = 'guitar';
    return GuitarVisual;
}(Visual_1.Visual));
exports.GuitarVisual = GuitarVisual;
