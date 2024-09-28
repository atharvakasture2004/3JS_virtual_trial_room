
import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.152.2/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://unpkg.com/three@0.152.2/examples/jsm/loaders/OBJLoader.js';
import { TextureLoader } from 'https://unpkg.com/three@0.152.2/build/three.module.js';

let scene, camera, renderer, controls, humanModel, platform;
const loader = new OBJLoader();
const textureLoader = new TextureLoader();

let upperClothes, lowerClothes, accessories, shoes;
let upperClothesVisible = false, lowerClothesVisible = false, accessoriesVisible = false, shoesVisible = false;

// Texture paths (replace with your texture file paths)
const upperClothesTexturePath = './top_texture.jpeg';
const lowerClothesTexturePath = './top_texture2.jpeg';
const accessoriesTexturePath = './hat_texture.jpeg';
const shoesTexturePath = './cropped-image.jpeg';

function init() {
  scene = new THREE.Scene();

  // Set up the camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(1.5, 35, 30);

  // Set up the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add OrbitControls for camera movements
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableRotate = true;


    // Restrict camera movement along the y-axis
    controls.minPolarAngle = Math.PI / 2; // Limit vertical movement
    controls.maxPolarAngle = Math.PI / 2; // Same limit for top and bottom

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  // Load the platform
  loadPlatform();

  // Load human model
  loader.load('./human.obj',
    (obj) => {
      humanModel = obj;
      humanModel.scale.set(1, 1, 1);
      scene.add(humanModel);
      console.log('Human model loaded successfully');
    },
    (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
    (error) => console.error('Error loading human model:', error)
  );

  // Render loop
  animate();
}

// Load platform (always visible)
function loadPlatform() {
  loader.load('./stageobj.obj',  // Path to your platform .obj file
    (obj) => {
      platform = obj;
      platform.scale.set(3, 2, 3);  // Adjust scale if necessary
      platform.position.set(1.8, -4, 2);  // Adjust position to place it under the human model
      scene.add(platform);
      console.log('Platform loaded successfully');
    },
    (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
    (error) => console.error('Error loading platform:', error)
  );
}

// Load upper clothes with texture
function loadUpperClothes() {
  if (upperClothes) {
    upperClothesVisible = !upperClothesVisible;
    upperClothes.visible = upperClothesVisible;
  } else {
    loader.load('./top2.obj',
      (obj) => {
        upperClothes = obj;
        upperClothes.position.set(0, -0.5, 1); // Adjust position
        upperClothes.scale.set(0.15, 0.12, 0.25); // Adjust scale

        // Apply texture
        const upperClothesTexture = textureLoader.load(upperClothesTexturePath);
        upperClothes.traverse((child) => {
          if (child.isMesh) {
            child.material.map = upperClothesTexture; // Apply the texture to the material
            child.material.needsUpdate = true;
          }
        });

        scene.add(upperClothes);
        upperClothesVisible = true;
        upperClothes.visible = upperClothesVisible;
        console.log('Upper clothes loaded with texture');
      },
      null,
      (error) => console.error('Error loading upper clothes:', error)
    );
  }
}

// Load lower clothes with texture
function loadLowerClothes() {
  if (lowerClothes) {
    lowerClothesVisible = !lowerClothesVisible;
    lowerClothes.visible = lowerClothesVisible;
  } else {
    loader.load('./bottom.obj',
      (obj) => {
        lowerClothes = obj;
        lowerClothes.rotation.x = 3 * Math.PI / 2;
        lowerClothes.position.set(0, 0, -0.8); // Adjust position
        lowerClothes.scale.set(0.29, 0.37, 0.26); // Adjust scale

        // Apply texture
        const lowerClothesTexture = textureLoader.load(lowerClothesTexturePath);
        lowerClothes.traverse((child) => {
          if (child.isMesh) {
            child.material.map = lowerClothesTexture;
            child.material.needsUpdate = true;
          }
        });

        scene.add(lowerClothes);
        lowerClothesVisible = true;
        lowerClothes.visible = lowerClothesVisible;
        console.log('Lower clothes loaded with texture');
      },
      null,
      (error) => console.error('Error loading lower clothes:', error)
    );
  }
}

// Load accessories with texture
function loadAccessories() {
  if (accessories) {
    accessoriesVisible = !accessoriesVisible;
    accessories.visible = accessoriesVisible;
  } else {
    loader.load('./hat.obj',
      (obj) => {
        accessories = obj;
        accessories.position.set(-0.8, 18.9, -1.9); // Adjust position
        accessories.scale.set(0.2, 0.2, 0.2); // Adjust scale

        // Apply texture
        const accessoriesTexture = textureLoader.load(accessoriesTexturePath);
        accessories.traverse((child) => {
          if (child.isMesh) {
            child.material.map = accessoriesTexture;
            child.material.needsUpdate = true;
          }
        });

        scene.add(accessories);
        accessoriesVisible = true;
        accessories.visible = accessoriesVisible;
        console.log('Accessories loaded with texture');
      },
      null,
      (error) => console.error('Error loading accessories:', error)
    );
  }
}

// Load shoes with texture
function loadShoes() {
  if (shoes) {
    shoesVisible = !shoesVisible;
    shoes.visible = shoesVisible;
  } else {
    loader.load('./shoes.obj',
      (obj) => {
        shoes = obj;
        shoes.position.set(0.3, 0, 0.25); // Adjust position
        shoes.scale.set(0.25, 0.25, 0.25); // Adjust scale

        // Apply texture
        const shoesTexture = textureLoader.load(shoesTexturePath);
        shoes.traverse((child) => {
          if (child.isMesh) {
            child.material.map = shoesTexture;
            child.material.needsUpdate = true;
          }
        });

        scene.add(shoes);
        shoesVisible = true;
        shoes.visible = shoesVisible;
        console.log('Shoes loaded with texture');
      },
      null,
      (error) => console.error('Error loading shoes:', error)
    );
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// Event listeners for buttons
document.getElementById('upper-clothes-btn').addEventListener('click', loadUpperClothes);
document.getElementById('lower-clothes-btn').addEventListener('click', loadLowerClothes);
document.getElementById('accessories-btn').addEventListener('click', loadAccessories);
document.getElementById('shoes-btn').addEventListener('click', loadShoes);

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize the scene
init();






