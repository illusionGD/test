<template>
    <div class="navigation">
        <ul class="nav-list">
            <li class="list-item" :class="{ 'list-item_active': index === activeIndex }"
                v-for="(item, index) in navList" :key="index" :data-type="item.title" @click="onClick(item, index)">{{
    item.title
                }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeIndex = ref(0)
const emits = defineEmits(['navClick'])
const navList = [
    {
        title: 'threeJs'
    }
]

function onClick(item: any, index: number) {
    activeIndex.value = index
    emits('navClick')
}
</script>

<style lang="scss" scoped>
.navigation {
    width: 200px;
    height: 100vh;
    background-color: $bg_color;
}

.list-item {
    padding: 20px 0;
    color: rgb(167, 167, 167);
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
}

.list-item_active {
    background-color: $bg_color_active;
    color: rgb(255, 255, 255);
}

</style>