<template>
  <PropsDemoSub name="just name" :age="age" @increase="increase"></PropsDemoSub>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import PropsDemoSub from './PropsDemoSub.vue';

const age = ref(18);
function increase() {
  age.value ++ ;
}
</script>

<style></style>