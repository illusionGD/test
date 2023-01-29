<template>
    <div class="three-raycast" ref="threeLoaderDom" @mousemove="updateMouse"></div>
</template>

<script setup lang="ts">
import { getWindowRatio, initGridHelper, initRenderer, initStats } from '@/utils/threeUtil';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore()
let render: THREE.WebGLRenderer;
let controls: OrbitControls;
const mouse = new THREE.Vector2()
const num = 10
const threeLoaderDom = ref()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(55, getWindowRatio(), 1, 2000)
const helper = new THREE.AxesHelper(10)
const raycast = new THREE.Raycaster()
const color = new THREE.Color();
const white = new THREE.Color().setHex(0xffffff)
const geometry = new THREE.IcosahedronGeometry(0.5, 3) // 正十二面体
const material = new THREE.MeshPhongMaterial({ color: 0xffffff })
const meshes = new THREE.InstancedMesh(geometry, material, Math.pow(num, 3)) // 创建一组mesh
const stats = initStats()
const gridHelper = initGridHelper()

initScene()
initCamera()
initAxesHelper()
initLight()
initMeshes()
// 内存管理，跳转路由时清除
store.commit('addMemoryManageList', [scene, camera, helper, meshes, raycast, color, white, stats, gridHelper])

onMounted(() => {
    render = initRenderer(threeLoaderDom.value)
    threeLoaderDom.value.appendChild(stats.domElement)
    initControls()
    animate()
})

function initScene() {
    scene.background = new THREE.Color(0x000000);
    scene.add(gridHelper);
}

function initMeshes() {
    let index = 0
    const matrix = new THREE.Matrix4() // 转化矩阵
    const offset = (num - 1) / 2; // 偏移值

    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            for (let k = 0; k < num; k++) {
                matrix.setPosition(offset - i, offset - j, offset - k); // 设置坐标位置
                meshes.setMatrixAt(index, matrix) // 把矩阵坐标赋给小球
                meshes.setColorAt(index, color);
                index++;
            }
        }
    }

    scene.add(meshes)
}

function initLight() {
    const light = new THREE.HemisphereLight(0xffffff, 0x888888)
    light.position.set(0, 1, 0);
    scene.add(light)
}

function initCamera() {
    camera.position.set(0, 20, 50)
    camera.lookAt(0, 0, 0)
}

function updateMouse(e: MouseEvent) {
    const { clientX, clientY } = e
    const navWidth = parseInt(window.getComputedStyle(document.querySelector('.navigation') as HTMLElement).width);
    const domWidth = parseInt(window.getComputedStyle(threeLoaderDom.value).width);

    // 把鼠标坐标限制在[-1,1]
    mouse.x = ((clientX - navWidth) / domWidth) * 2 - 1;
    mouse.y = - (clientY / window.innerHeight) * 2 + 1;

    raycast.setFromCamera(mouse, camera)
    const intersectObjects = raycast.intersectObject(meshes)
    if (intersectObjects.length > 0) {
        const instanceId = intersectObjects[0].instanceId as number;
        meshes.getColorAt(instanceId, color);
        if (color.equals(white)) {
            meshes.setColorAt(instanceId, color.setHex(Math.random() * 0xffffff))
            // @ts-ignore
            meshes.instanceColor.needsUpdate = true;
        }
    }
    animate()
}

function initControls() {
    controls = new OrbitControls(camera, threeLoaderDom.value)
    controls.addEventListener('change', animate)
}

function initAxesHelper() {
    scene.add(helper)
}

function animate() {
    stats.update()
    render.render(scene, camera)
}
</script>

<style scoped lang="scss">
.three-raycast {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>