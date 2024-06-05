import { GuitarVisual } from "canvas/GuitarVisual";
const canvasElement = document.getElementById('canvas');
if (!canvasElement) {
    throw "Unable to get canvas context";
}
const context = canvasElement.getContext("2d");
canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;
if (!context) {
    throw "Unable to get canvas context";
}
const visual = new GuitarVisual(context);
visual.setup();
visual.start();
//# sourceMappingURL=index.js.map