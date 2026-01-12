<template>
  v-if
  <!-- v-if 可以控制元素节点是否渲染或删除，为true时渲染，为false删除 -->
  <div v-if="curPage == 'GroupGoods'">GroupGoods</div>
  <div v-else-if="curPage == 'StyleSwitch'">StyleSwitch</div>
  <div v-else>123</div>
  <div style="height: 8px;"></div>
  v-show
  <!-- v-show 的值控制元素的显示与否，为true时显示，为false时不显示。节点一直存在 -->
  <div v-show="curPage == 'GroupGoods'">GroupGoods</div>
  <div v-show="curPage == 'StyleSwitch'">StyleSwitch</div>
  <div style="height: 8px;"></div>
  v-for
  <!-- v-for 可以循环一个变量。变量的类型可以是数组、字符串、数字、对象 -->
  <div v-for="(item, index) in listMsg" v-bind:key="item">
    {{ item }}-{{ index }}
  </div>
  <div style="height: 8px;"></div>
  v-model
  <!-- v-model 双向通信 -->
  <input v-model="username" />
  <div style="height: 8px;"></div>
  <span v-text="username + '--名字'"> </span>
  <span v-html="'<div>大吉</div>'"></span>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const curPage = ref('StyleSwitch')
const username = ref('W')
const listMsg = ref(['a', 'b', 'c'])
</script>