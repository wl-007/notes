const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/defineAsyncComponentDemo.MWmvQH_C.js","assets/chunks/framework.B1jFR3yW.js","assets/chunks/watchEffect​Demo.DK8ENVfi.js"])))=>i.map(i=>d[i]);
import{D as d,v as E,V as o,p as C,C as v,c as f,o as b,ag as k,j as n,ah as g,G as i,ai as c,k as a,w as l,aj as y}from"./chunks/framework.B1jFR3yW.js";import{R as u,k as F}from"./chunks/index.BHAAAjca.js";const A=`<template>
      <AdminPage></AdminPage>
</template>
  
<script setup lang='ts'>
import { defineAsyncComponent } from 'vue';

  
  const AdminPage = defineAsyncComponent(() => import('./defineAsyncComponentDemoSub.vue'))
<\/script>
  
<style>
  
</style>`,m=`<template>
  <div @click="count++">{{count}}</div>
</template>

<script setup lang='ts'>
import { ref, watchEffect } from 'vue';

const count = ref(0);

watchEffect(() => {
  console.log(\`Count is: \${count.value}\`);
});
<\/script>

<style></style>`,_=JSON.parse('{"title":"进阶","description":"","frontmatter":{"prev":{"text":"Vue3基础","link":"/web/vue3/base"},"title":"进阶"},"headers":[],"relativePath":"随记/Vue3/002进阶.md","filePath":"随记/Vue3/002进阶.md"}'),D={name:"随记/Vue3/002进阶.md"},R=Object.assign(D,{setup(B){const h=d();E(async()=>{h.value=(await o(async()=>{const{default:e}=await import("./chunks/defineAsyncComponentDemo.MWmvQH_C.js");return{default:e}},__vite__mapDeps([0,1]))).default});const t=C(!0),p=d();return E(async()=>{p.value=(await o(async()=>{const{default:e}=await import("./chunks/watchEffect​Demo.DK8ENVfi.js");return{default:e}},__vite__mapDeps([2,1]))).default}),(e,s)=>{const r=v("ClientOnly");return b(),f("div",null,[s[4]||(s[4]=k("",11)),n("ul",null,[s[3]||(s[3]=n("li",null,[n("p",null,"含义：立即运行传入的副作用函数，并在其依赖的响应式状态发生变化时重新运行。​")],-1)),n("li",null,[s[2]||(s[2]=n("p",null,"使用场景：用于自动收集依赖并重新执行副作用。",-1)),g(i(a(u),null,null,512),[[c,t.value]]),i(r,null,{default:l(()=>[i(a(F),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",visible:!0,onMount:s[0]||(s[0]=()=>{t.value=!1}),vueCode:a(m)},y({_:2},[p.value?{name:"vue",fn:l(()=>[i(a(p))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1})])]),s[5]||(s[5]=k("",72)),g(i(a(u),null,null,512),[[c,t.value]]),i(r,null,{default:l(()=>[i(a(F),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%22defineAsyncComponentDemo.vue%22%3A%7B%22filename%22%3A%22components%2Fvue3advanced%2FdefineAsyncComponentDemo.vue%22%2C%22code%22%3A%22%3Ctemplate%3E%5Cn%20%20%20%20%20%20%3CAdminPage%3E%3C%2FAdminPage%3E%5Cn%3C%2Ftemplate%3E%5Cn%20%20%5Cn%3Cscript%20setup%20lang%3D'ts'%3E%5Cnimport%20%7B%20defineAsyncComponent%20%7D%20from%20'vue'%3B%5Cn%5Cn%20%20%5Cn%20%20const%20AdminPage%20%3D%20defineAsyncComponent(()%20%3D%3E%20import('.%2FdefineAsyncComponentDemoSub.vue'))%5Cn%3C%2Fscript%3E%5Cn%20%20%5Cn%3Cstyle%3E%5Cn%20%20%5Cn%3C%2Fstyle%3E%22%7D%2C%22defineAsyncComponentDemoSub.vue%22%3A%7B%22filename%22%3A%22components%2Fvue3advanced%2FdefineAsyncComponentDemoSub.vue%22%2C%22code%22%3A%22%3Ctemplate%3E%5Cn%20%20%20%20defineAsyncComponentDemoSub%5Cn%3C%2Ftemplate%3E%5Cn%20%20%5Cn%3Cscript%20setup%20lang%3D'ts'%3E%5Cn%20%20%5Cn%3C%2Fscript%3E%5Cn%20%20%5Cn%3Cstyle%3E%5Cn%20%20%5Cn%3C%2Fstyle%3E%22%7D%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",visible:!0,onMount:s[1]||(s[1]=()=>{t.value=!1}),vueCode:a(A)},y({_:2},[h.value?{name:"vue",fn:l(()=>[i(a(h))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1}),s[6]||(s[6]=k("",23))])}}});export{_ as __pageData,R as default};
