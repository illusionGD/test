<!--
 * @Author: IT-hollow
 * @Date: 2022-06-19 20:05:47
 * @LastEditors: hollow
 * @LastEditTime: 2022-07-19 13:16:32
 * @FilePath: \threejs-demo\src\layouts\home.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by efun, All Rights Reserved. 
-->
<template>
    <div class="three-wrap" ref="threeWrap">
        <div class="timer">{{ timer }}</div>
    </div>
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
import { useMouseClickPosition, useMouseDoubleClick } from "../hooks/mouse";
import * as dat from "dat.gui";
const timer = ref(0);
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
addPolygonToScene(axesHelper, scene);

addPolygonToScene(control, scene);
console.log(cube.position);
const gui = new dat.GUI();
gui.add(cube.position, "x").min(0).max(5).step(0.1).name("X轴");

// 时钟
const clock = new THREE.Clock();

onMounted(() => {
    threeWrap.value.appendChild(renderer.domElement);

    animate();
});

useMouseDoubleClick(window, () => {
    const fullscreenElement =
        document.fullscreenElement || document.webkitFullscreenElement;
    if (!fullscreenElement) {
        renderer.domElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

function animate() {
    const time = clock.getElapsedTime();
    timer.value = Math.ceil(time);
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
.timer {
    color: red;
}
</style>
