import { Canvas } from './Canvas';
import { Visual } from './Visual';
import { GUITAR_STRING, GuitarString } from './GuitarString';
const GUITAR_STRING_COUNT = 4;
const GUITAR_STRING_GAP = GUITAR_STRING.MAX_OFFSET_X / 2 + 24;
const NECK_WIDTH = GUITAR_STRING_COUNT * (GUITAR_STRING.WIDTH + GUITAR_STRING_GAP);
export class GuitarVisual extends Visual {
    constructor(context) {
        super(context);
        this.strings = [];
    }
    setup() {
        for (let i = 0; i < GUITAR_STRING_COUNT; ++i) {
            const halfWidth = this.W / 2;
            const halfNeck = NECK_WIDTH / 2;
            const stringPosition = i * GUITAR_STRING_GAP;
            const guitarString = new GuitarString(this, halfWidth - halfNeck + stringPosition);
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
        Canvas.draw(this.ctx, {
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
GuitarVisual.visualName = 'Guitar';
GuitarVisual.visualLink = 'guitar';
//# sourceMappingURL=GuitarVisual.js.map