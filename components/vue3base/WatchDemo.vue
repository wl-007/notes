<template>
  <div>
    <button @click="count++">count is: {{ count }}</button>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
const count = ref(0);


watch(
  () => count.value, (newValue, oldValue) => {
    console.log(newValue, oldValue);
  },
  {
    deep: true,   // 深度侦听
    immediate: true   // 立即侦听
  });
</script>

<style></style>