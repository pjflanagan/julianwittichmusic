import { Visual } from './util/Visual';
import { GUITAR_STRING, GuitarString } from './GuitarString';
import Theme from '../../styles/theme.module.scss';
import { DEFAULT_RIFF_DELAY, Riff } from './riff';

const DRAW_SPEED = 4;

const GUITAR_STRING_COUNT = parseInt(Theme.guitarStringCount!);
const GUITAR_STRING_GAP = parseInt(Theme.guitarStringGap!);
const NECK_WIDTH = parseInt(Theme.guitarNeckWidth!);
const GUITAR_POSTION_X_PERCENT = parseInt(Theme.guitarPositionXPercent!) / 100;

const INITIAL_RANDOM_ANIMATION = {
  BAR_COUNT: 3,
  STRING_PLUCK_ODDS: 0.2,
  STRING_PLUCK_MAX_DELAY: 200,
  BAR_DELAY: 600
};

const STRING_INDEX_MAP = {
  G: 3,
  D: 2,
  A: 1,
  E: 0
}

export type StringName = keyof typeof STRING_INDEX_MAP;

const INDEX_STRING_MAP: StringName[] = ['E', 'A', 'D', 'G'];
export const END_STRING: StringName = 'G';


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
      const guitarString = new GuitarString(this, absolutePosition, INDEX_STRING_MAP[i]!);
      this.strings.push(guitarString);
    }

    // CONSIDER:
    // this.playRiff(Superstition);
    // this.initialRandomAnimation();
  }

  pluckString(stringName: StringName, fret: number) {
    this.strings[STRING_INDEX_MAP[stringName]]?.pluck(fret);
  }

  playRiff(riff: Riff, i = 0) {
    const action = riff[i];
    if (!action) {
      return
    }
    if (typeof action === 'number') {
      setTimeout(() => this.playRiff(riff, i + 1), action * DEFAULT_RIFF_DELAY);
    } else {
      this.pluckString(action[0], action[1]);
      setTimeout(() => this.playRiff(riff, i + 1), DEFAULT_RIFF_DELAY);
    }
  }

  initialRiff(riff: Riff) {
    for(let i = 0; i < riff.length; ++i) {
    }
  }

  initialRandomAnimation() {
    for (let i = 0; i < INITIAL_RANDOM_ANIMATION.BAR_COUNT; ++i) {
      this.strings.forEach((string, stringIndex) => {
        if (Math.random() > INITIAL_RANDOM_ANIMATION.STRING_PLUCK_ODDS) {
          setTimeout(() => {
            string.setRandomPullPoint();
          }, stringIndex * Math.random() * INITIAL_RANDOM_ANIMATION.STRING_PLUCK_MAX_DELAY + (i * INITIAL_RANDOM_ANIMATION.BAR_DELAY));
        }
      });
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
