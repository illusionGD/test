<template>
    <div class="turntable">
        <ul
            ref="turntableMain"
            :style="{
                width: pxToRemUnit(radius * 2),
                height: pxToRemUnit(radius * 2),
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
    import {  onMounted, reactive, ref } from "@vue/runtime-core";
    import { pxToRemUnit } from "@/utils";
    import { useRouter } from "vue-router";
    import { turntable_type } from "@/types/home.dto";
    import { getHomePaths } from "@/apis/common";
    const props = defineProps({
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
            default: 0.05,
        },
    });
    /**小圆的坐标 */
    const list: turntable_type[] = reactive([]);
    /**选择控制 */
    let rotating = ref(true);
    /**鼠标选中小圆的下标 */
    let activeIndex = ref(-1);
    /**整体旋转dom */
    const turntableMain = ref<HTMLElement>();
    /**每个小圆dom */
    const turntableItem = ref<HTMLElement>();
    /**旋转角度 */
    let angle = ref(0)

    const router = useRouter();

    onMounted(() => {
        rotateAnimation()
    })

    init();


    async function init() {
        const { code, data } = await getHomePaths();
        if (code === "200" && data) {
            list.push(...getPosition(data));
        }
    }

    /**
     * @description: 停止旋转
     * @return {*}
     */
    function stopRotate(index: number): void {
        activeIndex.value = index;
        rotating.value = false;
    }

    /**
     * @description: 开始旋转
     * @return {*}
     */
    function startRotate(): void {
        activeIndex.value = -1;
        rotating.value = true;
        rotateAnimation()
    }

    /**
     * @description: 注入每个小圆的坐标
     * @return {*}
     */
    function getPosition(list: turntable_type[]) {
        const radius = props.radius;
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

    function rotateAnimation() {
        window.requestAnimationFrame((e) => {
            const dom = turntableMain.value as HTMLElement;
            const rotateDeg = angle.value += props.speed
            dom.style.transform = `rotate(${rotateDeg}deg)`;

            if (turntableItem.value instanceof Array) {
                turntableItem.value.forEach((item: HTMLElement) => {
                    item.style.transform = `rotate(${-rotateDeg}deg)`;
                });
            }
            if (!rotating.value) {
                return
            }
            
            rotateAnimation()
        })
    }
</script>

<style lang="scss" scoped>
@import "../../assets/css/animation.scss";

.turntable {
    ul {
        position: relative;
        transform-origin: center;
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

</style>