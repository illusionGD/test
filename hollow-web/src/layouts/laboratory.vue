<template>
    <div class="laboratory">
        <Navigation></Navigation>
        <div class="main"></div>
    </div>
</template>

<script setup lang="ts">
import Navigation from "@/components/laboratory/navigation.vue";
// import * as PIXI from "pixi.js";
// import { Live2DModel } from "pixi-live2d-display";

// (async function () {
//     const app = new PIXI.Application({
//         view: document.getElementById("canvas") as any,
//     });

//     const model = await Live2DModel.from("shizuku.model.json");

//     app.stage.addChild(model);

//     // transforms
//     model.x = 100;
//     model.y = 100;
//     model.rotation = Math.PI;
//     model.skew.x = Math.PI;
//     model.scale.set(2, 2);
//     model.anchor.set(0.5, 0.5);

//     // interaction
//     model.on("click", (hitAreas: any) => {
//         if (hitAreas.includes("body")) {
//             model.motion("tap_body");
//         }
//     });
// })();
</script>

<style lang="scss" scoped>
</style>