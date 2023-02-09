<template>
    <div class="three-perspectiveCamera" ref="mainDom"></div>
    <div class="tips">
        按
        <span>O</span>/
        <span>P</span>
        键切换摄像机
    </div>
</template>

<script setup lang="ts">
import * as THREE from "three"
import { initRenderer, initStats } from "@/utils/threeUtil"
import { onMounted, ref } from "vue"
import Stats from "three/examples/jsm/libs/stats.module"
import { bindWindowEvent } from "@/hooks/common"
import * as dat from "dat.gui"
import { parseInt } from "lodash"
import { onBeforeRouteLeave } from "vue-router"
import { useStore } from "vuex"
const scene = new THREE.Scene()
const mainDom = ref()
const gui = new dat.GUI()
const folder = gui.addFolder("正交摄像机配置")
const store = useStore()
let animationId: number
let guiConfig = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
}
let domWidth: number
let domHeight: number
let aspect: number
let renderer: THREE.WebGLRenderer
// 当前视图相机
let activeCamera: THREE.Camera
// 当前相机辅助器
let activeHelper: THREE.CameraHelper
// 主相机
let mainCamera: THREE.PerspectiveCamera
// 透视相机
let perSpectiveCamera: THREE.PerspectiveCamera
// 正交相机
let cameraOrtho: THREE.OrthographicCamera
// 相机辅助器
let cameraPerspectiveHelper: THREE.CameraHelper
let cameraOrthoHelper: THREE.CameraHelper
// 相机组
const cameraGroup = new THREE.Group()
// 面
let mesh1: THREE.Mesh
let mesh2: THREE.Mesh
let mesh3: THREE.Mesh
let stats: Stats
bindWindowEvent("keydown", onKey)
onMounted(() => {
    // dom节点宽高比
    domWidth = parseInt(window.getComputedStyle(mainDom.value).width)
    domHeight = parseInt(window.getComputedStyle(mainDom.value).height)
    aspect = domWidth / domHeight

    initCamera()
    initCameraHelper()
    initMeshes()
    initBackground()
    stats = initStats(mainDom.value)
    renderer = initRenderer(mainDom.value)
    renderer.autoClear = false
    animation()
})
onBeforeRouteLeave(() => {
    store.commit("setAnimationIdList", {
        type: "add",
        id: animationId,
    })
    gui.destroy()
})

function initCamera() {
    mainCamera = new THREE.PerspectiveCamera(50, 0.5 * aspect, 1, 10000)
    mainCamera.position.z = 2000
    mainCamera.position.y = 20
    mainCamera.position.x = 20
    perSpectiveCamera = new THREE.PerspectiveCamera(50, 0.5 * aspect, 150, 1000)
    // 正交相机
    const frustumSize = 600
    guiConfig.left = (0.5 * frustumSize * aspect) / -2
    guiConfig.right = (0.5 * frustumSize * aspect) / 2
    guiConfig.top = frustumSize / 2
    guiConfig.bottom = frustumSize / -2
    cameraOrtho = new THREE.OrthographicCamera(
        guiConfig.left,
        guiConfig.right,
        guiConfig.top,
        guiConfig.bottom,
        150,
        1000
    )
    initGUI()
    //
    cameraOrtho.rotation.y = Math.PI
    perSpectiveCamera.rotation.y = Math.PI
    // 相机统一打组，一起放到场景中
    cameraGroup.add(cameraOrtho)
    cameraGroup.add(perSpectiveCamera)
    scene.add(cameraGroup)
}

function initGUI() {
    const c1 = folder.add(guiConfig, "left", -1000, 1000)
    const c2 = folder.add(guiConfig, "right", 0, 1000)
    const c3 = folder.add(guiConfig, "top", 0, 1000)
    const c4 = folder.add(guiConfig, "bottom", -1000, 1000)
    folder.open()
    c1.onChange((e) => {
        cameraOrtho.left = e
    })
    c2.onChange((e) => {
        cameraOrtho.right = e
    })
    c3.onChange((e) => {
        cameraOrtho.top = e
    })
    c4.onChange((e) => {
        cameraOrtho.bottom = e
    })
}

function initCameraHelper() {
    // 给第二个透视相机加辅助器
    cameraPerspectiveHelper = new THREE.CameraHelper(perSpectiveCamera)

    // 正交相机辅助器
    cameraOrthoHelper = new THREE.CameraHelper(cameraOrtho)
    cameraOrthoHelper.visible = false
    activeCamera = perSpectiveCamera
    activeHelper = cameraPerspectiveHelper
    scene.add(cameraPerspectiveHelper)
    scene.add(cameraOrthoHelper)
}

function initMeshes() {
    // 球体1
    mesh1 = new THREE.Mesh(
        new THREE.SphereGeometry(100, 16, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
    )
    mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(50, 16, 8),
        new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    )

    mesh2.position.y = 200
    mesh1.add(mesh2)

    mesh3 = new THREE.Mesh(
        new THREE.SphereGeometry(20, 16, 8),
        new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true })
    )
    // mesh3.position.y = 150
    mesh1.add(mesh3)
    // cameraGroup.add(mesh3)
    scene.add(mesh1)
    // scene.add(mesh2)
    // scene.add(mesh3)
}

function initBackground() {
    //
    const geometry = new THREE.BufferGeometry()
    const vertices = []

    for (let i = 0; i < 10000; i++) {
        vertices.push(THREE.MathUtils.randFloatSpread(2000)) // x
        vertices.push(THREE.MathUtils.randFloatSpread(2000)) // y
        vertices.push(THREE.MathUtils.randFloatSpread(2000)) // z
    }
    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
    )
    const particles = new THREE.Points(
        geometry,
        new THREE.PointsMaterial({ color: 0x888888 })
    )
    scene.add(particles)
}

function onKey(e: KeyboardEvent) {
    switch (e.code) {
        case "KeyO":
            activeCamera = cameraOrtho
            activeHelper = cameraOrthoHelper
            break
        case "KeyP":
            activeCamera = perSpectiveCamera
            activeHelper = cameraPerspectiveHelper
            break
    }
}

function animation() {
    animationId = window.requestAnimationFrame(animation)
    stats.update()

    // 面旋转
    const r = Date.now() * 0.0005

    mesh1.position.x = 700 * Math.cos(r)
    mesh1.position.z = 700 * Math.sin(r)
    mesh1.position.y = 700 * Math.sin(r)
    // 外球移动
    mesh1.children[0].position.x = 70 * Math.cos(2 * r)
    mesh1.children[0].position.z = 70 * Math.sin(r)
    // 判断当前切换的是什么相机
    if (activeCamera instanceof THREE.PerspectiveCamera) {
        // perSpectiveCamera.fov = 35 + 30 * Math.sin(0.5 * r)
        // perSpectiveCamera.far = mesh1.position.length()
        perSpectiveCamera.updateProjectionMatrix()
        cameraPerspectiveHelper.update()
        cameraPerspectiveHelper.visible = true
        cameraOrthoHelper.visible = false
    } else {
        cameraOrtho.updateProjectionMatrix()
        cameraOrthoHelper.update()
        cameraPerspectiveHelper.visible = false
        cameraOrthoHelper.visible = true
    }

    cameraGroup.lookAt(mesh1.position)

    renderer.clear()

    // 渲染左侧视窗
    activeHelper.visible = false // 先隐藏辅助器
    renderer.setViewport(0, 0, domWidth / 2, domHeight) // 设置左侧视窗大小
    renderer.render(scene, activeCamera)

    // 渲染右侧视窗
    activeHelper.visible = true // 显示辅助器
    renderer.setViewport(domWidth / 2, 0, domWidth / 2, domHeight) // 设置左侧视窗大小
    renderer.render(scene, mainCamera)
}
</script>

<style lang="scss" scoped>
.three-perspectiveCamera {
    width: 100%;
    height: 100vh;
}
.tips {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
}
</style>
