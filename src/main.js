import { Renderer } from './gfx/renderer.js';
import 'regenerator-runtime/runtime';

var mesh;
var pipeline;
const CLIP_Z = 0.1;

async function run() {
  var canvas = document.getElementById("gl");
  if (!canvas) {
    console.error("could not find canvas with id 'gl'");
    return;
  }

  console.log("setting up renderer with canvas 'gl'");
  var renderer = new Renderer(canvas);
  pipeline = renderer.createPipeline('my-sample-pipeline');

  var vertexSource = (await (await fetch('/assets/shaders/default.vs')).text());
  var fragmentSource = (await (await fetch('/assets/shaders/default.fs')).text());

  pipeline.fragmentShader = fragmentSource;
  pipeline.vertexShader = vertexSource;

  pipeline.commit();
  pipeline.commit();
  pipeline.commit();

  mesh = renderer.createMesh('my-mesh');
  mesh.positions = [ -0.6, -0.8, CLIP_Z,
                     0.0, 0.8, CLIP_Z,
                     0.6, -0.8, CLIP_Z ];
  mesh.indices = [ 0, 1, 2, 0, 2, 1 ];

  window.requestAnimationFrame(ts => mainLoop(renderer, ts));
}

function mainLoop(renderer, timestamp) {
  renderer.clear();
  renderer.renderMesh(mesh, pipeline);
  window.requestAnimationFrame(ts => mainLoop(renderer, timestamp));
}

run();
