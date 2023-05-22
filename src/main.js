import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import {createCar, createWheels,getCarSideTexture,getCarFrontTexture} from './car';
import {Car, Wheels,getSideTexture,getFrontTexture} from './car2';
import {Car3, Wheels3,getSideTexture3,getFrontTexture3} from './car3';
import {Wheel, getTruckFrontTexture,getTruckSideTexture,Truck} from './track';

let camera;
let scene, renderer, orbit;
let floorMeshes = []
init();



function init() {

    // Renderer setup
    setupRenderer()

    // Camera setup
    setupCamera()
    
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color("grey")

    // Light setup
    setupLight()

    // Create bottom floor
    let planeGeo = new THREE.PlaneBufferGeometry(300,300,10,1)
    planeGeo.rotateX(-Math.PI/2)
    let planeMat = new THREE.MeshLambertMaterial({color: 'green',side: THREE.DoubleSide})
    let plane = new THREE.Mesh(planeGeo,planeMat)
    scene.add(plane)
    floorMeshes.push(plane)

    // Controls setup
    orbit = new OrbitControls(camera, renderer.domElement);
    orbit.update();

    animate()

}
const controls = new PointerLockControls(camera, renderer.domElement)
var control = new PointerLockControls(camera, document.body)
scene.add(control.getObject());
var onKeyUp = function (event){
  switch(event.keyCode){
    case 37: 
    control.moveRight(-5)
    break;

    case 38: 
    control.moveRight(5)
    break;

    case 39: 
    control.moveForward(-5)
    break;

    case 40: 
    control.moveForward(5)
    break;
  }
}
document.addEventListener('keyup', onKeyUp);
document.addEventListener('click', function(){
  control.lock();
});


function render() {
    renderer.render(scene, camera);
}
function animate(){
    render()
    orbit.update()
    requestAnimationFrame(animate)
}

function setupLight() {
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(1, 1, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
}

function setupRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}
function setupCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(50, aspect, 0.01, 30000);
    camera.position.set(300, 50, 300);
    camera.lookAt(0, 200, 0);
}
scene.add(createCar());
scene.add(createWheels());
scene.add(getCarSideTexture());
scene.add(getCarFrontTexture());

scene.add(Car());
scene.add(Wheels());
scene.add(getSideTexture());
scene.add(getFrontTexture());


scene.add(Car3());
scene.add(Wheels3());
scene.add(getSideTexture3());
scene.add(getFrontTexture3());

scene.add(Truck());
scene.add(getTruckSideTexture());
scene.add(getTruckFrontTexture());
scene.add(Wheel());


