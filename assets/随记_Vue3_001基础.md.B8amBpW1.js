const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/TransitionGroupDemo.DbDUSTJg.js","assets/chunks/framework.B1jFR3yW.js","assets/chunks/TransitionDemo.BgtCjNna.js","assets/chunks/SlotDemo.DeFvWK5f.js","assets/chunks/PropsDemo.Bb5IMAJC.js","assets/chunks/WatchDemo.C6VGR4Tn.js","assets/chunks/InstructDemo.BLl2K7ZT.js","assets/chunks/attrDemo.BwwzWKgG.js","assets/chunks/EventDemo.CNicdWA4.js","assets/chunks/ComputedDemo.C00SMQ4k.js","assets/chunks/BaseStatus.DHT6VqGT.js","assets/chunks/HelloWorld.C_ARKTSe.js"])))=>i.map(i=>d[i]);
import{D as s,v as r,V as d,p as V,C as k,c as C,o as W,ag as X,ah as c,G as t,j as n,ai as v,k as l,w as i,aj as m,a as y}from"./chunks/framework.B1jFR3yW.js";import{R as b,k as p}from"./chunks/index.BHAAAjca.js";const N=`<template>
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
  items.value.push(\`Item \${items.value.length + 1}\`);

};
<\/script>

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
</style>`,S=`<template>
  <button @click="show = !show">Toggle</button>
  <Transition>
    <p v-if="show">hello</p>
  </Transition>
</template>

<script setup lang='ts'>
import { ref } from 'vue';


const show = ref(true)
<\/script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>`,E=`<template>
    <SlotDemoSub>
      左
      <template #right>
        右
      </template>
    </SlotDemoSub>
</template>
  
<script setup lang='ts'>
  import SlotDemoSub from './SlotDemoSub.vue';
<\/script>
  
<style>
  
</style>`,L=`<template>
  <PropsDemoSub name="just name" :age="age" @increase="increase"></PropsDemoSub>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import PropsDemoSub from './PropsDemoSub.vue';

const age = ref(18);
function increase() {
  age.value ++ ;
}
<\/script>

<style></style>`,G=`<template>
  <div>
    <button @click="count++">count is: {{ count }}</button>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';
const count = ref(0);


watch(
  () => count.value, (newValue, oldValue) => {
    console.log(newValue, oldValue);
  },
  {
    deep: true,   // 深度侦听
    immediate: true   // 立即侦听
  });
<\/script>

<style></style>`,x=`<template>
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
<\/script>`,I=`<template>
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
<\/script>

<style scoped>
.red{
  width: 20px;
  height: 2px;
  background-color: brown;
}

</style>`,z=`<template>
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
<\/script>`,P=`<template>
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

<\/script>`,q=`<template>
    <!-- 使用 {{  }} 包裹变量-->
    <h1>{{ count }}</h1>
    <h1>{{ state.name }}</h1>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

// ref 定义组件内部数据
const count = ref(0);
// ref 定义的数据，在 script 范围内使用时，都必须 .value
console.log(count.value);
// reactive
const state = reactive({
    name: '张三'
})
console.log(state.name);

<\/script>`,j=`<template>
	<!-- 可以理解为html代码区域 -->
	<div class="container">
		Hello World
	</div>
</template>

<script setup lang="ts">
// ts代码区域

<\/script>

<style scoped>
/* css代码区域 */
.container {
	font-family: 'PingFang SC', 'Microsoft YaHei', 'SimHei', 'SimSun',
		'sans-serif';
	font-size: 20px;
	line-height: 20px;
	color: brown;
}
</style>
`,H=JSON.parse('{"title":"基础","description":"","frontmatter":{"title":"基础","next":{"text":"Vue3进阶","link":"/web/vue3/advanced"}},"headers":[],"relativePath":"随记/Vue3/001基础.md","filePath":"随记/Vue3/001基础.md"}'),Y={name:"随记/Vue3/001基础.md"},J=Object.assign(Y,{setup(M){const f=s();r(async()=>{f.value=(await d(async()=>{const{default:u}=await import("./chunks/TransitionGroupDemo.DbDUSTJg.js");return{default:u}},__vite__mapDeps([0,1]))).default});const h=s();r(async()=>{h.value=(await d(async()=>{const{default:u}=await import("./chunks/TransitionDemo.BgtCjNna.js");return{default:u}},__vite__mapDeps([2,1]))).default});const w=s();r(async()=>{w.value=(await d(async()=>{const{default:u}=await import("./chunks/SlotDemo.DeFvWK5f.js");return{default:u}},__vite__mapDeps([3,1]))).default});const _=s();r(async()=>{_.value=(await d(async()=>{const{default:u}=await import("./chunks/PropsDemo.Bb5IMAJC.js");return{default:u}},__vite__mapDeps([4,1]))).default});const T=s();r(async()=>{T.value=(await d(async()=>{const{default:u}=await import("./chunks/WatchDemo.C6VGR4Tn.js");return{default:u}},__vite__mapDeps([5,1]))).default});const R=s();r(async()=>{R.value=(await d(async()=>{const{default:u}=await import("./chunks/InstructDemo.BLl2K7ZT.js");return{default:u}},__vite__mapDeps([6,1]))).default});const D=s();r(async()=>{D.value=(await d(async()=>{const{default:u}=await import("./chunks/attrDemo.BwwzWKgG.js");return{default:u}},__vite__mapDeps([7,1]))).default});const Z=s();r(async()=>{Z.value=(await d(async()=>{const{default:u}=await import("./chunks/EventDemo.CNicdWA4.js");return{default:u}},__vite__mapDeps([8,1]))).default});const g=s();r(async()=>{g.value=(await d(async()=>{const{default:u}=await import("./chunks/ComputedDemo.C00SMQ4k.js");return{default:u}},__vite__mapDeps([9,1]))).default});const B=s();r(async()=>{B.value=(await d(async()=>{const{default:u}=await import("./chunks/BaseStatus.DHT6VqGT.js");return{default:u}},__vite__mapDeps([10,1]))).default});const a=V(!0),A=s();return r(async()=>{A.value=(await d(async()=>{const{default:u}=await import("./chunks/HelloWorld.C_ARKTSe.js");return{default:u}},__vite__mapDeps([11,1]))).default}),(u,e)=>{const o=k("ClientOnly");return W(),C("div",null,[e[15]||(e[15]=X('<h1 id="vue3-基础" tabindex="-1">Vue3 基础 <a class="header-anchor" href="#vue3-基础" aria-label="Permalink to &quot;Vue3 基础&quot;">​</a></h1><p>主要记录 Composition 语法</p><p>最好的文档：<a href="https://cn.vuejs.org/guide/introduction.html" target="_blank" rel="noreferrer">官方文档</a></p><h2 id="创建项目" tabindex="-1">创建项目 <a class="header-anchor" href="#创建项目" aria-label="Permalink to &quot;创建项目&quot;">​</a></h2><p><a href="https://vitejs.cn/vite5-cn/guide/" target="_blank" rel="noreferrer">Vite</a></p><h2 id="基础结构" tabindex="-1">基础结构 <a class="header-anchor" href="#基础结构" aria-label="Permalink to &quot;基础结构&quot;">​</a></h2>',6)),c(t(l(b),null,null,512),[[v,a.value]]),t(o,null,{default:i(()=>[t(l(p),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",visible:!0,onMount:e[0]||(e[0]=()=>{a.value=!1}),vueCode:l(j)},m({_:2},[A.value?{name:"vue",fn:i(()=>[t(l(A))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1}),e[16]||(e[16]=n("h2",{id:"状态定义",tabindex:"-1"},[y("状态定义 "),n("a",{class:"header-anchor",href:"#状态定义","aria-label":'Permalink to "状态定义"'},"​")],-1)),e[17]||(e[17]=n("ul",null,[n("li",null,"ref")],-1)),e[18]||(e[18]=n("p",null,"可以用来定义任意类型的数据，但是在 script 范围内使用时，必须通过 .value；",-1)),n("ul",null,[n("li",null,[e[11]||(e[11]=n("p",null,"reactive",-1)),e[12]||(e[12]=n("p",null,"用来定义引用类型的数据，定义好的数据，在后续修改时不能修改引用地址",-1)),c(t(l(b),null,null,512),[[v,a.value]]),t(o,null,{default:i(()=>[t(l(p),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",visible:!0,onMount:e[1]||(e[1]=()=>{a.value=!1}),vueCode:l(q)},m({_:2},[B.value?{name:"vue",fn:i(()=>[t(l(B))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1})]),n("li",null,[e[13]||(e[13]=n("p",null,"computed",-1)),e[14]||(e[14]=n("p",null,"Vue 的计算属性会自动追踪响应式依赖，依赖没有变化便不会更新（缓存效果）",-1)),c(t(l(b),null,null,512),[[v,a.value]]),t(o,null,{default:i(()=>[t(l(p),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",visible:!0,onMount:e[2]||(e[2]=()=>{a.value=!1}),vueCode:l(P)},m({_:2},[g.value?{name:"vue",fn:i(()=>[t(l(g))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1})])]),e[19]||(e[19]=n("h2",{id:"事件绑定",tabindex:"-1"},[y("事件绑定 "),n("a",{class:"header-anchor",href:"#事件绑定","aria-label":'Permalink to "事件绑定"'},"​")],-1)),e[20]||(e[20]=n("p",null,'我们可以使用 v-on 指令 (简写为 @) 来监听 DOM 事件，并在事件触发时执行对应的 JavaScript。用法：v-on:click="handler" 或 @click="handler"。',-1)),c(t(l(b),null,null,512),[[v,a.value]]),t(o,null,{default:i(()=>[t(l(p),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",visible:!0,onMount:e[3]||(e[3]=()=>{a.value=!1}),vueCode:l(z)},m({_:2},[Z.value?{name:"vue",fn:i(()=>[t(l(Z))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1}),e[21]||(e[21]=n("h2",{id:"属性绑定",tabindex:"-1"},[y("属性绑定 "),n("a",{class:"header-anchor",href:"#属性绑定","aria-label":'Permalink to "属性绑定"'},"​")],-1)),e[22]||(e[22]=n("p",null,'通过 v-bind 或简写 ":"',-1)),c(t(l(b),null,null,512),[[v,a.value]]),t(o,null,{default:i(()=>[t(l(p),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",visible:!0,onMount:e[4]||(e[4]=()=>{a.value=!1}),vueCode:l(I)},m({_:2},[D.value?{name:"vue",fn:i(()=>[t(l(D))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1}),e[23]||(e[23]=n("h2",{id:"常用指令",tabindex:"-1"},[y("常用指令 "),n("a",{class:"header-anchor",href:"#常用指令","aria-label":'Permalink to "常用指令"'},"​")],-1)),c(t(l(b),null,null,512),[[v,a.value]]),t(o,null,{default:i(()=>[t(l(p),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",visible:!0,onMount:e[5]||(e[5]=()=>{a.value=!1}),vueCode:l(x)},m({_:2},[R.value?{name:"vue",fn:i(()=>[t(l(R))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1}),e[24]||(e[24]=n("h2",{id:"侦听器",tabindex:"-1"},[y("侦听器 "),n("a",{class:"header-anchor",href:"#侦听器","aria-label":'Permalink to "侦听器"'},"​")],-1)),e[25]||(e[25]=n("p",null,"监听对象属性的变化，当属性值发生改变时，会执行对应的回调函数。",-1)),c(t(l(b),null,null,512),[[v,a.value]]),t(o,null,{default:i(()=>[t(l(p),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",visible:!0,onMount:e[6]||(e[6]=()=>{a.value=!1}),vueCode:l(G)},m({_:2},[T.value?{name:"vue",fn:i(()=>[t(l(T))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1}),e[26]||(e[26]=X('<h2 id="生命周期" tabindex="-1">生命周期 <a class="header-anchor" href="#生命周期" aria-label="Permalink to &quot;生命周期&quot;">​</a></h2><p><a href="https://cn.vuejs.org/guide/essentials/lifecycle.html" target="_blank" rel="noreferrer">生命周期</a></p><h2 id="属性声明与事件定义" tabindex="-1">属性声明与事件定义 <a class="header-anchor" href="#属性声明与事件定义" aria-label="Permalink to &quot;属性声明与事件定义&quot;">​</a></h2><p>一个组件需要显式声明它所接受的 props，这样 Vue 才能知道外部传入的哪些是 props，哪些是透传 attribute</p>',4)),c(t(l(b),null,null,512),[[v,a.value]]),t(o,null,{default:i(()=>[t(l(p),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",visible:!0,onMount:e[7]||(e[7]=()=>{a.value=!1}),vueCode:l(L)},m({_:2},[_.value?{name:"vue",fn:i(()=>[t(l(_))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1}),e[27]||(e[27]=n("h2",{id:"插槽",tabindex:"-1"},[y("插槽 "),n("a",{class:"header-anchor",href:"#插槽","aria-label":'Permalink to "插槽"'},"​")],-1)),c(t(l(b),null,null,512),[[v,a.value]]),t(o,null,{default:i(()=>[t(l(p),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",visible:!0,onMount:e[8]||(e[8]=()=>{a.value=!1}),vueCode:l(E)},m({_:2},[w.value?{name:"vue",fn:i(()=>[t(l(w))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1}),e[28]||(e[28]=n("h2",{id:"内置组件",tabindex:"-1"},[y("内置组件 "),n("a",{class:"header-anchor",href:"#内置组件","aria-label":'Permalink to "内置组件"'},"​")],-1)),e[29]||(e[29]=n("p",null,[n("a",{href:"https://cn.vuejs.org/guide/built-ins/transition.html",target:"_blank",rel:"noreferrer"},"内置组件")],-1)),e[30]||(e[30]=n("p",null,"Vue 提供了两个内置组件，可以帮助你制作基于状态变化的过渡和动画：",-1)),e[31]||(e[31]=n("ul",null,[n("li",null,"Transition 会在一个元素或组件进入和离开 DOM 时应用动画。"),n("li",null,"TransitionGroup 会在一个 v-for 列表中的元素或组件被插入，移动，或移除时应用动画。")],-1)),c(t(l(b),null,null,512),[[v,a.value]]),t(o,null,{default:i(()=>[t(l(p),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",visible:!0,onMount:e[9]||(e[9]=()=>{a.value=!1}),vueCode:l(S)},m({_:2},[h.value?{name:"vue",fn:i(()=>[t(l(h))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1}),c(t(l(b),null,null,512),[[v,a.value]]),t(o,null,{default:i(()=>[t(l(p),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",visible:!0,onMount:e[10]||(e[10]=()=>{a.value=!1}),vueCode:l(N)},m({_:2},[f.value?{name:"vue",fn:i(()=>[t(l(f))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1})])}}});export{H as __pageData,J as default};
