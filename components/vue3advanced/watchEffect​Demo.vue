<template>
  <div @click="count++">{{count}}</div>
</template>

<script setup lang='ts'>
import { ref, watchEffect } from 'vue';

const count = ref(0);

watchEffect(() => {
  console.log(`Count is: ${count.value}`);
});
</script>

<style></style>