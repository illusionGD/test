<template>
    <div class="laboratory">
        <Navigation @navClick="change"></Navigation>
        <div class="main">
            <router-view v-if="!showTestList"></router-view>
            <ul class="content-grid" v-if="showTestList">
                <li class="grid-item" v-for="(item, index) in testList" @click="gotoTestDetail(index)">
                    <div class="grid-item__content">
                        <div class="grid-item__img" :style="{ backgroundImage: `url(${item.img})` }"></div>
                        <div class="grid-item__title">{{ item.title }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import Navigation from "@/components/laboratory/navigation.vue";
import { onBeforeMount, ref } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import imgUrl from '../assets/images/yayi.jpg'
import imgUrl1 from '../assets/images/three_raycast.jpg'

const showTestList = ref(true)
const testList = [
    {
        title: '加载模型',
        img: imgUrl,
        router: '/three-loader'
    },
    {
        title: '交互',
        img: imgUrl1,
        router: '/three-raycast'
    }
]
const router = useRouter();

onBeforeMount(() => {
    changeMainContent(router.currentRoute.value.path)
})
onBeforeRouteUpdate((to, from) => {
    changeMainContent(to.path)
})

function change() {
}

function changeMainContent(path: string) {
    showTestList.value = (path.split('/').filter(item => item).length <= 1)
}

function gotoTestDetail(index: number) {
    router.push(`${router.currentRoute.value.path}${testList[index].router}`)
}
</script>

<style lang="scss" scoped>
.laboratory {
    display: flex;
}

.main {
    width: 100%;
    background-color: rgb(244, 244, 244);
}

.content-grid {
    display: grid;
    padding-top: 20px;

    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

    .grid-item {
        display: flex;
        align-items: center;
        flex-direction: column;
        cursor: pointer;

        &:hover {
            transform: scale(1.05);
        }
    }

    .grid-item__content {
        width: 300px;
        height: 300px;
        background-color: #fff;
        box-shadow: 0 0 5px rgba(45, 45, 45, 0.274);
    }

    .grid-item__img {
        width: 300px;
        height: 250px;

        @extend .bg-cover;
    }

    .grid-item__title {
        text-align: center;
        font-size: 25px;
        line-height: 50px;
    }
}
</style>