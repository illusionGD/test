<template>
    <div
        class="three-raycast"
        ref="threeLoaderDom"
        @mousemove="updateMouse"
        @mousedown="castObject"
    ></div>
</template>

<script setup lang="ts">
import { bindWindowEvent } from "@/hooks/common"
import {
    getWindowRatio,
    initGridHelper,
    initRenderer,
    initStats,
} from "@/utils/threeUtil"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { TransformControls } from "three/examples/jsm/controls/TransformControls"
import { onMounted, ref } from "vue"
import { onBeforeRouteLeave } from "vue-router"
import { useStore } from "vuex"
const store = useStore()
let render: THREE.WebGLRenderer
let controls: OrbitControls
const mouse = new THREE.Vector2()
const num = 10
const threeLoaderDom = ref()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(55, getWindowRatio(), 1, 2000)
const helper = new THREE.AxesHelper(10)
const raycast = new THREE.Raycaster()
const color = new THREE.Color()
const white = new THREE.Color().setHex(0xffffff)
const geometry = new THREE.IcosahedronGeometry(0.5, 3) // 正十二面体
const material = new THREE.MeshPhongMaterial({ color: 0xffffff })
const meshes = new THREE.InstancedMesh(geometry, material, Math.pow(num, 3)) // 创建一组mesh
const stats = initStats()
const gridHelper = initGridHelper()
let transformControls: TransformControls
let transforming = false
let animationId: number
const lockTypeList = [helper] as any[]

bindWindowEvent("keyup", changeTransformControls)
initScene()
initCamera()
initAxesHelper()
initLight()
initMeshes()
initObject()
onMounted(() => {
    render = initRenderer(threeLoaderDom.value)
    threeLoaderDom.value.appendChild(stats.domElement)
    initControls()
    lockTypeList.push(gridHelper, transformControls)
    animate()
    // 内存管理，跳转路由时清除
    store.commit("addMemoryManageList", [
        scene,
        camera,
        helper,
        meshes,
        raycast,
        color,
        white,
        stats,
        transformControls,
    ])
})
onBeforeRouteLeave(() => {
    store.commit("setAnimationIdList", {
        type: "add",
        id: animationId,
    })
})

function initScene() {
    scene.background = new THREE.Color(0x000000)
}

function initMeshes() {
    let index = 0
    const matrix = new THREE.Matrix4() // 转化矩阵
    const offset = (num - 1) / 2 // 偏移值

    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            for (let k = 0; k < num; k++) {
                matrix.setPosition(offset - i, offset - j, offset - k) // 设置坐标位置
                meshes.setMatrixAt(index, matrix) // 把矩阵坐标赋给小球
                meshes.setColorAt(index, color)
                index++
            }
        }
    }

    scene.add(meshes)
}

function initObject() {
    const geometry = new THREE.BoxGeometry(10, 10, 5)
    const material = new THREE.MeshStandardMaterial({ color: "#3ef234" })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(20, 0, 0)
    scene.add(mesh)
}

function initLight() {
    const light = new THREE.HemisphereLight(0xffffff, 0x888888)
    light.position.set(0, 1, 0)
    scene.add(light)
}

function initCamera() {
    camera.position.set(0, 20, 50)
    camera.lookAt(0, 0, 0)
}

function updateMouse(e: MouseEvent) {
    const { clientX, clientY } = e

    // 把鼠标坐标限制在[-1,1]
    mouse.x = (clientX / window.innerWidth) * 2 - 1
    mouse.y = -(clientY / window.innerHeight) * 2 + 1

    castMeshes()
}

function castMeshes() {
    if (transforming) {
        return
    }
    raycast.setFromCamera(mouse, camera)
    const intersectObjects = raycast.intersectObject(meshes)
    if (intersectObjects.length > 0) {
        const instanceId = intersectObjects[0].instanceId as number
        meshes.getColorAt(instanceId, color)
        if (color.equals(white)) {
            meshes.setColorAt(
                instanceId,
                color.setHex(Math.random() * 0xffffff)
            )
            // @ts-ignore
            meshes.instanceColor.needsUpdate = true
        }
    }
}

function castObject() {
    raycast.setFromCamera(mouse, camera)
    const intersection = raycast.intersectObjects(scene.children, false)
    let firstObj
    // 循环查找第一个可选3D对象
    for (let i = 0; i < intersection.length; i++) {
        let isCan = true
        // 是否可选
        for (let j = 0; j < lockTypeList.length; j++) {
            if (intersection[i].object === lockTypeList[j]) {
                isCan = false
                break
            }
        }

        if (isCan) {
            firstObj = intersection[i].object
            break
        }
    }

    if (firstObj) {
        transformControls.attach(firstObj)
    }
}
function changeTransformControls(e: KeyboardEvent) {
    switch (e.code) {
        case "KeyE":
            transformControls.setMode("scale")
            break
        case "KeyR":
            transformControls.setMode("rotate")
            break
        case "KeyW":
            transformControls.setMode("translate")
            break
    }
}

function initControls() {
    // 场景控制器
    controls = new OrbitControls(camera, threeLoaderDom.value)

    // 变换控制器
    transformControls = new TransformControls(camera, threeLoaderDom.value)
    transformControls.addEventListener("mouseDown", () => {
        transforming = true
        controls.enabled = false
    })
    transformControls.addEventListener("mouseUp", () => {
        transforming = false
        controls.enabled = true
    })
    scene.add(transformControls)
}

function initAxesHelper() {
    scene.add(helper)
    scene.add(gridHelper)
}

function animate() {
    stats.update()
    render.render(scene, camera)
    animationId = window.requestAnimationFrame(animate)
}
</script>

<style scoped lang="scss">
.three-raycast {
    position: relative;
    width: 100%;
    height: 100vh;
}
</style>
