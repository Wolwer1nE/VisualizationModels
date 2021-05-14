import * as THREE from 'three';
import dataset_meshes from "../data/small_dataset.json"
import initSceneController from './scene-controller.js'
import initScene from './init-scene.js'
import DatasetReader from './dataset-reader';
import {default as ObjectOnScene} from './object-on-scene';
import {default as SkyboxLoader}  from './skybox-loader';


const canvas = document.getElementById('canvas');
const listNameObjects = document.getElementById('listNameObjects');

initScene(document);

let skyboxLoader = new SkyboxLoader()

const renderer  = new THREE.WebGLRenderer( {canvas : canvas, antialias : true} );
const scene     = new THREE.Scene();
const camera    = new THREE.PerspectiveCamera(60, canvas.width / canvas.height);

let objectsInDataset = [];
let reader = new DatasetReader(dataset_meshes);
let listObjects = [];

let pointOfView = {x : 0, y : 0, z : 0};

init();
loadObjectsFromDataset();
animate();

/* ------------------------------------------------------------------------- */

function preloadSkybox() {
    if (skyboxLoader.readyTextures.length == 6 && !skyboxLoader.isInitSkybox){
        initSkybox();
        skyboxLoader.isInitSkybox = true;
    }
}
function initSkybox()
{   
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        skyboxLoader.readyTextures[0].src,
        skyboxLoader.readyTextures[1].src,
        skyboxLoader.readyTextures[2].src,
        skyboxLoader.readyTextures[3].src,
        skyboxLoader.readyTextures[4].src,
        skyboxLoader.readyTextures[5].src,
    ]);
    scene.background = texture;
}

function init() {
    camera.position.z = 15;
    camera.position.y = 5;
    let axes = new THREE.AxesHelper(20);
    scene.add(axes);
    initSceneController(canvas, axes, camera, canvas.width, canvas.height);
}

function animate() {
    requestAnimationFrame(animate);
    preloadSkybox();
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
            let object = new ObjectOnScene(key, value[i], i);

            if (key == 'thetra') {
                object.countEdges = 6;
                object.countFaceSides = 3;
            }
            if (key == 'cubes') {
                object.countEdges = 12; 
                object.countFaceSides = 4;
            }

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

        scene.add(line);
        listObjects.push({object, line});
    }
}
