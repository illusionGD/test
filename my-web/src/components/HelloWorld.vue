<template>
    <div>{{ count }}</div>
    <div>{{ name }}</div>
    <div>{{ age }}</div>
    <button @click="test"></button>
</template>

<script setup>
import { reactive, ref, toRef } from "vue";

defineProps({
    msg: String,
});

let count = ref(0);
let obj = reactive({
    name: "2343",
    age: 154654,
});
let name = obj.name;
let age = toRef(obj, "age");
function test() {
    obj.age = 123;
}
</script>


<style scoped>
a {
    color: #42b983;
}
</style>
