import * as THREE from 'three';
import mesh from "../data/small_dataset.json"
import initSceneController from './scene-controller.js'
import initScene from './init-scene.js'
import DatasetReader from './dataset-reader';
import {default as ObjectOnScene} from './object-on-scene';

const canvas = document.getElementById('canvas');
const listNameObjects = document.getElementById('listNameObjects');

initScene(document);

const renderer  = new THREE.WebGLRenderer( {canvas : canvas} );
const scene     = new THREE.Scene();
const camera    = new THREE.PerspectiveCamera(60, canvas.width / canvas.height);

let objectsInDataset = [];
let reader = new DatasetReader(mesh);
let listObjects = [];

let pointOfView = {x : 0, y : 0, z : 0};

init();
loadObjectsFromDataset();
animate();

/* ------------------------------------------------------------------------- */
function init() {
    let planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    let planeMaterial = new THREE.MeshBasicMaterial({color : 0x404040});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    camera.position.z = 15;
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
    draw();
}

function draw() {
    for (let object of listObjects) {
        object.line.visible = object.object.checker.checked;
    }
}

function loadObjectsFromDataset() {
    let figures = reader.getMeshes();
    for(let [key, value] of figures) {
        for (let i = 0; i < value.length; i++) {
            let object = new ObjectOnScene(key+i, value[i]);
            objectsInDataset.push(object);
        }
    }
    for (let object of objectsInDataset)
    {
        listNameObjects.insertAdjacentHTML('afterend', object.styleContentHTML);
        let checker = document.getElementById(object.nameContentHTMLCheckbox);
        checker.checked = true;
        object.checker = checker;

        let listPoints = object.getObjectGrid();
        let objectPoints = [];
    
        for(let i = 0; i < listPoints.length; i++) {
            let vector = new THREE.Vector3(listPoints[i][0], listPoints[i][1], listPoints[i][2]);
            objectPoints.push(vector);
        }
        const material = new THREE.LineBasicMaterial({color:object.color});
        const geometry = new THREE.BufferGeometry().setFromPoints(objectPoints);
        const line = new THREE.Line(geometry, material);

        console.log(line);

        scene.add(line);
        listObjects.push({object, line});
    }
}
