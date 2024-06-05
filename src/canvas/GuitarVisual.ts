import { Visual } from './util/Visual';
import { GUITAR_STRING, GuitarString } from './GuitarString';

const DRAW_SPEED = 6;

const GUITAR_STRING_COUNT = 6;
const GUITAR_STRING_GAP = GUITAR_STRING.MAX_OFFSET_X / 2 + 24;
const NECK_WIDTH = GUITAR_STRING_COUNT * GUITAR_STRING.WIDTH + (GUITAR_STRING_COUNT - 1) * GUITAR_STRING_GAP;

export class GuitarVisual extends Visual {
  static visualName = 'Guitar';
  static visualLink = 'guitar';
  strings: GuitarString[];

  constructor(context: CanvasRenderingContext2D) {
    super(context);

    this.strings = [];
  }

  setup() {
    for (let i = 0; i < GUITAR_STRING_COUNT; ++i) {
      const halfWidth = this.W / 2;
      const halfNeck = NECK_WIDTH / 2;
      const stringPosition = i * GUITAR_STRING_GAP + i * GUITAR_STRING.WIDTH;
      const absolutePosition = halfWidth - halfNeck + stringPosition;
      const isEndString = i === GUITAR_STRING_COUNT - 1;
      const guitarString = new GuitarString(this, absolutePosition, isEndString);
      this.strings.push(guitarString);
    }
  }

  drawFrame() {
    this.drawBackground();
    this.strings.forEach((s) => {
      for (let i = 0; i < DRAW_SPEED; ++i) {
        s.move();
      }
      s.draw();
    });
  }

  drawBackground() {
    this.ctx.clearRect(0, 0, this.W, this.H);
  }
}
