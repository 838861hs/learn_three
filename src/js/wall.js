import "@scss/wall.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
init();

//ランダムな値を生成する関数
function mapRand(min, max, isInt = false) {
  let rand = Math.random() * (max - min) + min;
  rand = isInt ? Math.round(rand) : rand;
  return rand;
}

//初期化設定
async function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 90;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // ライト
  const amLight = new THREE.AmbientLight(0x3f3f46);
  scene.add(amLight);

  const pLight = new THREE.PointLight(0xffffff, 1, 200);
  pLight.position.set(-26, 7, 100);
  scene.add(pLight);
  pLight.castShadow = true;
  pLight.shadow.mapSize.width = 1024;
  pLight.shadow.mapSize.height = 1024;

  const dLight = new THREE.DirectionalLight(0xaabbff, 0.2);
  dLight.position.set(0, 0, 1);
  scene.add(dLight);

  // メッシュ
  const X_NUM = 8,
    Y_NUM = 10,
    SCALE = 30,
    COLORS = { MAIN: "#f3f4f6", SUB: "#60a5fa" };

  const boxGeo = new THREE.BoxGeometry(SCALE, SCALE, SCALE);
  const mainMate = new THREE.MeshLambertMaterial({ color: COLORS.MAIN });
  const subMate = new THREE.MeshLambertMaterial({ color: COLORS.SUB });

  const boxes = [];
  for (let y = 0; y < Y_NUM; y++) {
    for (let x = 0; x < X_NUM; x++) {
      const material = Math.random() < 0.2 ? subMate : mainMate;
      const box = new THREE.Mesh(boxGeo, material);
      box.position.x = x * SCALE - (X_NUM * SCALE) / 2;
      box.position.y = y * SCALE - (Y_NUM * SCALE) / 2;
      box.position.z = mapRand(-10, 10);
      box.scale.set(0.98, 0.98, 0.98);
      box.castShadow = true;
      box.receiveShadow = true;
      boxes.push(box);
    }
  }
  scene.add(...boxes);

  const control = new OrbitControls(camera, renderer.domElement);

  const TAGET_MESH_NUM = 10;

  function getAction(z) {
    return function () {
      const rand = mapRand(0.01, 0.3);
      const direction = z < 0 ? rand : -rand;
      this.position.z += direction;
    };
  }
  let tergetMeshes = [];
  setInterval(() => {
    tergetMeshes.forEach((mesh) => (mesh.__action = null));
    tergetMeshes = [];
    for (let i = 0; i < TAGET_MESH_NUM; i++) {
      const mesh = boxes[mapRand(0, boxes.length - 1, true)];
      tergetMeshes.push(mesh);

      mesh.__action = getAction(mesh.position.z);
    }
  }, 1000);

  function animate() {
    requestAnimationFrame(animate);
    tergetMeshes.forEach((mesh) => mesh.__action());
    if (150 > camera.position.z) {
      camera.position.z += 0.1;
    }
    control.update();

    renderer.render(scene, camera);
  }

  animate();
}
