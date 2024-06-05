"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
function drawStroke(ctx, step, position) {
    const { x, y } = position || { x: 0, y: 0 };
    const [moveType] = step;
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
            throw `Unrecognized moveType [${moveType}] in step`;
    }
}
function drawLayer(ctx, layer, position, modifiers) {
    ctx.beginPath();
    try {
        layer.strokes.forEach((s) => drawStroke(ctx, s, position));
    }
    catch (e) {
        throw `Error in shape [id: ${layer.id}]: ${e}`;
    }
    const fillStyle = (modifiers === null || modifiers === void 0 ? void 0 : modifiers.fillStyle) || layer.fillStyle;
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
class Canvas {
    static draw(ctx, instructions, modifiers) {
        const drawingPosition = (modifiers === null || modifiers === void 0 ? void 0 : modifiers.position) || instructions.position;
        instructions.layers.forEach((l) => {
            var _a;
            const shapeModifiers = (_a = modifiers === null || modifiers === void 0 ? void 0 : modifiers.layerModifiers) === null || _a === void 0 ? void 0 : _a.find((m) => m.id === l.id);
            drawLayer(ctx, l, drawingPosition, shapeModifiers);
        });
    }
}
exports.Canvas = Canvas;
