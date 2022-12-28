<template>
    <div class="home bg-cover">
        <Turntable
            class="turntable"
            :itemRadius="80"
            :radius="300"
            :speed="0.1"
        ></Turntable>
        <div class="particle-wrap">
            <Particle :particleNum="50" :speed="0.5"></Particle>
        </div>
    </div>
</template>

<script setup lang="ts">
import Turntable from "@/components/home/turntable.vue";
import Particle from "@/components/common/particle.vue";

</script>
<style lang="scss" scoped>
.home {
    overflow: hidden;
    width: 100%;
    height: 100vh;
    background-color: $bg_color;
    background-image: url("../assets/images/bg_nav.jpg");

    @extend .flex-center;
    .turntable {
        z-index: 1;
    }
    .particle-wrap {
        overflow: hidden;
        top: 0;
        left: 0;
        position: absolute;
        width: inherit;
        height: inherit;
        z-index: 0;
    }
}
</style>
