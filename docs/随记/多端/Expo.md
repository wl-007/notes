# Expo

## 介绍

Expo 是一套基于 React Native 的开发框架和工具链，用来更快地构建 Android、iOS 和 Web 应用。

可以把它理解成：

- React Native 负责“跨端原生 UI”
- Expo 负责“把 React Native 的开发体验、调试、构建、发布整得更顺手”

如果你只是想快速开始一个多端 App，而不是一上来就处理一堆原生工程细节，Expo 往往是比纯 React Native CLI 更省事的起点。

## Expo 和 React Native 的关系

Expo 不是 React Native 的替代品，而是建立在 React Native 之上的一层增强。

它主要提供：

- 更顺手的项目初始化
- 更统一的开发服务器
- 一套常用原生能力 SDK
- Expo Go 调试方式
- Expo Router 文件路由
- EAS 构建与发布能力

官方文档的核心意思可以概括成一句：

> Expo 可以安装在绝大多数 React Native 项目里，并且推荐使用。

## 什么时候优先用 Expo

适合这些场景：

- 想快速起项目
- 团队以前端为主，不想一开始就深挖原生工程
- 需要同时支持 Android / iOS / Web
- 想先把产品跑起来，再逐步加复杂能力

## 什么时候 Expo Go 不够用

Expo Go 很方便，但它只内置一部分原生模块。

如果你要用一些 Expo Go 没预装的原生库，比如某些第三方原生 SDK，那么通常要改成：

- development build
- 或直接使用原生构建流程

## 环境准备

官方快速入门最基础的要求：

- Node.js LTS
- 一个代码编辑器，比如 VS Code
- 一台开发机
- 一个真机，安装 Expo Go

如果你想跑模拟器，还需要：

- Android Studio 模拟器
- Xcode 模拟器

## 创建项目

官方推荐使用 `create-expo-app`。

```bash
npx create-expo-app@latest my-app
```

如果你想明确指定模板，也可以这样：

```bash
npx create-expo-app@latest --template default@sdk-56
```

进入项目：

```bash
cd my-app
```

## 启动开发服务器

```bash
npx expo start
```

启动后，你会得到一个 Expo 开发面板，可以选择：

- 用 Expo Go 在真机扫码打开
- 在 Android 模拟器里运行
- 在 iOS 模拟器里运行
- 在 Web 中运行

## 最快的调试方式：Expo Go

Expo Go 是 Expo 提供的一个客户端 App。

开发体验通常是：

1. 本地执行 `npx expo start`
2. 手机安装 Expo Go
3. 同一局域网下扫码
4. 直接在手机上预览

这个方式非常适合：

- 看页面效果
- 跑基础交互
- 做 UI 原型
- 做轻中度业务验证

## 本地运行到原生模拟器

如果你已经有本地原生环境，可以直接运行：

```bash
npx expo run:android
npx expo run:ios
```

它会在需要时自动生成原生目录并编译安装应用。

这一步比 Expo Go 更接近真实原生构建环境。

## 安装依赖的正确方式

Expo 官方推荐优先用：

```bash
npx expo install 包名
```

例如：

```bash
npx expo install expo-camera
```

原因是 Expo 会帮你安装与当前 SDK 更兼容的版本，比直接 `npm install` 更稳。

## 常见项目结构

一个典型 Expo 项目里，你会经常看到这些东西：

- `app/`
- `assets/`
- `components/`
- `package.json`
- `app.json` 或 `app.config.ts`

### `app/`

如果项目使用 Expo Router，页面通常放在 `app/` 目录中。

### `assets/`

放图片、图标、字体等静态资源。

### `app.json`

放应用基础配置，比如：

- 应用名
- 包名
- 图标
- 启动图
- 平台配置

## Expo Router

Expo Router 是 Expo 推荐的文件路由方案。

它的思路和 Next.js 有点像：

- 目录就是路由
- 文件就是页面

例如：

- `app/index.tsx` 对应首页
- `app/profile.tsx` 对应 `/profile`

这个方案的好处是：

- 页面结构清晰
- 路由组织更直观
- 多端统一体验更好

## 一个最小页面示例

```tsx
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello Expo</Text>
    </View>
  );
}
```

如果是 Expo Router 项目，把它放在 `app/index.tsx` 里就能作为首页跑起来。

## 开发时你要优先掌握什么

### 1. 页面和组件

- `View`
- `Text`
- `Image`
- `ScrollView`
- `Pressable`

### 2. 样式

Expo 依然沿用 React Native 的样式系统，不是传统 CSS。

### 3. 调试

- Expo Go
- 开发服务器日志
- 真机预览
- 模拟器运行

### 4. 常用 Expo SDK

比如：

- `expo-camera`
- `expo-image-picker`
- `expo-location`
- `expo-file-system`

## Development Build 是什么

当 Expo Go 不够用时，你通常会接触到 development build。

它可以理解成：

- 你自己的“定制版 Expo 客户端”
- 可以把你项目依赖的原生模块一起打进去

官方文档里最核心的判断标准是：

如果某个带原生代码的库没有内置在 Expo Go 里，那你就需要 development build。

常见配套安装：

```bash
npx expo install expo-dev-client expo-updates
```

## 构建和发布

Expo 现在常配合 EAS 使用。

你可以把它理解成 Expo 提供的构建和分发服务。

入门阶段先记住两层：

### 1. 本地开发运行

- `npx expo start`
- `npx expo run:android`
- `npx expo run:ios`

### 2. 正式构建发布

- 使用 EAS Build 构建安装包
- 使用 EAS Update 做热更新式前端资源更新

如果只是快速入门，不需要一开始就把发布链路啃太深，先把开发流程跑通更重要。

## Expo 和 React Native CLI 怎么选

### 优先选 Expo

- 快速开始
- 更舒服的前端式开发体验
- 少碰原生工程
- 中小型项目先验证想法

### 优先选 React Native CLI

- 项目一开始就强依赖自定义原生能力
- 团队对 iOS / Android 原生工程已经很熟
- 需要更底层、更完全可控的原生接入方式

## 我建议的学习顺序

1. 用 `create-expo-app` 起一个项目
2. 用 Expo Go 在真机跑起来
3. 改 `app/index.tsx` 做几个页面
4. 加一个路由页面
5. 装一个 Expo SDK，比如相机或图片选择
6. 再理解 Expo Go 和 development build 的区别
7. 最后再看 EAS 构建发布

## 常用命令

```bash
# 创建项目
npx create-expo-app@latest my-app

# 启动开发服务器
npx expo start

# 安装兼容版本依赖
npx expo install expo-camera

# 运行到 Android
npx expo run:android

# 运行到 iOS
npx expo run:ios

# 安装 development build 常见依赖
npx expo install expo-dev-client expo-updates
```

## 参考资料

- Expo 官方文档：[https://docs.expo.dev/](https://docs.expo.dev/)
- Create a project：[https://docs.expo.dev/get-started/create-a-project/](https://docs.expo.dev/get-started/create-a-project/)
- Expo Router：[https://docs.expo.dev/router/introduction/](https://docs.expo.dev/router/introduction/)
- Development builds：[https://docs.expo.dev/develop/development-builds/introduction/](https://docs.expo.dev/develop/development-builds/introduction/)
- EAS：[https://docs.expo.dev/eas/](https://docs.expo.dev/eas/)

## 补充说明

这篇内容根据 Expo 官方文档整理，重点偏“快速上手”和“怎么选 Expo 的开发路径”，不是完整 API 手册。

如果后面你要，我可以继续在它下面再补两篇：

- `Expo Router 入门`
- `Expo + EAS 构建发布`
