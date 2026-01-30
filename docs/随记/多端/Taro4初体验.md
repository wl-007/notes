# Taro4

## 简介

现如今市面上端的形态多种多样，Web、React Native、微信小程序等各种端大行其道。当业务要求同时在不同的端都要求有所表现的时候，针对不同的端去编写多套代码的成本显然非常高，这时候只编写一套代码就能够适配到多端的能力就显得极为需要。

**Taro** 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发 [微信](https://mp.weixin.qq.com/) / [京东](https://mp.jd.com/?entrance=taro) / [百度](https://smartprogram.baidu.com/) / [支付宝](https://mini.open.alipay.com/) / [字节跳动](https://developer.open-douyin.com/) / [QQ](https://q.qq.com/) / [飞书](https://open.feishu.cn/document/uYjL24iN/ucDOzYjL3gzM24yN4MjN) / [快手](https://mp.kuaishou.com/) 小程序 / H5 / RN / [ASCF元服务](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-overview) 等应用。

## 多端特性

taro使用babel等工具，将开发者编写的代码编译为各个平台能理解的代码，比如微信小程序、支付宝小程序。

## 安装与使用

### 环境要求

使用 Taro4 时请确保开发环境符合以下要求：

- **Node.js** : 请确保已具备较新的 node 环境（>=16.20.0）
- npm/pnpm/yarn

### CLI 工具安装

打开终端工具使用以下命令安装：

```bash
# 使用 npm 安装 CLI
npm install -g @tarojs/cli
# 或者
npm install -g @tarojs/cli@4
```

检查是否安装成功：

```bash
taro --version
```

执行命令成功输出 Taro 版本信息说明 CLI 安装成功。



### 项目初始化

使用命令创建项目：

```bash
taro init taroApp
```

根据选项选择需要的模板。

> 注意：构建工具建议使用 `webpack`，`vite` 自测有许多坑，如 NutUI 微信小程序样式异常、twindcss 集成失败等问题。

参考选项：

```bash
Taro 即将创建一个新项目!
Need help? Go and open issue: https://tls.jd.com/taro-issue-helper

? 请输入项目介绍 taroApp
? 请选择框架 Vue3
? 是否需要使用 TypeScript ？ Yes
? 是否需要编译为 ES5 ？ No
? 请选择 CSS 预处理器（Sass/Less/Stylus） Sass
? 请选择包管理工具 pnpm
? 请选择编译工具 Webpack5
? 请选择模板源 Gitee（最快）
✔ 拉取远程模板仓库成功！
? 请选择模板 vue3-NutUI（NutUI + Vue3 模板（https://nutui.jd.com/））
```

安装依赖：

```bash
# 进入项目根目录
cd myApp

# 使用 npm 安装依赖
npm install
```

测试启动：

```bash
# h5
$ npm run dev:h5
$ npm run build:h5

# 微信小程序
npm run dev:weapp
npm run build:weapp

# 百度小程序
npm run dev:swan
npm run build:swan
```

小程序需要使用对应的工具运行构建好的产物，比如微信就要使用微信开发者工具。

补充：默认情况下只能调试或打包一个平台的代码，因为构建的产物都在 dist 目录下。我们可以利用 `process.env.TARO_ENV` 对 `outputRoot` 进行更改，`process.env.TARO_ENV` 是 Taro 的内置环境变量，表示编译的平台类型。

```js
// config/index.ts
const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: 'taroApp',
    ......
    outputRoot: `dist${process.env.TARO_ENV}`,
    ......
  }
```

修改后，各个平台的编译产物就不会冲突了，都会在 dist 目录下拥有各自的文件夹。

### 目录结构

```bash
├── dist                        编译结果目录
|
├── config                      项目编译配置目录
|   ├── index.js                默认配置
|   ├── dev.js                  开发环境配置
|   └── prod.js                 生产环境配置
|
├── src                         源码目录
|   ├── pages                   页面文件目录
|   |   └── index               index 页面目录
|   |       ├── index.js        index 页面逻辑
|   |       ├── index.css       index 页面样式
|   |       └── index.config.js index 页面配置
|   |
|   ├── app.js                  项目入口文件
|   ├── app.css                 项目总通用样式
|   └── app.config.js           项目入口配置
|
├── project.config.json         微信小程序项目配置 project.config.json
├── project.tt.json             抖音小程序项目配置 project.tt.json
├── project.swan.json           百度小程序项目配置 project.swan.json
├── project.qq.json             QQ 小程序项目配置 project.qq.json
├── ascf.config.json            ASCF元服务项目配置 ascf.config.json
|
├── babel.config.js             Babel 配置
├── tsconfig.json               TypeScript 配置
├── .eslintrc                   ESLint 配置
|
└── package.json
```

重要说明：

- **src/app.js**：项目入口，一般不用更改
- **src/pages**：页面文件，主要在这里开发
- **config**：Taro 配置文件



## 基础组件

### View 视图容器

可以粗略地理解为 `div`。

示例代码：

```vue
<template>
  <view class="index">
    <view class="c">
      <text>c component</text>
    </view>
  </view>
</template>
```

### Text 文本

大多数平台都不像 HTML 那样可以在任意位置写文本，使用 `Text` 可以保证编译到各个平台时文本内容不会出错。

> 微信小程序文档摘要：
>
> 文本。
>
> 1. 内联文本只能用 text 组件，不能用 view，如 <text> foo <text>bar</text> </text>



示例代码：

```vue
<template>
  <view class="index">
    <view :key="index" v-for="(item, index) in contents">
      <text>{{ item.text }} line {{ index + 1 }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
const contents = ref([
  {
    text: "text1",
  },
  {
    text: "text2",
  },
]);

</script>

```

### Image 图片

图片。支持 JPG、PNG、SVG、WEBP、GIF 等格式以及云文件ID。

```vue
<template>
  <view class="index">
    <image
      style="width: 300px;height: 100px;background: #fff;"
      src="https://picx.zhimg.com/v2-d6f44389971daab7e688e5b37046e4e4_720w.jpg?source=172ae18b"
    />
  </view>
</template>
```

### Input 输入框

用户文本输入，支持多种类型

示例代码：

```vue
<template>
  <view class="example-body">
    <text>可以自动聚焦的 input</text>
    <input type="text" placeholder="将会获取焦点" :focus="true" />
    <text>控制最大输入长度的 input</text>
    <input type="text" placeholder="最大输入长度为 10" maxLength="10"/>
    <text>数字输入的 input</text>
    <input type="number" placeholder="这是一个数字输入框"/>
    <text>密码输入的 input</text>
    <input type="password" :password="true" placeholder="这是一个密码输入框"/>
    <text>带小数点的 input</text>
    <input type="digit" placeholder="带小数点的数字键盘"/>
    <text>身份证输入的 input</text>
    <input type="idcard" placeholder="身份证输入键盘"/>
    <text>控制占位符颜色的 input</text>
    <input type="text" placeholder="占位符字体是红色的" placeholder-style="color:red;"/>
  </view>
</template>
```



## Taro API

### Taro.request

发起 HTTPS 网络请求

使用示例：

```vue
<template>
  <view class="container">
    
  </view>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import Taro from "@tarojs/taro";

const getJson = () => {
  Taro.request({
  url: 'https://cnodejs.org/api/v1/topics', 
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success: function (res) {
    console.log(res.data)
  }
})
};
onBeforeMount(()=>{
  getJson()
})
</script>

```

### 数据存储

Taro.setStorage  与 Taro.getStorage

设置和获取本地缓存

示例示例

```ts
Taro.setStorage({
  key:"key",
  data:"value"
})

Taro.getStorage({
  key: 'key',
  success: function (res) {
    console.log(res.data)
  }
})
```

## 多端方案

### 内置环境变量

process.env.TARO_ENV  用于判断当前的编译平台类型。 取值：`weapp` / `swan` / `alipay` / `tt` / `qq` / `jd` / `h5` / `rn`/ `ascf`

使用示例

```js
<template>
  <view class="container">
     {{ env }}
  </view>
</template>

<script setup>
const env = process.env.TARO_ENV;
</script>

```

不能直接在 template 使用 process.env.TARO_ENV

### 条件编译

指定平台保留样式：

```vue
/*  #ifdef  %PLATFORM%  */
模板代码
/*  #endif  */
```



指定平台剔除样式：

```vue
/*  #ifndef  %PLATFORM%  */
模板代码
/*  #endif  */
```



其中 `PLATFORM` 的取值与 `process.env.TARO_ENV` 保持一致

### 多端组件

假如有一个 `Test` 组件存在微信小程序、百度小程序和 H5 三个不同版本，那么就可以像如下组织代码：

```text
├── test.vue                Test 组件默认的形式，编译到微信小程序、百度小程序和 H5 之外的端使用的版本
├── test.weapp.vue         Test 组件的微信小程序版本
├── test.swan.vue           Test 组件的百度小程序版本
└── test.h5.vue             Test 组件的 H5 版本
```



四个文件，对外暴露的是统一的接口，它们接受一致的参数，只是内部有针对各自平台的代码实现。

而使用 `Test` 组件的时候，引用的方式依然和之前保持一致。`import` 的是**不带端类型的文件名**，在编译的时候会自动识别并添加端类型后缀：

```jsx
import Test from '../../components/test';
```

### 多端脚本逻辑

与多端组件类似，假如有需要针对不同的端写不同的脚本逻辑代码，我们也可以类似的进行处理，遵守的唯一原则就是**多端文件对外的接口保持一致**。

例如微信小程序上使用 `Taro.setNavigationBarTitle` 来设置页面标题，H5 则是使用 `document.title`。那么我们可以封装一个 `setTitle` 方法来抹平两个平台的差异。

1. 编写 `set_title.weapp.js`：

set_title.weapp.js

```js
import Taro from '@tarojs/taro'
export default function setTitle(title) {
  Taro.setNavigationBarTitle({
    title,
  })
}
```

1. 编写 `set_title.h5.js`：

set_title.h5.js

```js
export default function setTitle(title) {
  document.title = title
}
```

1. 调用：

```js
import setTitle from '../utils/set_title'

setTitle('页面标题')
```



## 个人体验

在使用 Taro4 进行小程序开发的过程中，与 uniapp 相比，有以下几点体验和思考：

### 框架选择

- **Taro**：支持 React/Vue 等多种框架，开发者可以根据团队技术栈选择合适的框架，灵活性更高
- **uniapp**：主要基于 Vue 生态，框架选择相对单一

### 开发体验

- **Taro**：
  - 编译时转换，代码更接近原生框架写法
  - 支持条件编译和多端文件，针对不同平台的适配更灵活
  - TypeScript 支持完善，类型提示友好
  - 热更新速度快，开发效率高
  
- **uniapp**：
  - 提供了 HBuilderX 可视化开发工具
  - 内置了丰富的 UI 组件库和插件市场
  - 配置相对简单，上手门槛较低

### 性能表现

- **Taro**：编译后的代码更接近原生，性能表现相对更好，特别是在复杂交互场景下
- **uniapp**：运行时框架，在某些场景下可能会有性能损耗，但官方优化做得不错

### 生态支持

- **Taro**：
  - 京东开源，企业级应用案例丰富
  - 社区活跃，第三方组件库如 NutUI、Taro-UI 等质量较高
  
- **uniapp**：
  - DCloud 官方维护，插件市场生态非常完善
  - 插件数量多，覆盖面广
  - 官方提供云服务支持

### 学习成本

- **Taro**：需要了解 React/Vue 原生框架知识，对前端基础要求较高
- **uniapp**：基于 Vue 语法，但提供了很多封装好的 API，学习曲线相对平缓

### 适用场景

- **Taro**：适合需要多端适配、对性能要求较高、团队有 React/Vue 基础的项目
- **uniapp**：适合快速开发、对性能要求不是极致的项目

### 总结

Taro4 在框架灵活性具有些许优势，适合复杂业务场景。而 uniapp 在开发效率、生态完善度上更胜一筹，适合快速开发和中小型项目。选择哪个框架，需要根据项目需求、团队技术栈和开发周期来综合考量。



## 附录

[taro官网](https://docs.taro.zone/docs/)

[NutUI](https://nutui.jd.com/#/)