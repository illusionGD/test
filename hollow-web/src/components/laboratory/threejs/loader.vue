<template>
    <div class="three-loader" ref="threeLoaderDom"></div>
</template>

<script setup lang="ts">
import { getWindowRatio, initRenderer } from '@/utils/threeUtil';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper'
import { onMounted, ref } from 'vue';
// @ts-ignore
import vmd from '@/assets/modules/雷律芽衣2.0/姿势.vmd'
// @ts-ignore
import pmx from '@/assets/modules/雷律芽衣2.0/雷之律者3.0.pmx'
import { onBeforeRouteLeave } from 'vue-router';
let render: THREE.WebGLRenderer;
let controls: OrbitControls;
const threeLoaderDom = ref()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(55, getWindowRatio(), 1, 2000)
const helper = new THREE.AxesHelper(10)
const mmdHelper = new MMDAnimationHelper();
let animationId: number;
const mmdLoader = new MMDLoader();

initScene()
initCamera()
initAxesHelper()
loadModule()
onMounted(() => {
    render = initRenderer(threeLoaderDom.value)
    initControls()
    animate()
})

onBeforeRouteLeave(() => {
    window.cancelAnimationFrame(animationId)
})

function loadModule() {
    mmdLoader.loadWithAnimation(pmx, vmd.replace(/%/g, '%25'), (module) => {
        const mesh = module.mesh
        mesh.position.y = -15
        scene.add(mesh);
    }, () => { }, (err) => {
        console.log(err);
    })
}

function initScene() {
    const ambient = new THREE.AmbientLight(0x666666);
    const directionalLight = new THREE.DirectionalLight(0x887766);
    directionalLight.position.set(- 1, 1, 1).normalize();
    scene.add(directionalLight);
    scene.background = new THREE.Color(0xffffff);
    scene.add(ambient);
}

function initCamera() {
    camera.position.set(0, 20, 50)
}

function initControls() {
    controls = new OrbitControls(camera, threeLoaderDom.value)
}

function initAxesHelper() {
    scene.add(helper)
}

function animate() {
    render.render(scene, camera)
    animationId = window.requestAnimationFrame(animate)
}
</script>

<style scoped lang="scss">
.three-loader {
    width: 100%;
    height: 100%;
}
</style>