<template>
      <AdminPage></AdminPage>
</template>
  
<script setup lang='ts'>
import { defineAsyncComponent } from 'vue';

  
  const AdminPage = defineAsyncComponent(() => import('./defineAsyncComponentDemoSub.vue'))
</script>
  
<style>
  
</style>