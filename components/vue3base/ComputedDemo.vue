<template>
  <h1>{{ result }}</h1>
  <button @click="count++">count is: {{ count }}</button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const count = ref(0);
// 直接使用 computed
const result = computed(() => {
  return count.value + 100;
});

</script>