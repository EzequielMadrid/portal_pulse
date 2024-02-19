import * as THREE from "three";

/***basic settings   ***/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.TorusGeometry(5, 1, 16, 100);

/***  styling circles ***/
const materialOriginal = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
}); // optional
const materialClone1 = new THREE.MeshBasicMaterial({
  color: 0x00aa00,
  wireframe: true,
});
const materialClone2 = new THREE.MeshBasicMaterial({
  color: 0x006600,
  wireframe: true,
});
const materialClone3 = new THREE.MeshBasicMaterial({
  color: 0x003300,
  wireframe: true,
});
const materialClone4 = new THREE.MeshBasicMaterial({
  color: 0x009900,
  wireframe: true,
});

const portalOriginal = new THREE.Mesh(geometry, materialOriginal);
scene.add(portalOriginal); // optional
const portalClone1 = new THREE.Mesh(geometry, materialClone1);
portalClone1.position.y = 4.5;
scene.add(portalClone1);
const portalClone2 = new THREE.Mesh(geometry, materialClone2);
portalClone2.position.y = -2.5;
scene.add(portalClone2);
const portalClone3 = new THREE.Mesh(geometry, materialClone3);
portalClone3.position.x = 2.5;
scene.add(portalClone3);
const portalClone4 = new THREE.Mesh(geometry, materialClone4);
portalClone4.position.x = -2.5;
scene.add(portalClone4);

/*** cam view ***/
camera.position.z = 40;

/*** controlling time ***/
let timeVertical = 0;
let timeHorizontal = 0;

const animate = () => {
  requestAnimationFrame(animate);

  const scaleX = Math.sin(timeHorizontal * 0.001) * 0.5 + 1.5;
  const inverseScaleX = 2 - scaleX;
  portalClone3.scale.set(scaleX, 1, scaleX);
  portalClone4.scale.set(scaleX, 1, scaleX);
  portalClone3.position.x = -inverseScaleX * 1.25;
  portalClone4.position.x = inverseScaleX * 1.25;

  const verticalAmplitude = Math.sin(timeVertical * 0.001) * 0.5 + 1;
  const scaleZ = verticalAmplitude;
  portalOriginal.scale.set(1, 1, scaleZ); // optional
  const inverseScaleZ = 2.5 - scaleZ;
  portalClone1.scale.set(1, inverseScaleZ, inverseScaleZ);
  portalClone2.scale.set(1, inverseScaleZ, inverseScaleZ);
  portalClone1.position.y = scaleZ * 1.25;
  portalClone2.position.y = -scaleZ * 1.25;

  timeVertical += 30; // 30 milliseconds per frame vertically
  timeHorizontal += 30; // 30 milliseconds per frame horizontally

  renderer.render(scene, camera);
};

/*** responsive(mobiles,tables,etc) ***/
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
