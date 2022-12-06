<template>
    <div ref="particle" class="particle">
        <canvas ref="particleCanvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Particle_type } from "@/interfaces/common.interface";
import { onMounted, reactive, ref } from "vue";

const props = defineProps({
    particleNum: {
        type: Number,
        default: 100,
    },
    raduis: {
        type: Number,
        default: 3,
    },
    speed: {
        type: Number,
        default: 0.5,
    },
    stop: {
        type: Boolean,
        default: false,
    },
});

const particle = ref<HTMLElement>();

const particleCanvas = ref<HTMLCanvasElement>();
let ctx: CanvasRenderingContext2D | null;
const particleList: Particle_type[] = reactive([]);

onMounted(() => {
    init();
});

function init() {
    const list = initParticleList(props.particleNum);
    particleList.push(...list);

    initCanvas();
    startParticleRun();
}

function initCanvas() {
    if (particleCanvas && particleCanvas.value && particle.value) {
        particleCanvas.value.width = particle.value.clientWidth;
        particleCanvas.value.height = particle.value.clientHeight;
        ctx = particleCanvas.value.getContext("2d");
    }
}

/**
 * @description: 初始化粒子数组
 * @param {*} num
 * @return {*}
 */
function initParticleList(num: Number): Particle_type[] {
    const list = [];
    for (let i = 0; i < num; i++) {
        const v = i % 2 ? 1 : -1;
        const config: Particle_type = createParticle({
            vx: v * props.speed,
            vy: v * props.speed,
        });
        list.push(createParticle(config));
    }

    return list;
}

/**
 * @description: 创建粒子
 * @param {*} config
 * @return {*}
 */
function createParticle(config?: Object): Particle_type {
    const size = Math.round(Math.random() * props.raduis);
    const width = size > 0 ? size : 1;
    const height = width;
    const clientWidth = particle?.value?.clientWidth
        ? particle?.value.clientWidth
        : 0;
    const clientHeight = particle?.value?.clientHeight
        ? particle?.value.clientHeight
        : 0;
    const positionX = Math.round(Math.random() * clientWidth);
    const positionY = Math.round(Math.random() * clientHeight);
    const dotDefaultConfig: Particle_type = {
        w: width,
        h: height,
        x: positionX,
        y: positionY,
        vx: props.speed,
        vy: props.speed,
        color: createColor(),
    };
    return Object.assign(dotDefaultConfig, config);
}

/**
 * @description: 渲染画布
 * @return {*}
 */
function renderCanvas() {
    if (!ctx || !particleCanvas.value) {
        return;
    }
    // 清楚画布
    ctx.clearRect(
        0,
        0,
        particleCanvas.value.width,
        particleCanvas.value.height
    );
    drawParticle();
}

/**
 * @description: 画粒子
 * @return {*}
 */
function drawParticle() {
    if (!ctx || !particleCanvas.value) {
        return;
    }

    particleList.forEach((particle) => {
        if (!ctx) {
            return;
        }
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.arc(particle.x, particle.y, particle.w, 0, 2 * Math.PI);
        ctx.fill();
    });
}

/**
 * @description: 更改粒子的位置
 * @return {*}
 */
function moveParticle() {
    particleList.forEach((particle) => {
        if (!particleCanvas.value) {
            return;
        }
        if (particle.y < 0 || particle.y > particleCanvas.value.height) {
            particle.vy = -particle.vy;
        } else if (particle.x < 0 || particle.x > particleCanvas.value.width) {
            particle.vx = -particle.vx;
        }
        particle.x += particle.vx;
        particle.y += particle.vy;
    });
}

/**
 * @description: 创建颜色
 * @return {*}
 */
function createColor(): string {
    const r = Math.round(Math.random() * 255 - 1);
    const g = Math.round(Math.random() * 255 - 1);
    const b = Math.round(Math.random() * 255 - 1);
    const a = Math.random().toFixed(1);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * @description: 开始粒子运动
 * @return {*}
 */
function startParticleRun() {
    moveParticle();
    renderCanvas();
    if (props.stop) {
        return;
    }
    requestAnimationFrame(startParticleRun);
}
</script>

<style lang="scss" scoped>
.particle {
    width: 100%;
    height: 100%;
}
</style>