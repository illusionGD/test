<template>
    <div class="three" ref="threeDom"></div>
</template>

<script setup lang="ts">
import * as THREE from "three"
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"
import { Sky } from "three/examples/jsm/objects/Sky.js"
import { Water } from "three/examples/jsm/objects/Water.js"
import waterText from "@/assets/images/waternormals.jpg"
import { onBeforeRouteLeave } from "vue-router"
import { useStore } from "vuex"
const store = useStore()
const speed = 100
let prevTime = new Date().getTime()
let moveForward = false
let moveLeft = false
let moveBackward = false
let moveRight = false
let animationId: number

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    10000
)
camera.position.set(0, 30, 100)

const renderer = new THREE.WebGLRenderer()
// 向量
const vector = new THREE.Vector3(0, 0, 0)
// 控制器
const controls = new PointerLockControls(camera, document.body)
// 天空
const sky = new Sky()
// 水渲染器
const water = new Water(new THREE.PlaneGeometry(10000, 10000), {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(waterText, function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    }),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
})

initBaseConfig()
// 内存管理，跳转路由时清除
store.commit("addMemoryManageList", [
    scene,
    camera,
    renderer,
    vector,
    sky,
    water,
])

// 移除control监听
onBeforeRouteLeave(() => {
    controls.unlock()
    document.removeEventListener("keydown", onKeyDown)
    window.removeEventListener("keyup", onKeyUp)
    // 添加动画id，跳转路由时清除
    store.commit("setAnimationIdList", {
        type: "add",
        id: animationId,
    })
    document.body.removeEventListener("click", lockControls)
})

function initBaseConfig() {
    setTimeout(() => {
        initRenderer()
    })
    initScene()
    initControl()
    initSky()
    initWater()
}

function showPageNav(isShow: boolean = false) {
    isShow && controls.unlock()
    !isShow && controls.lock()
}

/**
 * @description: 初始化天空球
 */
function initSky() {
    sky.scale.setScalar(5000)
    scene.add(sky)
    const uniforms = sky.material.uniforms
    const sun = new THREE.Vector3(0, 20, -500)
    uniforms["sunPosition"].value.copy(sun)
}

/**
 * @description: 初始化水
 * @return {*}
 */
function initWater() {
    water.rotation.x = -Math.PI / 2
    scene.add(water)
}

/**
 * @description: 初始化控制器
 */
function initControl() {
    //  监听鼠标点击
    document.body.addEventListener("click", lockControls)
    controls.addEventListener("unlock", unLockControls)
    document.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
    scene.add(controls.getObject())
}

/**
 * @description: 初始化场景
 */
function initScene() {
    // 背景颜色
    scene.background = new THREE.Color(0xffffff)
    // 雾效
    scene.fog = new THREE.Fog(0xffffff, 0, 750)
}

/**
 * @description: 初始化渲染器
 */
function initRenderer() {
    const mainDom = document.querySelector(".three") as HTMLElement
    renderer.setSize(mainDom.clientWidth, mainDom.clientHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.5
    mainDom.appendChild(renderer.domElement)
    render(new Date().getTime())
}

function move(timeStamp: number) {
    if (!controls.isLocked) {
        return
    }
    const delta = (timeStamp - prevTime) / 1000
    const dirH = Number(moveForward) - Number(moveBackward)
    const dirV = Number(moveRight) - Number(moveLeft)
    if (moveForward || moveBackward) {
        vector.z = 0
        vector.z += dirH * speed * delta
        controls.moveForward(vector.z)
    }
    if (moveLeft || moveRight) {
        vector.x = 0
        vector.x += dirV * speed * delta
        controls.moveRight(vector.x)
    }
    prevTime = timeStamp
}

function onKeyDown(e: KeyboardEvent) {
    switch (e.code) {
        case "KeyW":
            moveForward = true
            break

        case "KeyA":
            moveLeft = true
            break

        case "KeyS":
            moveBackward = true
            break

        case "KeyD":
            moveRight = true
            break
    }
}
function onKeyUp(e: KeyboardEvent) {
    switch (e.code) {
        case "KeyW":
            moveForward = false
            break

        case "KeyA":
            moveLeft = false
            break

        case "KeyS":
            moveBackward = false
            break

        case "KeyD":
            moveRight = false
            break
    }
}

function lockControls() {
    showPageNav(false)
}
function unLockControls() {
    showPageNav(true)
}

/**
 * @description: 渲染
 * @param {*} timeStamp
 * @return {*}
 */
function render(timeStamp: number) {
    water.material.uniforms["time"].value += 1.0 / 60.0
    move(timeStamp)
    renderer.render(scene, camera)
    animationId = window.requestAnimationFrame(render)
}
</script>
<style lang="scss" scoped>
.three {
    overflow: hidden;
    width: 100%;
    height: 100vh;
}
</style>
