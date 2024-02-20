import * as THREE from "three";

/*** Basic settings ***/
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

/*** Styling circles ***/
const materialClone2 = new THREE.MeshBasicMaterial({
  color: 0x006600,
  wireframe: true,
});
const materialClone4 = new THREE.MeshBasicMaterial({
  color: 0x666666,
  wireframe: true,
});

const createPortal = (position, material) => {
  const portal = new THREE.Mesh(geometry, material);
  portal.position.copy(position);
  scene.add(portal);
  return portal;
};

const portalClone2 = createPortal(
  new THREE.Vector3(0, -2.5, 0),
  materialClone2
);
const portalClone4 = createPortal(
  new THREE.Vector3(-2.5, 0, 0),
  materialClone4
);

/*** Camera view ***/
camera.position.z = 40;

/*** Controlling time ***/
let timeVertical = 0;
let timeHorizontal = 0;

/* setting my angles */
let angle1 = Math.PI / 3.2; // portalClone2
let angle2 = -Math.PI / 3.2; // portalClone4
/* ************************* */

const animate = () => {
  requestAnimationFrame(animate);

  const updatePortal = (portal, scaleX, positionX) => {
    const inverseScaleX = 2 - scaleX;
    portal.scale.set(scaleX, 1, scaleX);
    portal.position.x = positionX * inverseScaleX * 1.25;
  };

  const updateVerticalPortal = (portal, scaleZ, positionY) => {
    const inverseScaleZ = 2.5 - scaleZ;
    portal.scale.set(1, inverseScaleZ, inverseScaleZ);
    portal.position.y = positionY * scaleZ * 1.25;
  };

  const scaleX = Math.sin(timeHorizontal * 0.001) * 0.5 + 1.5;
  const verticalAmplitude = Math.sin(timeVertical * 0.001) * 0.5 + 1;

  updatePortal(portalClone2, scaleX, -2.5);
  updatePortal(portalClone4, scaleX, -2.5);
  updateVerticalPortal(portalClone2, verticalAmplitude, -1.5);
  updateVerticalPortal(portalClone4, verticalAmplitude, -1);

  /* rotation angles */
  portalClone2.rotation.z = angle1;
  portalClone4.rotation.z = angle2;

  timeVertical += 60;
  timeHorizontal += 60;

  renderer.render(scene, camera);
};
animate();

/*** Responsive (mobiles, tables, etc) ***/
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
