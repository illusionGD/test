<template>
    <div class="user">

    </div>
</template>

<script setup lang="ts">
import { pxToRemUnit } from '@/utils/index.js';

console.log(pxToRemUnit(600));
</script>

<style lang="scss" scoped>
.user {
    width: 600px;
    height: 500px;
    background-color: aqua;
}
</style>