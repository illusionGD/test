<template>
    <div class="three-raycast" ref="threeLoaderDom"></div>
</template>

<script setup lang="ts">
import { getWindowRatio, initRenderer } from '@/utils/threeUtil';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onMounted, ref } from 'vue';
let render: THREE.WebGLRenderer;
let controls: OrbitControls;
const threeLoaderDom = ref()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(55, getWindowRatio(), 1, 2000)
const helper = new THREE.AxesHelper(10)

initScene()
initCamera()
initAxesHelper()
onMounted(() => {
    render = initRenderer(threeLoaderDom.value)
    initControls()
    animate()
})

function initScene() {
    // const ambient = new THREE.AmbientLight(0x666666);
    // const directionalLight = new THREE.DirectionalLight(0x887766);
    // directionalLight.position.set(- 1, 1, 1).normalize();
    // scene.add(directionalLight);
    scene.background = new THREE.Color(0x000000);
    // scene.add(ambient);
}

function initCamera() {
    camera.position.set(0, 20, 50)
}

function initControls() {
    controls = new OrbitControls(camera, threeLoaderDom.value)
    controls.addEventListener('change', animate)
}

function initAxesHelper() {
    scene.add(helper)
}

function animate() {
    render.render(scene, camera)
}
</script>

<style scoped lang="scss">
.three-raycast {
    width: 100%;
    height: 100%;
}
</style>