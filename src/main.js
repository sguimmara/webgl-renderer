import 'regenerator-runtime/runtime';

import Renderer from './gfx/Renderer';

let mesh;
let pipeline;
const CLIP_Z = 0.1;

function mainLoop(renderer) {
  renderer.clear();
  renderer.renderMesh(mesh, pipeline);
  window.requestAnimationFrame(() => mainLoop(renderer));
}

async function run() {
  const canvas = document.getElementById('gl');
  if (!canvas) {
    throw new Error("could not find canvas with id 'gl'");
  }

  const renderer = new Renderer(canvas);
  pipeline = renderer.createPipeline('my-sample-pipeline');

  const vertexSource = (await (await fetch('/assets/shaders/default.vs')).text());
  const fragmentSource = (await (await fetch('/assets/shaders/default.fs')).text());

  pipeline.fragmentShader = fragmentSource;
  pipeline.vertexShader = vertexSource;

  pipeline.commit();
  pipeline.commit();
  pipeline.commit();

  mesh = renderer.createMesh('my-mesh');
  mesh.positions = [-0.6, -0.8, CLIP_Z,
    0.0, 0.8, CLIP_Z,
    0.6, -0.8, CLIP_Z];
  mesh.indices = [0, 1, 2, 0, 2, 1];

  window.requestAnimationFrame(() => mainLoop(renderer));
}

run();
