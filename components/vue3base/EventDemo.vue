<template>
	<div>
		<button @click="increase">按钮++</button>
    <div>{{ count }}</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);// 定义组件内部方法
const increase = () => {
	console.log('++');
  count.value ++;
}
</script>