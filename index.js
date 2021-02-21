const canvas = document.getElementById('canvas');

const width  = window.innerWidth;
const height = window.innerHeight;

canvas.setAttribute('width',  width);
canvas.setAttribute('height', height);

const renderer = new THREE.WebGLRenderer({canvas: canvas});
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(60, width / height);


renderer.setClearColor(0x404040);

const meshParameters = {
    width  : 1, 
    height : 1,
    depth  : 1,

    positionX : 0, 
    positionY : 0,
    positionZ : 0, 

    rotationX : 0, 
    rotationY : 0,
    rotationZ : 0,

    widthSegments  : 4,
    heightSegments : 4,
    depthSegments :  4,

    wireframe : true,
    objectVisible : true
};
camera.position.z = 10;

const gui = new dat.GUI();
gui.add(meshParameters, 'width').min(1).max(30).step(1);
gui.add(meshParameters, 'height').min(1).max(30).step(1);
gui.add(meshParameters, 'depth').min(1).max(30).step(1);

gui.add(meshParameters, 'positionX').min(-10).max(10).step(0.01);
gui.add(meshParameters, 'positionY').min(-10).max(10).step(0.01);
gui.add(meshParameters, 'positionZ').min(-10).max(10).step(0.01);

gui.add(meshParameters, 'rotationX').min(-5).max(5).step(0.01);
gui.add(meshParameters, 'rotationY').min(-5).max(5).step(0.01);
gui.add(meshParameters, 'rotationZ').min(-5).max(5).step(0.01);

gui.add(meshParameters, 'widthSegments').min(1).max(10).step(1);
gui.add(meshParameters, 'heightSegments').min(1).max(10).step(1);
gui.add(meshParameters, 'depthSegments').min(1).max(10).step(1);

gui.add(meshParameters, 'wireframe');
gui.add(meshParameters, 'objectVisible');

const cubeGeometry = 
    new THREE.BoxGeometry(meshParameters.width, meshParameters.height, meshParameters.depth, 
        meshParameters.widthSegments, meshParameters.heightSegments, meshParameters.depthSegments);

const materialCube = new THREE.MeshBasicMaterial({color: 0x9009f0});
const meshCube = new THREE.Mesh(cubeGeometry, materialCube);

const polygons = new THREE.MeshBasicMaterial({
    color:0xFFFF00,
    wireframe:meshParameters.wireframe
})
const meshPolygons = new THREE.Mesh(cubeGeometry.clone(), polygons);

scene.add(meshCube);
scene.add(meshPolygons);
console.log(meshCube);

function animate() {
    editor();
    renderer.render(scene, camera);
    requestAnimationFrame(animate); 
}

function editor() {
    editSize();
    editPosition();
    editRotation();
    editWireframe();
}
function editSize() {
    meshCube.scale.x  = meshParameters.width;
    meshCube.scale.y = meshParameters.height;
    meshCube.scale.z  = meshParameters.depth;
    meshPolygons.scale.x  = meshParameters.width;
    meshPolygons.scale.y = meshParameters.height;
    meshPolygons.scale.z  = meshParameters.depth;
}
function editPosition() {
    meshCube.position.x = meshParameters.positionX;
    meshCube.position.y = meshParameters.positionY;
    meshCube.position.z = meshParameters.positionZ;
    meshPolygons.position.x  = meshParameters.positionX;
    meshPolygons.position.y  = meshParameters.positionY;
    meshPolygons.position.z  = meshParameters.positionZ;
}
function editRotation() {
    meshCube.rotation.x = meshParameters.rotationX;
    meshCube.rotation.y = meshParameters.rotationY;
    meshCube.rotation.z = meshParameters.rotationZ;
    meshPolygons.rotation.x = meshParameters.rotationX;
    meshPolygons.rotation.y = meshParameters.rotationY;
    meshPolygons.rotation.z = meshParameters.rotationZ;
}
function editWireframe() {
    meshPolygons.visible = meshParameters.wireframe;
    meshCube.visible = meshParameters.objectVisible;
    meshCube.geometry.parameters.widthSegments = meshParameters.widthSegments;
    meshCube.geometry.parameters.heightSegments = meshParameters.heightSegments;
    meshCube.geometry.parameters.depthSegments = meshParameters.depthSegments;

}

document.onwheel = function(event) {
    if (event.deltaY < 0) camera.position.z -= 1;
    if (event.deltaY > 0) camera.position.z += 1;
}

animate();