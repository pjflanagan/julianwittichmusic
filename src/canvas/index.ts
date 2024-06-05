import { GuitarVisual } from "./GuitarVisual";

export function setupCanvas() {
  const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;

  if (!canvasElement) {
    throw "Unable to get canvas context";
  }

  // TODO: if the canvas element isn't visible, then DON'T do anything

  const context = canvasElement.getContext("2d");
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;

  if (!context) {
    throw "Unable to get canvas context";
  }

  const visual = new GuitarVisual(context);
  visual.setup();
  visual.start();

  canvasElement.addEventListener('mousemove', visual.handleMouseMove);

  // TODO: is this creating too many canvases
  window.addEventListener('resize', setupCanvas);
}
