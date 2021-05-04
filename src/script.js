import * as THREE from 'three';
import mesh from "../data/small_dataset.json"
import initSceneController from './scene-controller.js'
import initScene from './init-scene.js'
import DatasetReader from './dataset-reader';
import {default as ObjectOnScene} from './object-on-scene';

const canvas = document.getElementById('canvas');

initScene(document);

const renderer  = new THREE.WebGLRenderer( {canvas : canvas} );
const scene     = new THREE.Scene();
const camera    = new THREE.PerspectiveCamera(60, canvas.width / canvas.height);

let objectsOnScene = [];
let reader = new DatasetReader(mesh);


init();
loadObjectsOnScene();
animate();

/* ------------------------------------------------------------------------- */
function init() {
    let planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    let planeMaterial = new THREE.MeshBasicMaterial({color : 0x404040});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    camera.position.z = 10;
    camera.position.y = 5;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = -5; 
    plane.position.z = 0;
    scene.add(plane);
    let axes = new THREE.AxesHelper(20);
    scene.add(axes);

    initSceneController(canvas, axes, camera, canvas.width, canvas.height);

    renderer.setClearColor(0x909090);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function loadObjectsOnScene() {
    let figures = reader.getMeshes();
    for(let [key, value] of figures) {
        for (let i = 0; i < value.length; i++) {
            let object = new ObjectOnScene(key, value[i]);
            objectsOnScene.push(object);
        }
    }
}
