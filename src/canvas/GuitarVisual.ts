import { Visual } from './util/Visual';
import { GUITAR_STRING, GuitarString } from './GuitarString';
import * as Theme from '../style/theme.module.scss';

const DRAW_SPEED = 6;

const GUITAR_STRING_COUNT = parseInt(Theme.guitarStringCount);
const GUITAR_STRING_GAP = parseInt(Theme.guitarStringGap);
const NECK_WIDTH = parseInt(Theme.guitarNeckWidth);
const GUITAR_POSTION_X_PERCENT = parseInt(Theme.guitarPositionXPercent) / 100;

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
      const guitarPosition = this.W * GUITAR_POSTION_X_PERCENT;
      const halfNeck = NECK_WIDTH / 2;
      const stringPosition = i * GUITAR_STRING_GAP + i * GUITAR_STRING.WIDTH;
      const absolutePosition = guitarPosition - halfNeck + stringPosition;
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
