import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Setup the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Setup the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Setup the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Add a grid floor
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// Load the character model
const loader = new GLTFLoader();
let character;
loader.load('scene.gltf', (gltf) => {
    character = gltf.scene;
    character.position.y = -1;
    scene.add(character);
    animate();
}, undefined, (error) => {
    console.error(error);
});

// Control variables
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

// Event listeners for keyboard controls
window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            moveForward = true;
            break;
        case 'ArrowDown':
        case 'KeyS':
            moveBackward = true;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            moveRight = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            moveForward = false;
            break;
        case 'ArrowDown':
        case 'KeyS':
            moveBackward = false;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            moveRight = false;
            break;
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Character movement
    if (character) {
        if (moveForward) character.position.z -= 0.05;
        if (moveBackward) character.position.z += 0.05;
        if (moveLeft) character.position.x -= 0.05;
        if (moveRight) character.position.x += 0.05;

        // Camera follows the character
        camera.position.x = character.position.x;
        camera.position.z = character.position.z + 5;
    }

    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
