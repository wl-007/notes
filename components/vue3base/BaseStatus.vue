<template>
    <!-- 使用 {{  }} 包裹变量-->
    <h1>{{ count }}</h1>
    <h1>{{ state.name }}</h1>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

// ref 定义组件内部数据
const count = ref(0);
// ref 定义的数据，在 script 范围内使用时，都必须 .value
console.log(count.value);
// reactive
const state = reactive({
    name: '张三'
})
console.log(state.name);

</script>