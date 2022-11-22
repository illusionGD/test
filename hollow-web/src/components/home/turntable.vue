<template>
    <div class="turntable">
        <ul
            ref="turntableMain"
            :class="{ 'rotation-infinite': rotating }"
            :style="{
                width: pxToRemUnit(radius * 2),
                height: pxToRemUnit(radius * 2),
                'animation-duration': speed + 's',
            }"
        >
            <li
                ref="turntableItem"
                class="turntable-item"
                :class="{
                    'rotation-infinite-reverse': rotating,
                    'border-light': activeIndex === index,
                }"
                v-for="(item, index) in list"
                :key="index"
                :style="{
                    width: pxToRemUnit(itemRadius * 2),
                    height: pxToRemUnit(itemRadius * 2),
                    left: pxToRemUnit(item.x),
                    top: pxToRemUnit(item.y),
                    'animation-duration': speed + 's',
                }"
                @mouseenter="stopRotate(index)"
                @mouseout="startRotate"
                @click="gotoPage(item)"
            >
                {{ item.title }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from "@vue/runtime-core";
import { getDomRotateDeg, pxToRemUnit } from "@/utils";
import { useRouter } from "vue-router";
import { turntable_type } from "@/interfaces/home.interface";
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
        default: 60,
    },
});
const list = computed(getPosition);

let rotating = ref(true);
let activeIndex = ref(-1);
const turntableMain = ref<HTMLElement>();
const turntableItem = ref<HTMLElement>();
const router = useRouter();
/**
 * @description: 停止旋转
 * @return {*}
 */
function stopRotate(index: number): void {
    activeIndex.value = index;
    const dom = turntableMain.value as HTMLElement;
    // 获取整体旋转角度，并停止旋转
    const str = window.getComputedStyle(dom).transform;
    const rotateDeg = getDomRotateDeg(str);
    dom.style.transform = `rotate(${rotateDeg}deg)`;

    // 获取每个小圆的旋转角度，并停止旋转
    if (turntableItem.value instanceof Array) {
        turntableItem.value.forEach((item: HTMLElement) => {
            item.style.transform = `rotate(${-rotateDeg}deg)`;
        });
    }

    rotating.value = false;
}

/**
 * @description: 开始旋转
 * @return {*}
 */
function startRotate(): void {
    activeIndex.value = -1;
    rotating.value = true;
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
            y,
        };
        return temp;
    });

    return resList;
}

function gotoPage(item: turntable_type) {
    router.push(item.path);
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/animation.scss";

.turntable {
    ul {
        position: relative;
        transform-origin: center;
        // background-color: aliceblue;
    }

    &-item {
        position: absolute;
        display: flex;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.233);
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.137),
            inset 0 0 10px rgba(255, 255, 255, 0.89);
        // box-shadow: ;
        text-align: center;
        font-weight: 600;
        cursor: pointer;
        transform-origin: center;

        @extend .flex-center;
    }
}

.border-light {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.63),
        inset 0 0 10px rgba(255, 255, 255, 0.89);
    // @include anBorderLightDiffusion();
}

.rotation-infinite {
    animation: rotation infinite linear;
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