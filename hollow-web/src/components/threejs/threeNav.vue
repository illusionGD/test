<template>
    <div class="three-nav" :class="{ 'move-out': hidden, 'mover-in': !hidden }">
        <div class="btn-home" @click="goHome">
            <el-icon class="home-icon" color="#fff">
                <HomeFilled />
            </el-icon>
            <span>首页</span>
        </div>
        <div class="btn-index" @click="clickIndex">
            <el-icon class="home-icon"><HelpFilled /></el-icon>
            <span>开始</span>
        </div>
        <el-menu
            :default-active="activeIndex"
            class="menu-list"
            background-color="rgba(0, 0, 0, 0)"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <el-sub-menu :index="index" v-for="(item, index) in menuList">
                <template #title>
                    <span>{{ item.title }}</span>
                </template>
                <el-menu-item
                    :index="getMenuIndex(index, idx)"
                    v-for="(child, idx) in item.children"
                    @click="handleSelect(child)"
                    >{{ child.title }}</el-menu-item
                >
            </el-sub-menu>
        </el-menu>
        <div class="btn-hidden" @click="hiddenNav">
            <el-icon v-if="hidden"><DArrowRight /></el-icon>
            <el-icon v-else><DArrowLeft /></el-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import threeMenuConfig from "@/config/threeMenuConfig.json"
interface Menu_Type {
    title: string
    path?: string
    children?: Menu_Type[]
}

let activeIndex = ref("0")
const hidden = ref(false)

const router = useRouter()
const menuList = ref<Menu_Type[]>(threeMenuConfig)

initMenuActive()
/**
 * @description: 初始化高亮项
 * @return {*}
 */
function initMenuActive() {
    const currentRouter = router.currentRoute.value.path
    let i: number | undefined
    let j: number | undefined

    menuList.value.forEach((item, index) => {
        if (item.children) {
            item.children.forEach((child, idx) => {
                if (child.path && currentRouter.includes(child.path)) {
                    i = index
                    j = idx
                }
            })
        } else {
            item.path && currentRouter.includes(item.path) && (i = index)
        }
    })
    if (i != undefined && j != undefined) {
        activeIndex.value = i + 1 + "-" + (j + 1)
    }
}

function hiddenNav() {
    hidden.value = !hidden.value
}

/**
 * @description: 计算menu的index
 * @param {*} i
 * @param {*} j
 * @return {*}
 */
function getMenuIndex(i: number, j: number) {
    return i + 1 + "-" + (j + 1)
}

function clickIndex() {
    activeIndex.value = ""
    router.push("/threejs")
}

/**
 * @description: 返回首页
 * @return {*}
 */
function goHome() {
    router.push("/")
}

function handleSelect(item: Menu_Type) {
    const path = item.path as string
    router.push("/threejs" + path)
}
</script>

<style lang="scss" scoped>
.three-nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 300px;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.384);
    color: #fff;
    transition: all 0.5s;

    user-select: none;
}
.menu-list {
    overflow-y: auto;
    max-height: calc(100vh - 100px);
    border: none;
    &::-webkit-scrollbar {
        width: 5px;
        border-radius: 1px;
        background-color: rgba(0, 0, 0, 0.322);
    }
    &::-webkit-scrollbar-thumb {
        background-color: #fff;
    }
}
.btn-home, .btn-index {
    display: flex;
    align-items: center;
    margin: 15px 10px;
    font-size: 20px;
    cursor: pointer;
    .home-icon {
        margin-right: 10px;
    }
}
.btn-hidden {
    position: absolute;
    top: 50%;
    right: 0;
    width: 25px;
    height: 60px;
    border-radius: 0 2px 2px 0;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 18px;
    cursor: pointer;
    transform: translate(98%, -50%);

@extend .flex-center;
}
.move-out {
    transform: translateX(-100%);
}
.mover-in {
    transform: translateX(0);
}

</style>
