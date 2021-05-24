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
const camera    = new THREE.PerspectiveCamera(75, canvas.width / canvas.height);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

renderer.setClearColor("#8866aa");

let objectsInDataset = [];
let reader = new DatasetReader(dataset_meshes);


let listObjectsOnScene = [];


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
function initLight() {    
    const pointLightLeftFront = new THREE.PointLight(0xFFFFFF, 1, 100);
    pointLightLeftFront.position.set(-5, 0, 5);

    const pointLightRightFront = new THREE.PointLight(0xFFFFFF, 1, 100);
    pointLightRightFront.position.set(5, 0, 5);

    const pointLightLeftBack = new THREE.PointLight(0xFFFFFF, 1, 100);
    pointLightLeftBack.position.set(-5, 0, -5);

    const pointLightRightBack = new THREE.PointLight(0xFFFFFF, 1, 100);
    pointLightRightBack.position.set(5, 0, -5);

    scene.add(pointLightLeftFront);
    scene.add(pointLightRightFront);
    scene.add(pointLightLeftBack);
    scene.add(pointLightRightBack);
}
function init() {
    initLight();
    let planeGeometry = new THREE.PlaneGeometry(20, 20);
    let planeMaterial = new THREE.MeshPhongMaterial(
        {color : "rgb("+getRandom(90, 100) + "," +getRandom(90,100) + "," + getRandom(90, 100) + ")", side : THREE.DoubleSide}
        );
    let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial); 
    
    planeMesh.position.y = -2;
    planeMesh.rotation.x = planeMesh.rotation.x - Math.PI / 2;

    camera.position.z = 15;
    camera.position.y = 5;
    let axes = new THREE.AxesHelper(20);
    
    scene.add(axes);
    scene.add(planeMesh);
    document.getElementById('planeHide').onclick = () => { planeMesh.visible = !planeMesh.visible; }
    document.getElementById('axesHide').onclick = () => { axes.visible = !axes.visible; }
    initSceneController(canvas, axes, camera, canvas.width, canvas.height);
}

function animate() {
    requestAnimationFrame(animate);
    preloadSkybox();
    renderer.render(scene, camera);
    draw();
}

function draw() {
    for (let obj of listObjectsOnScene) {
        if (obj.object.key != 'plane') obj.line.visible = obj.object.checker.checked;
        obj.mesh.visible = obj.object.checker.checked;
    }
}

function loadObjectsFromDataset() {
    let figures = reader.getMeshes();
    for(let [key, value] of figures) {
        for (let i = 0; i < value.length; i++) {
            let object = new ObjectOnScene(key, value[i], i);
            objectsInDataset.push(object);
        }
    }
    let listObjects = [];
    for (let object of objectsInDataset) {
        listNameObjects.insertAdjacentHTML('afterend', object.styleContentHTML);
        let checker = document.getElementById(object.nameContentHTMLCheckbox);
        checker.checked = true;
        object.checker = checker;

        let listPoints = object.pointsObjectGrid;

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

    for (let i = 0; i < listObjects.length; i++) {
        let object = listObjects[i].object;
        let line = listObjects[i].line;

        let figure = listObjects[i].object.figure; 

        const material = new THREE.MeshPhongMaterial({color : figure.colorMesh, side : THREE.DoubleSide});
        const geometry = new THREE.BufferGeometry();

        let vertices = [];
        for (let j = 0; j < figure.pointsMesh.length; j++) {
            vertices.push(figure.pointsMesh[j][0]);
            vertices.push(figure.pointsMesh[j][1]);
            vertices.push(figure.pointsMesh[j][2]);
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
        geometry.computeVertexNormals();
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        listObjectsOnScene.push({object, line, mesh});
    }
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

