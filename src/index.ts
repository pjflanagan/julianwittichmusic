import { setupScroll } from "./scroll";
import { setupCanvas } from "./canvas";
import { fetchEvents } from "./calendar";

async function main() {
  setupCanvas();
  setupScroll();
  console.log(await fetchEvents());
}

main();
