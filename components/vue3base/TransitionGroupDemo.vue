<template>
  <div>
    <button @click="addItem">Add Item</button>
    <transition-group name="list" tag="ul">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </transition-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref(['Item 1', 'Item 2', 'Item 3']);

const addItem = () => {
  items.value.push(`Item ${items.value.length + 1}`);

};
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;

}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);

}
</style>