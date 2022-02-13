import { Renderer } from './gfx/renderer.js';

function run() {
  var canvas = document.getElementById("gl");
  if (!canvas) {
    console.error("could not find canvas with id 'gl'");
    return;
  }

  console.log("setting up renderer with canvas 'gl'");
  var renderer = new Renderer(canvas);

  window.requestAnimationFrame(ts => mainLoop(renderer, ts));
}

function mainLoop(renderer, timestamp) {
  renderer.render(timestamp);
  window.requestAnimationFrame(ts => mainLoop(renderer, timestamp));
}

run();
