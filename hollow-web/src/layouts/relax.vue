<template>
    <div class="relax">
        <div class="time">
            <div class="h-m">{{ timeObj.hour }} : {{ timeObj.minutes }}</div>
            <span class="m-d">{{ timeObj.month }} 月 {{ timeObj.day }} 日</span>
            <span class="week">周 {{ timeObj.week }}</span>
        </div>
        <div class="music">
            <Music></Music>
        </div>
        <div class="weather">
            <Weather></Weather>
        </div>
    </div>
</template>

<script setup lang="ts">
import { customerInterVal } from "@/utils";
import { reactive, ref } from "@vue/reactivity";
// import Music from "../components/relax/music.vue";
// import Weather from "../components/relax/weather.vue";

const timeObj = reactive({
    year: 1970,
    month: 1,
    day: 197,
    hour: 0,
    minutes: 0,
    second: 0,
    week: "",
});

const dayMap = ["日", "一", "二", "三", "四", "五", "六"];
const day31 = [1, 3, 5, 7, 8, , 10, 12];
const currentTime = new Date();
timeObj.year = currentTime.getFullYear();
timeObj.month = currentTime.getMonth() + 1;
timeObj.day = currentTime.getDate();
timeObj.hour = currentTime.getHours();
timeObj.minutes = currentTime.getMinutes();
timeObj.second = currentTime.getSeconds();
timeObj.week = dayMap[currentTime.getDay()];

customerInterVal(() => {
    timeObj.second += 1;

    if (timeObj.second === 60) {
        changeMinutes();
        timeObj.second = 0;
    }
}, 1000);

function isLeapYear() {
    return !(timeObj.year % 4 || timeObj.year % 400);
}

function changeMinutes(num: number = 1) {
    if (timeObj.minutes + num === 60) {
        timeObj.minutes = 0;
        changeHour();
    } else {
        timeObj.minutes += num;
    }
}

function changeHour(num: number = 1) {
    if (timeObj.hour + num === 24) {
        timeObj.hour = 0;
        changeDay();
    } else {
        timeObj.hour += num;
    }
}

function changeDay(num: number = 1) {
    const isBigDay = day31.includes(timeObj.month);
    let maxDay = isBigDay ? 31 : 30;

    if (timeObj.month === 2) {
        maxDay = isLeapYear() ? 29 : 28;
    }

    if (timeObj.day + num > maxDay) {
        timeObj.day = 1;
        changeMonth();
    } else {
        timeObj.day += num;
    }
    const currentTime = new Date();
    timeObj.week = dayMap[currentTime.getDay()];
}

function changeMonth(num: number = 1) {
    if (timeObj.month + num > 12) {
        timeObj.month = 1;
        changeYear();
    } else {
        timeObj.month += num;
    }
}

function changeYear(num: number = 1) {
    timeObj.year += num;
}
</script>

<style lang="scss" scoped>
.relax {
    position: relative;
    min-height: 100vh;
    width: 100%;
    background-image: url("../assets/images/bg_relax.jpg");
    color: #fff;

    @extend .bg-cover;
}
.time {
    position: absolute;
    top: 30%;
    left: 50px;
    .h-m {
        font-weight: 100;
        font-size: 80px;

        @extend .flex-center;
    }
    .week {
        margin-left: 30px;
    }
}
.music {
    position: absolute;
    left: 50px;

    @extend .p-left-center;
}
</style>