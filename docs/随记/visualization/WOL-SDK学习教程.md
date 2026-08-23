---
title: WOL SDK 学习教程
order: 8
group:
  title: visualization
---

# WOL SDK 学习教程

## 教程目标

以 `HG2DMap` 为目标项目，逐步在 `tauri-demo` 的 `@yt/wol` 中实现最小核心地图 SDK。

每一课都按同一节奏推进：

```txt
读 HG2D 源码 → 确认理解 → 实现最小版本 → 在 WolShowcase 展示 → 写学习笔记
```

## 当前进度

- [x] Step 0：初始化地图
- [x] Step 1：点线面最小核心
- [x] Step 2：绘制交互
- [x] Step 3：编辑交互
- [x] Step 4：业务对象封装
- [x] Step 4.5：Overlay + React 示例
- [ ] Step 5：控件与测量（下一步）
- [ ] Step 6：可视化增强
- [ ] Step 7：地图切换与生命周期

## 学习路径

### Step 0：初始化地图

从 `initMap` 开始，理解 OpenLayers 的 `Map/View/Layer/Source` 基础关系。

教程：[WOL SDK initMap](./WOL-initMap.md)

### Step 1：点线面最小核心

学习 `Feature/Geometry/Style`，实现点、线、面、圆的创建与增删。

教程：[WOL SDK 点线面最小核心](./WOL-point-line-polygon.md)

### Step 2：绘制交互

学习 `Draw` Interaction，实现先点工具按钮、再用鼠标绘制点线面圆。

教程：[WOL SDK 鼠标绘制交互](./WOL-draw-interaction.md)

### Step 3：编辑交互

学习 `Select/Modify/Translate` 和最小变换交互，实现选择、修改顶点、拖拽、缩放、旋转。

教程：[WOL SDK 编辑交互](./WOL-edit-interaction.md)

### Step 4：业务对象封装

学习如何用 Feature 表达定位卡、基站、区域、轨迹，用 `wol:businessType/wol:id` 标记业务身份。

教程：[WOL SDK 业务对象封装](./WOL-business-objects.md)

### Step 4.5：Overlay + React

学习 Overlay，把 React 组件渲染到地图坐标上，并正确处理 React Root 生命周期。

教程：[WOL SDK Overlay + React](./WOL-overlay-react.md)

## 核心概念速查

| 概念 | 作用 | WOL 对应 |
| --- | --- | --- |
| `Map` | 地图容器 | `initMap().map` |
| `View` | 中心点、缩放、旋转 | `initMap().view` |
| `Layer/Source` | 图层和数据源 | `baseLayers/featureLayer/featureSource` |
| `Feature` | 可挂业务数据的要素 | `createPoint/createLine/...` |
| `Geometry` | 点线面圆的几何数据 | `Point/LineString/Polygon/Circle` |
| `Style` | 控制显示效果 | `WOLFeatureStyleOptions` |
| `Draw` | 鼠标绘制 | `enableDraw(mode)` |
| `Select/Modify/Translate` | 选择与编辑 | `enableEdit(mode)` |
| `Overlay` | 在地图坐标挂 DOM/React | `addOverlay(element, coordinate)` |

## 演示项目

所有能力都集中在：

```txt
E:\workspace\web\tauri-demo\src\pages\WolShowcase\index.tsx
```

SDK 代码位置：

```txt
E:\workspace\web\tauri-demo\packages\wol\core\
```

本地运行：

```bash
cd E:\workspace\web\tauri-demo
pnpm dev
```

打开：

```txt
http://127.0.0.1:5173/#/wol
```

## 通用建议

- 先看目标源码，再写自己的封装，不要直接复制；
- 每个能力先用最小代码跑通，再逐步加参数；
- 每个步骤结束都要更新 `PLAN.md` 和 notes，保持学习记录可追溯；
- 地图坐标、图层叠放、Interaction 生命周期是三个最容易踩坑的点。
