"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuitarVisual = void 0;
const Canvas_1 = require("./Canvas");
const Visual_1 = require("./Visual");
const GuitarString_1 = require("./GuitarString");
const GUITAR_STRING_COUNT = 4;
const GUITAR_STRING_GAP = GuitarString_1.GUITAR_STRING.MAX_OFFSET_X / 2 + 24;
const NECK_WIDTH = GUITAR_STRING_COUNT * (GuitarString_1.GUITAR_STRING.WIDTH + GUITAR_STRING_GAP);
class GuitarVisual extends Visual_1.Visual {
    constructor(context) {
        super(context);
        this.strings = [];
    }
    setup() {
        for (let i = 0; i < GUITAR_STRING_COUNT; ++i) {
            const halfWidth = this.W / 2;
            const halfNeck = NECK_WIDTH / 2;
            const stringPosition = i * GUITAR_STRING_GAP;
            const guitarString = new GuitarString_1.GuitarString(this, halfWidth - halfNeck + stringPosition);
            this.strings.push(guitarString);
        }
    }
    drawFrame() {
        this.drawBackground();
        this.strings.forEach((s) => {
            for (let i = 0; i < 6; ++i) {
                s.move();
            }
            s.draw();
        });
    }
    drawBackground() {
        Canvas_1.Canvas.draw(this.ctx, {
            layers: [
                {
                    id: 'background',
                    strokes: [['rect', 0, 0, this.W, this.H]],
                    fillStyle: '#1c1c1c',
                },
            ],
        });
    }
}
exports.GuitarVisual = GuitarVisual;
GuitarVisual.visualName = 'Guitar';
GuitarVisual.visualLink = 'guitar';
