<template>
  <div>
    <div>{{ props.name }}</div>
    <div>{{ props.age }}</div>
    <button @click="increase">年龄++</button>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps<{
  name: string,
  age: number
}>()

const emit = defineEmits(['increase'])
function increase() {
  emit('increase')
}
</script>

<style></style>