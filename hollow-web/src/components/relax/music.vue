<template>
    <div class="music-box">
        <div
            class="btn-music-play"
            :style="{ transform: `rotate(${angle}deg)` }"
        ></div>
        <div class="music-info">
            <audio
                ref="audioSource"
                class="audio-source"
                :src="audioUrl"
                @loadedmetadata="audioLoaded"
                @timeupdate="onProgress"
            ></audio>
            <div class="music-name">hhhh</div>
            <div class="music-options">
                <div class="btn-item btn-prev"></div>
                <div
                    class="btn-item btn-play"
                    :class="{ 'btn-start': playing, 'btn-stop': !playing }"
                    @click="playAudio"
                ></div>
                <div class="btn-item btn-next"></div>
            </div>
            <div class="music-progress">
                <div
                    class="current-progress"
                    :style="{ width: currentTProgress + '%' }"
                ></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import audioUrl from "@/assets/music/王艺陶 - 幻光.mp3";

const audioSource = ref<HTMLAudioElement>();

let angle = ref(0);
let playing = ref(false);
let duration = ref(0);
let currentTProgress = ref(0);

function audioLoaded() {
    initAudioTime();
}

function initAudioTime() {
    duration.value = audioSource.value!.duration;
}

function onProgress() {
    currentTProgress.value = Math.round(
        (audioSource.value!.currentTime / duration.value) * 100
    );
}

function playAudio() {
    if (playing.value) {
        audioSource.value!.pause();
    } else {
        audioSource.value!.play();
    }
    playing.value = !playing.value;
    rotate();
}

function rotate() {
    if (!playing.value) {
        return;
    }

    angle.value += 0.1;

    requestAnimationFrame(rotate);
}
</script>


<style lang="scss" scoped>
.music-box {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.13);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.103);
    color: #fff;

    .audio-source {
        // display: none;
    }

    .music-name {
        text-align: center;
    }

    .music-options {
        @extend .flex-row-center;
    }

    .btn-prev {
        background-image: url("../../assets/icons/btn_next.png");
        transform: rotate(180deg);

@extend .bg-contain;
    }

    .btn-item {
        width: 60px;
        height: 60px;
        cursor: pointer;
    }

    .btn-next {
        background-image: url("../../assets/icons/btn_next.png");

@extend .bg-contain;
    }

    .btn-play {
        margin: 0 10px;

@extend .bg-contain;
    }

    .btn-start {
        background-image: url("../../assets/icons/btn_play_start.png");
    }

    .btn-stop {
        background-image: url("../../assets/icons/btn_play_stop.png");
    }

    .btn-music-play {
        margin-right: 20px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background-image: url("../../assets/images/bg_nav.jpg");

// animation: rotate 60s infinite linear;

        @extend .bg-cover;
    }

    .music-progress {
        position: relative;
        overflow: hidden;
        margin-top: 15px;
        width: 100%;
        height: 5px;
        border-radius: 3px;
        background-color: rgba(255, 255, 255, 0.699);
    }
    .current-progress {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color: #fff;
    }
}

@keyframes rotate {
    to {
        transform: rotate(360deg);
    }
}

</style>