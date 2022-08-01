
<template>
    <div class="turntable">
        <ul
            ref="turntableMain"
            :class="{ 'rotation-infinite': rotating }"
            :style="{
                width: radius * 2 + 'px',
                height: radius * 2 + 'px',
                'animation-duration': speed + 's'
            }"
        >
            <li
                ref="turntableItem"
                class="turntable-item"
                :class="{ 'rotation-infinite-reverse': rotating }"
                v-for="(item, index) in list"
                :key="index"
                :style="{
                    width: itemRadius * 2 + 'px',
                    height: itemRadius * 2 + 'px',
                    left: item.x + 'px',
                    top: item.y + 'px',
                    'animation-duration': speed + 's'
                }"
                @mouseenter="stopRotate"
            @mouseout="startRotate"
            >
                {{ item.title }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import {
    computed,
    onMounted,
    PropType,
    reactive,
    ref,
} from "@vue/runtime-core";
import { turntable_type } from "@/types/home";
import { customerInterVal, getDomRotateDeg } from "@/utils";
const props = defineProps({
    pathList: {
        type: Array as unknown as PropType<turntable_type[]>,
        default: () => [],
    },
    // 半径
    radius: {
        type: Number,
        default: 200,
    },
    itemRadius: {
        type: Number,
        default: 30,
    },
    // 旋转速度
    speed: {
        type: Number,
        default: 60
    }
});
const list = computed(getPosition);
const itemStep = computeItemRotateDeg()

let rotating = ref(true);
let itemRotateDeg = ref(0)
const turntableMain = ref<HTMLElement>()
const turntableItem = ref<HTMLElement>()

function stopRotate() {
    const dom = turntableMain.value as HTMLElement
    // 获取整体旋转角度，并停止旋转
    const str = window.getComputedStyle(dom).transform
    const rotateDeg =  getDomRotateDeg(str)
    dom.style.transform = `rotate(${rotateDeg}deg)`

    // 获取每个小圆的旋转角度，并停止旋转
    if (turntableItem.value instanceof Array) {
        
        turntableItem.value.forEach((item: HTMLElement) => {
            item.style.transform = `rotate(${-rotateDeg}deg)`
        });
    }

    rotating.value = false
}

function startRotate() {
    rotating.value = true
}

/**
 * @description: 注入每个小圆的坐标
 * @return {*}
 */
function getPosition() {
    const radius = props.radius;
    const list = props.pathList;
    // 每个小圆的半径
    const itemRadius = props.itemRadius;
    // 平均旋转角度
    const step = (2 * Math.PI) / list.length;
    // 三角函数计算xy坐标
    const resList = list.map((item: turntable_type, index) => {
        const x =
            Math.round(radius + radius * Math.cos(step * index)) - itemRadius;
        const y =
            Math.round(radius + radius * Math.sin(step * index)) - itemRadius;
        const temp = {
            ...item,
            x,
            y
        };
        return temp;
    });

    return resList;
}

function computeItemRotateDeg() {
    const speed = props.speed
    const step = (2 * Math.PI) / speed

    return step
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
        cursor: pointer;
        position: absolute;
        display: flex;
        border-radius: 50%;
        background-color: #fff;
        text-align: center;
        transform-origin: center;
@extend .flex-center;
    }
}
.rotation-infinite {
    animation: rotation infinite  linear;
}
.rotation-infinite-reverse {
    animation: rotation-reverse infinite linear;
}
@keyframes rotation {
    to {
        transform: rotate(360deg);
    }
}
@keyframes rotation-reverse {
    to {
        transform: rotate(-360deg);
    }
}

</style>