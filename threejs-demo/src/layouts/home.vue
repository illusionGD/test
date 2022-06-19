<template>
    <div class="three-wrap" ref="threeWrap"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Scene, PerspectiveCamera, WebGLRenderer, Vector3 } from "three";
import { createPolygon } from "../utils/polygon";
import { useMouseClickPosition } from "../hooks/mouse";

const threeWrap = ref(null);

const scene = new Scene();
const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const cube = createPolygon({
    type: "box",
    position: [1, 1, 1],
    material: { color: 0x00ff00 },
});

const points = [];
points.push(new Vector3(0, 0, 0));
points.push(new Vector3(1, 1, 0));
let line = createPolygon({
    type: "line",
    material: { color: 0x00ff00 },
    points,
});
useMouseClickPosition(window, (x, y) => {
    console.log(line);

    scene.add(line);
});
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
