<template>
    <div class="three-wrap" ref="threeWrap"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
// import { Scene, PerspectiveCamera, WebGLRenderer, AxesHelper } from "three";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
    createPolygon,
    createAndAddPolygon,
    addPolygonToScene,
} from "../utils/polygon";
import { useMouseClickPosition } from "../hooks/mouse";

const threeWrap = ref(null);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建物体
const cube = createAndAddPolygon({
    type: "box",
    vector: [1, 1, 1],
    material: { color: 0x00ff00 },
    scene,
});

// 创建控制器
const control = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

addPolygonToScene(control, scene);

onMounted(() => {
    threeWrap.value.appendChild(renderer.domElement);

    animate();
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
</script>

<style lang="scss" scoped>
.three-wrap {
    min-height: 100vh;
    width: 100%;
    background-color: #000;
}
</style>
