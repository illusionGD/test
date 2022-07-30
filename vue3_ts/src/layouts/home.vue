<template>
    <div class="home">
        <Turntable 
        :pathList="pathList"
        :itemRadius="80"
        :radius="300"></Turntable>
    </div>
</template>

<script setup lang="ts">
import Turntable from '@/components/home/turntable.vue'
import { reactive, ref } from '@vue/reactivity'
import { turntable_type } from '../types/home';

const pathList: turntable_type[] = reactive([
    {
    path: '/',
    title: ''
    },
    {
        path: '/',
        title: ''
    },
    {
        path: '/',
        title: ''
    },
    {
        path: '/',
        title: ''
    },
    {
        path: '/',
        title: ''
    },
    {
        path: '/',
        title: ''
    },
    {
        path: '/',
        title: ''
    },
    {
        path: '/',
        title: ''
    }
])
</script>
<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100vh;
    background-color: #434756;

@extend .flex-center;
}

</style>
