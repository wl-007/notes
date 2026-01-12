<template>
    <SlotDemoSub>
      左
      <template #right>
        右
      </template>
    </SlotDemoSub>
</template>
  
<script setup lang='ts'>
  import SlotDemoSub from './SlotDemoSub.vue';
</script>
  
<style>
  
</style>