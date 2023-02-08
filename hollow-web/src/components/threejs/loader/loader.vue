<template>
    <div class="loading" v-if="loading">loading...</div>
    <div class="three-loader" ref="threeLoaderDom"></div>
</template>

<script setup lang="ts">
import { getWindowRatio, initRenderer } from "@/utils/threeUtil"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { MMDLoader } from "three/examples/jsm/loaders/MMDLoader"
// import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper'
import { onMounted, ref } from "vue"
import { useStore } from "vuex"
// @ts-ignore
import vmd from "@/assets/modules/雷律芽衣2.0/姿势.vmd"
// @ts-ignore
import pmx from "@/assets/modules/雷律芽衣2.0/雷之律者3.0.pmx"
const store = useStore()
let render: THREE.WebGLRenderer
let controls: OrbitControls
const loading = ref(true)
const threeLoaderDom = ref()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(55, getWindowRatio(), 1, 2000)
const helper = new THREE.AxesHelper(10)
// const mmdHelper = new MMDAnimationHelper();
const mmdLoader = new MMDLoader()

initScene()
initCamera()
initAxesHelper()
loadModule()

// 内存管理，跳转路由时清除
store.commit("addMemoryManageList", [scene, camera, helper, mmdLoader])

onMounted(() => {
    render = initRenderer(threeLoaderDom.value)
    initControls()
})

function loadModule() {
    mmdLoader.loadWithAnimation(
        pmx,
        vmd,
        (module) => {
            const mesh = module.mesh
            mesh.position.y = -15
            scene.add(mesh)
            loading.value = false
            animate()
        },
        () => {},
        (err) => {
            console.log(err)
        }
    )
}

function initScene() {
    const ambient = new THREE.AmbientLight(0x666666)
    const directionalLight = new THREE.DirectionalLight(0x887766)
    directionalLight.position.set(-1, 1, 1).normalize()
    scene.add(directionalLight)
    scene.background = new THREE.Color(0xffffff)
    scene.add(ambient)
}

function initCamera() {
    camera.position.set(0, 20, 50)
}

function initControls() {
    controls = new OrbitControls(camera, threeLoaderDom.value)
    controls.addEventListener("change", animate)
}

function initAxesHelper() {
    scene.add(helper)
}

function animate() {
    render.render(scene, camera)
}
</script>

<style scoped lang="scss">
.three-loader {
    width: 100%;
    height: 100vh;
}

.loading {
    min-height: 100vh;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.993);
    color: #fff;
    font-weight: 600;
    font-size: 30px;

    @extend .flex-center;
}

</style>
