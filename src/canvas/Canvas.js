"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
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
exports.Canvas = Canvas;
