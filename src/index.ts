import { setupScroll } from "./scroll";
import { setupCanvas } from "./canvas";
import { play } from "./audio";

function main() {
  setupCanvas();
  setupScroll();
  play();
}


main();

