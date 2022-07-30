
<template>
    <div class="turntable">
        <ul ref="turntableMain" :class="{'rotation-infinite': rotating}"
        @mouseenter="rotating = false"
        @mouseout="rotating = true"
        :style="{
                width: radius * 2 + 'px',
                height: radius * 2 + 'px'
            }">
            <li class="turntable-item" v-for="(item, index) in list" :key="index"
            :style="{
                width: itemRadius * 2 + 'px',
                height: itemRadius * 2 + 'px',
                left: item.x + 'px',
                top: item.y + 'px'
            }"></li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, reactive, ref } from "@vue/runtime-core";
import { useMouseEnter } from "../../hooks/mouse";
import { turntable_type } from "../../types/home";
const props = defineProps({
    pathList: {
        type: Array as unknown as PropType<[turntable_type]>,
        default: () => []
    },
    // 半径
    radius: {
        type: Number,
        default: 200
    },
    itemRadius: {
        type: Number,
        default: 30
    }
})
const list = computed(getPosition)
let rotating = ref(true)
/**
 * @description: true
 * @return {*}
 */
function getPosition() {
    const radius = props.radius
    const list = props.pathList
    // 每个小圆的半径
    const itemRadius = props.itemRadius
    // 平均旋转角度
    const step = (2 * Math.PI) / list.length

    // 三角函数计算xy坐标
    const resList = list.map((item: turntable_type, index) => {
        const x = Math.round(radius + radius * Math.cos(step * index)) - itemRadius
        const y = Math.round(radius + radius * Math.sin(step * index)) - itemRadius
        const temp = {
            ...item,
            x,
            y
        }
        return temp
    })
    
    return resList
}
</script>

<style lang="scss" scoped>
.turntable {
    ul {
        position: relative;
        transform-origin: center;
        // background-color: aliceblue;
    }
    &-item {
        position: absolute;
        border-radius: 50%;
        background-color: #000;
        transform-origin: center;
    }
}
.rotation-infinite {
    animation: rotation 60s infinite linear;
}
@keyframes rotation {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

</style>