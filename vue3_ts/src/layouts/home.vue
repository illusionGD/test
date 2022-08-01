<template>
    <div class="home">
        <Turntable
            :pathList="pathList"
            :itemRadius="80"
            :radius="300"
            :speed="60"
        ></Turntable>
    </div>
</template>

<script setup lang="ts">
import Turntable from "@/components/home/turntable.vue";
import { reactive, ref } from "@vue/reactivity";
import { defineComponent } from "@vue/runtime-core";
import { turntable_type } from "../types/home";

const pathList: turntable_type[] = reactive([
    {
        path: "/",
        title: "1",
    },
    {
        path: "/",
        title: "2",
    },
    {
        path: "/",
        title: "3",
    },
    {
        path: "/",
        title: "4",
    },
    {
        path: "/",
        title: "5",
    },
    {
        path: "/",
        title: "6",
    },
    {
        path: "/",
        title: "7",
    },
    {
        path: "/",
        title: "8",
    },
]);
</script>
<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: $bg_color;

@extend .flex-center;
}

</style>
