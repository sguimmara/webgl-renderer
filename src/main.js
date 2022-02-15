import 'regenerator-runtime/runtime';
import Entity from './Entity';

import Renderer from './gfx/Renderer';

let entity;
const CLIP_Z = 0.1;

function mainLoop(renderer) {
  renderer.clear();
  renderer.render(entity);
  window.requestAnimationFrame(() => mainLoop(renderer));
}

async function run() {
  const canvas = document.getElementById('gl');
  if (!canvas) {
    throw new Error("could not find canvas with id 'gl'");
  }

  const renderer = new Renderer(canvas);
  await renderer.initialize();

  let material = renderer.createMaterial('default');
 
  let mesh = renderer.createMesh('my-mesh');
  mesh.positions = [-0.6, -0.8, CLIP_Z,
    0.0, 0.8, CLIP_Z,
    0.6, -0.8, CLIP_Z];
  mesh.indices = [0, 1, 2, 0, 2, 1];
  
  entity = new Entity();
  entity.mesh = mesh;
  entity.material = material;

  window.requestAnimationFrame(() => mainLoop(renderer));
}

run();
