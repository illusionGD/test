<template>
    <div class="home bg-cover">
        <Turntable
            :pathList="pathList"
            :itemRadius="80"
            :radius="300"
            :speed="60"
        ></Turntable>
        <div class="particle-wrap">
            <Particle :particleNum="50" :speed="0.5"></Particle>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getHomePaths } from "@/apis/common";
import Turntable from "@/components/home/turntable.vue";
import Particle from "../components/common/particle.vue";
import { turntableList_type } from "@/interfaces/home.interface";
import { reactive } from "@vue/reactivity";
import { customerInterVal } from "@/utils";
import { ref } from "vue";

let speed = ref(0.5);
const pathList: turntableList_type = reactive([]);
init();

async function init() {
    const { code, data } = await getHomePaths();
    if (code === "200" && data) {
        pathList.push(...data);
    }
}
</script>
<style lang="scss" scoped>
.home {
    overflow: hidden;
    width: 100%;
    height: 100vh;
    background-color: $bg_color;
    background-image: url("../assets/images/bg_nav.jpg");

    @extend .flex-center;
    .particle-wrap {
        overflow: hidden;
        top: 0;
        left: 0;
        position: absolute;
        width: inherit;
        height: inherit;
    }
}
</style>
