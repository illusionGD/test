<template>
    <div class="home">
        <Turntable :pathList="list" :itemRadius="80" :radius="300" :speed="60"></Turntable>
    </div>
</template>

<script setup lang="ts">
import { getHomePaths } from "@/apis/common";
import Turntable from "@/components/home/turntable.vue";
import { reactive } from "@vue/reactivity";
import { turntable_type } from "../types/home";

const pathList: turntable_type[] = await getHomePaths();
const list = reactive(pathList)
console.log(pathList);

</script>
<style lang="scss" scoped>
.home {
    overflow: hidden;
    width: 100%;
    height: 100vh;
    background-color: $bg_color;

    @extend .flex-center;
}
</style>
