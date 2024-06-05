"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GuitarVisual_1 = require("canvas/GuitarVisual");
function main() {
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
    const visual = new GuitarVisual_1.GuitarVisual(context);
    visual.setup();
    visual.start();
}
main();
