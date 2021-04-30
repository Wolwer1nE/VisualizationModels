const canvas = document.getElementById("canvas");

const fieldScene = document.getElementsByClassName("scene");
const fieldSidebarObjects    = document.getElementsByClassName("sidebarObjects")[0];
const fieldSidebarProperties = document.getElementsByClassName("sidebarProperties")[0];
const fieldFooter = document.getElementsByClassName("footer")[0];

const PART_BLOCK = 6;
const HEIGHT_FOOTER = window.innerHeight / 20;

const MIN_HEIGHT_BLOCK_LIST_OBJECTS = window.innerHeight / 3;
const MAX_HEIGHT_BLOCK_LIST_OBJECTS = window.innerHeight / 3;
const MIN_HEIGHT_BLOCK_PROPERTIES_OBJECTS = window.innerHeight - MIN_HEIGHT_BLOCK_LIST_OBJECTS;
const MAX_HEIGHT_BLOCK_PROPERTIES_OBJECTS = window.innerHeight - MAX_HEIGHT_BLOCK_LIST_OBJECTS;

const WIDTH_CANVAS = window.innerWidth - window.innerWidth / PART_BLOCK;
const HEIGHT_CANVAS = window.innerHeight - HEIGHT_FOOTER;

canvas.width = WIDTH_CANVAS;
canvas.height = HEIGHT_CANVAS;

const renderer  = new THREE.WebGLRenderer( {canvas : canvas} );
const scene     = new THREE.Scene();
const camera    = new THREE.PerspectiveCamera(60, WIDTH_CANVAS / HEIGHT_CANVAS);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
const cubeMaterial = new THREE.MeshNormalMaterial();
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

cubeMesh.position.y = 0;

camera.position.z = 10;
camera.position.y = 5;

scene.add(cubeMesh);

let wheelState = {
    holdWheel : false,
    
    beginPositionX : undefined, 
    beginPositionY : undefined, 

    previousPositionX : undefined, 
    previousPositionY : undefined,


    coefYaw : 10,     //X
    coefPitch : 10,   //Y
}

let leftMouseButtonState = {
    holdButton : false, 

    beginPositionX : undefined, 
    beginPositionY : undefined, 

    previousPositionX : undefined, 
    previousPositionY : undefined,

    coef : 1,
}

function init() {
    canvas.style = "display: block; background-color: #303050;"
    renderer.setClearColor(0x909090);

    fieldSidebarObjects.style.background = "#320b35";
    fieldSidebarProperties.style.background = "#310062"

    fieldSidebarObjects.style.minHeight    = MIN_HEIGHT_BLOCK_LIST_OBJECTS + 'px';
    fieldSidebarObjects.style.maxHeight    = MAX_HEIGHT_BLOCK_LIST_OBJECTS + 'px';

    fieldSidebarProperties.style.minHeight = MIN_HEIGHT_BLOCK_PROPERTIES_OBJECTS + 'px'
    fieldSidebarProperties.style.maxHeight = MAX_HEIGHT_BLOCK_PROPERTIES_OBJECTS + 'px'

    fieldFooter.style.minHeight = HEIGHT_FOOTER + "px";
    fieldFooter.style.maxHeight = HEIGHT_FOOTER + "px";
    
    fieldFooter.style.minWidth = WIDTH_CANVAS;
    fieldFooter.style.maxWidth = WIDTH_CANVAS;
    
    fieldSidebarObjects.style.overflowY = 'auto'
    fieldSidebarProperties.style.overflowY = 'auto'

    

    let planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    let planeMaterial = new THREE.MeshBasicMaterial({color : 0x404040});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = -0.5; 
    plane.position.z = 0;

    scene.add(new THREE.AxesHelper(20));
    scene.add(plane)
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

canvas.onmousedown = function(event){
    if (event.which == 2 && !wheelState.holdWheel) {
        wheelState.beginPositionX = event.offsetX;
        wheelState.beginPositionY = event.offsetY;
        wheelState.holdWheel = true;
    }

    if (event.which == 1) {
        leftMouseButtonState.beginPositionX = event.offsetX; 
        leftMouseButtonState.beginPositionY = event.offsetY;
        leftMouseButtonState.holdButton = true;
    }
}

canvas.onmousemove = function(event) {
    if (wheelState.holdWheel) {
        let stepX = (wheelState.beginPositionX - event.offsetX) / WIDTH_CANVAS;
        let stepY = (wheelState.beginPositionY - event.offsetY) / HEIGHT_CANVAS;

        if (   stepX < 0 && wheelState.previousPositionX > event.offsetX 
            || stepX > 0 && wheelState.previousPositionX < event.offsetX) {
            wheelState.beginPositionX = wheelState.previousPositionX;
        }

        if (   stepY < 0 && wheelState.previousPositionY > event.offsetY
            || stepY > 0 && wheelState.previousPositionY < event.offsetY){
            wheelState.beginPositionY = wheelState.previousPositionY;
        }

        camera.rotation.y += stepX / wheelState.coefYaw;
        camera.rotation.x += stepY / wheelState.coefPitch;
        wheelState.previousPositionX = event.offsetX; 
        wheelState.previousPositionY = event.offsetY;
    }

    if (leftMouseButtonState.holdButton) {

        let stepX = (leftMouseButtonState.beginPositionX - event.offsetX) / WIDTH_CANVAS;
        let stepY = (leftMouseButtonState.beginPositionY - event.offsetY) / HEIGHT_CANVAS;

        if (   stepX < 0 && leftMouseButtonState.previousPositionX > event.offsetX 
            || stepX > 0 && leftMouseButtonState.previousPositionX < event.offsetX) {
                leftMouseButtonState.beginPositionX = leftMouseButtonState.previousPositionX;
        }
        if (   stepY < 0 && leftMouseButtonState.previousPositionY > event.offsetY
            || stepY > 0 && leftMouseButtonState.previousPositionY < event.offsetY) {
                leftMouseButtonState.beginPositionY = leftMouseButtonState.previousPositionY;
        }

        camera.translateX(stepX / leftMouseButtonState.coef);
        camera.translateY(-stepY / leftMouseButtonState.coef);

        leftMouseButtonState.previousPositionX = event.offsetX;
        leftMouseButtonState.previousPositionY = event.offsetY;
    }
    camera.lookAt(cubeMesh.position);
}

canvas.onmouseup = function(event) {
    if (event.which == 2 && wheelState.holdWheel) {
        wheelState.holdWheel = false;
    }

    if (event.which == 1 && leftMouseButtonState.holdButton) {
        leftMouseButtonState.holdButton = false;
    }
}

canvas.onwheel = function(event) {
    if (event.deltaY < 0) camera.translateZ(-1);
    if (event.deltaY > 0) camera.translateZ(+1);
}


init();
animate();