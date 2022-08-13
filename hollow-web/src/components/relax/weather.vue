<template>
    <div class="weather"></div>
</template>

<script setup lang="ts">
import { getWeatherInfo } from "@/apis/common";
getWeatherInfo().then(({ lives, infocode }: any) => {
    if (infocode === "10000") {
        const {
            province,
            city,
            reporttime,
            temperature,
            weather,
            winddirection,
            windpower,
        } = lives[0];
    }
});
</script>

<style lang="scss" scoped>
.weather {
    padding: 20px;
}

</style>