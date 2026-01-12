<template>
  //第一种语法
  <img v-bind:src="imgSrc" style="max-width:180px;max-height:50px" />
  //第二语法 省略 v-bind
  <img :src="imgSrc" style="max-width:180px;max-height:50px" />
  <div :class="className"></div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';


const imgSrc = ref('https://picsum.photos/200/300')
// class变量支持字符串、对象、数组形式; style变量支持字符串、对象


// const className = ref(['red', 'blue'])
// const className = reactive({
//   red: true,
//   blue: false
// })
const className = ref('red')
</script>

<style scoped>
.red{
  width: 20px;
  height: 2px;
  background-color: brown;
}

</style>