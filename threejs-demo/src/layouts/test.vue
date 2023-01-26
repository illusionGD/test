<template></template>
<script setup>
import { onMounted, ref } from "vue";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { Water } from "three/examples/jsm/objects/Water.js";
import waterText from "../assets/images/waternormals.jpg";
import * as THREE from "three";
let scene, camera, renderer, controls, raycaster, water;
let moveForward = false,
    moveBackward = false,
    moveRight = false,
    moveLeft = false;
let isShow = ref(true);
let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();
init();
animate();
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 0, 750);

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.y = 20;

    const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
    light.position.set(0.5, 1, 0.75);
    scene.add(light);

    controls = new PointerLockControls(camera, document.body);
    controls.addEventListener("unlock", () => {});
    scene.add(controls.getObject());
    raycaster = new THREE.Raycaster(
        new THREE.Vector3(),
        new THREE.Vector3(0, -1, 0),
        0,
        10
    );
    const params = {
        color: "#ffffff",
        scale: 4,
        flowX: 1,
        flowY: 1,
    };
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    water = new Water(waterGeometry, {
        color: params.color,
        scale: params.scale,
        flowDirection: new THREE.Vector2(params.flowX, params.flowY),
        textureWidth: 1024,
        textureHeight: 1024,
    });
    water.rotation.x = -Math.PI / 2;
    water.position.y = 1;

    let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
    floorGeometry.rotateX(-Math.PI / 2);

    let position = floorGeometry.attributes.position;

    for (let i = 0, l = position.count; i < l; i++) {
        vertex.fromBufferAttribute(position, i);

        vertex.x += Math.random() * 20 - 10;
        vertex.y += Math.random() * 2;
        vertex.z += Math.random() * 20 - 10;

        position.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices
    position = floorGeometry.attributes.position;

    const colorsFloor = [];

    for (let i = 0, l = position.count; i < l; i++) {
        color.setHSL(
            Math.random() * 0.3 + 0.5,
            0.75,
            Math.random() * 0.25 + 0.75
        );
        colorsFloor.push(color.r, color.g, color.b);
    }

    floorGeometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colorsFloor, 3)
    );
    const floorMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    scene.add(water);
    scene.add(floor);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener("resize", onWindowResize);
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}
onMounted(() => {
    document.addEventListener("click", () => {
        !controls.isLocked && controls.lock();
    });

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
});
function onKeyDown(event) {
    switch (event.code) {
        case "ArrowUp":
        case "KeyW":
            moveForward = true;
            break;

        case "ArrowLeft":
        case "KeyA":
            moveLeft = true;
            break;

        case "ArrowDown":
        case "KeyS":
            moveBackward = true;
            break;

        case "ArrowRight":
        case "KeyD":
            moveRight = true;
            break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case "ArrowUp":
        case "KeyW":
            moveForward = false;
            break;

        case "ArrowLeft":
        case "KeyA":
            moveLeft = false;
            break;

        case "ArrowDown":
        case "KeyS":
            moveBackward = false;
            break;

        case "ArrowRight":
        case "KeyD":
            moveRight = false;
            break;
    }
}
function animate() {
    requestAnimationFrame(animate);
    water.material.uniforms["time"].value += 1.0 / 60.0;
    const time = performance.now();
    if (controls.isLocked === true) {
        const delta = (time - prevTime) / 1000;
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        if (moveForward || moveBackward)
            velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;
        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);
    }
    prevTime = time;
    renderer.render(scene, camera);
}
</script>

<style lang="scss" scoped>
.control-wrap {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.336);
}
</style>
