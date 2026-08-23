---
title: WOL SDK Overlay + React
order: 7
group:
  title: visualization
---

# WOL SDK：用 Overlay 在地图上渲染 React 组件

## 这一步完成什么

给 `@yt/wol` 增加了 Overlay 封装，并在 `WolShowcase` 展示两种用法：

- 点击地图上的要素，在该坐标弹出 React 信息卡片；
- 在指定坐标渲染一个带“尖角指向坐标”的 React 信息盒子。

## Overlay 是什么

OpenLayers 的 `Overlay` 是一个挂在地图坐标上的 DOM 元素：

- 地图平移、缩放时，Overlay 会跟着坐标移动；
- Overlay 不是图层，不参与矢量渲染；
- Overlay 的 `element` 可以是任意 `HTMLElement`，所以天然支持 React。

HG2DMap 在 `map.ts` 的 `addPopup` 里也是用 Overlay 实现信息弹窗。

## 用 React 渲染

React 不直接认识 OpenLayers，但 Overlay 认识 DOM。把 React 组件渲染到一个新建的 `div`，再把 `div` 交给 Overlay：

```tsx
import { createRoot } from "react-dom/client";

const container = document.createElement("div");
const root = createRoot(container);
root.render(<FeatureInfoCard />);

const overlay = map.addOverlay(container);
overlay.setPosition(coordinate);
```

关闭时要做两件事：

```tsx
root.unmount();
container.remove();
map.removeOverlay(overlay);
```

`root.unmount()` 负责清理 React 内部状态，`removeOverlay` 负责把 DOM 从地图上摘掉。

## WOL API

```ts
const result = initMap({ target: "map" });

const overlay = result.addOverlay(container, coordinate, {
  positioning: "bottom-center",
  offset: [0, -14],
  stopEvent: true,
});

result.removeOverlay(overlay);
result.removeAllOverlay();
```

参数说明：

- `positioning`：Overlay 相对坐标点的对齐方式，默认 `bottom-center`；
- `offset`：像素偏移，让信息盒子和坐标点保持一点距离；
- `stopEvent`：阻止地图事件穿透到弹窗，保证按钮能点击；
- `className`：自定义 Overlay 容器 class。

## 页面操作

`WolShowcase` 新增“Overlay 示例”区域。

### 点击要素弹窗

1. 点击“点击要素弹窗”；
2. 点击地图上的定位卡、基站、区域、轨迹或绘制要素；
3. 地图通过 `forEachFeatureAtPixel` 命中 `featureLayer` 上的要素；
4. 在该坐标弹出 React 信息卡片，显示业务类型、id 和坐标；
5. 点击卡片右上角关闭按钮，会卸载 React Root 并移除 Overlay。

### 固定信息盒

1. 点击“固定信息盒”；
2. 在图片地图中心 `[600, 360]` 显示一个信息盒子；
3. 盒子底部中央的尖角指向坐标点。

### 关闭 Overlay

点击“关闭 Overlay”会：

1. 移除地图 click 监听；
2. 卸载所有 React Root；
3. 调用 `removeAllOverlay()` 移除全部 Overlay。

切换地图、开始绘制、开始编辑、页面卸载时也会自动执行同样的清理。

## 涉及文件

- WOL SDK Overlay：`E:\workspace\web\tauri-demo\packages\wol\core\overlay.ts`
- WOL SDK 地图入口：`E:\workspace\web\tauri-demo\packages\wol\core\map.ts`
- 页面展示：`E:\workspace\web\tauri-demo\src\pages\WolShowcase\index.tsx`
- 目标库源码：`E:\workspace\web\HG2DMap\src\map.ts`

## 验证结果

- `pnpm build` 通过；
- 点击要素弹窗和固定信息盒都已接入页面；
- 关闭、切换地图、卸载页面时会清理 React Root 和 Overlay。

## Overlay 和 Control/Layer 的区别

OpenLayers 有三种“往地图上放东西”的方式，容易混淆：

| 方式 | 位置 | 典型用途 |
| --- | --- | --- |
| `Layer` | 地图坐标系内，参与渲染 | 底图、矢量要素、热力图 |
| `Control` | 屏幕固定位置 | 缩放按钮、比例尺、全屏 |
| `Overlay` | 跟随某个地图坐标移动 | 信息弹窗、React 组件、测量提示 |

Overlay 的核心特征是：

```txt
一个 DOM 元素 + 一个地图坐标
```

地图平移时，Overlay 会持续把坐标换算成屏幕像素，再把 DOM 移动到对应位置。

## WOL Overlay Options 详解

```ts
result.addOverlay(container, coordinate, {
  positioning: "bottom-center",
  offset: [0, -14],
  stopEvent: true,
  className: "hg-info-box-container",
  autoPan: true,
});
```

### positioning

表示 Overlay 相对坐标点的对齐方式：

- `bottom-center`：盒子底部中心对准坐标，适合“尖角向下”的信息盒；
- `top-center`：盒子顶部中心对准坐标，适合“尖角向上”的提示；
- `center-left/center-right`：左右对齐，适合侧边标签。

### offset

`[x, y]` 像素偏移。`[0, -14]` 表示向上偏移 14px，让信息盒子和坐标点之间留出尖角空间。

### stopEvent

是否阻止地图事件穿透到 Overlay DOM。

```txt
true  → 点击弹窗按钮不会触发地图 click/拖拽
false → 事件会穿透到地图
```

React 弹窗里有按钮时建议设为 `true`。

### autoPan

Overlay 显示后是否自动平移地图，让元素完整进入视口。适合要素靠近地图边缘时的弹窗。

## Overlay 常用方法

```ts
const overlay = result.addOverlay(container, coordinate);

overlay.setPosition([200, 100]);
overlay.getPosition();

overlay.setOffset([0, -20]);
overlay.getOffset();

overlay.setPositioning("top-center");
overlay.getPositioning();

overlay.setElement(anotherContainer);
overlay.getElement();

overlay.panIntoView();
```

## React Root 生命周期

React 组件不是直接传给 Overlay，而是先渲染进一个 `div`，再把这个 `div` 交给 Overlay。

正确顺序：

```tsx
const container = document.createElement("div");
const root = createRoot(container);
root.render(<FeatureInfoCard />);

const overlay = result.addOverlay(container, coordinate);
```

关闭时：

```tsx
root.unmount();          // 清理 React 内部状态
container.remove();      // 从页面移除 DOM
result.removeOverlay(overlay); // 从地图移除 Overlay
```

只做其中一步会留下问题：

- 只 `unmount` 不 `removeOverlay`：DOM 残留在地图上；
- 只 `removeOverlay` 不 `unmount`：React 状态没有清理，可能重复挂载；
- 既不清理也不移除：切换地图后 Overlay 和 React 实例泄漏。

## 尖角指向坐标的 CSS 原理

信息盒底部中央的尖角本质是 CSS 边框三角形：

```tsx
<div
  style={{
    position: "absolute",
    left: "50%",
    top: "100%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "8px solid transparent",
    borderRight: "8px solid transparent",
    borderTop: "10px solid #fff",
    pointerEvents: "none",
  }}
/>
```

配合 Overlay 的 `positioning: "bottom-center"` 和 `offset: [0, -14]`，尖角正好指向坐标点。

## 点击要素弹窗的实现链路

```txt
开启“点击要素弹窗”
  → map.on("click")
  → forEachFeatureAtPixel
  → layerFilter 只命中 featureLayer
  → 读取 wol:businessType / wol:id / wol:kind
  → createRoot(container).render(<FeatureInfoCard/>)
  → addOverlay(container, coordinate)
```

关键点：

- 用 `layerFilter` 限制命中图层，避免底图 GeoJSON 也被弹窗；
- 用 `stopEvent: true` 保证弹窗按钮可点击；
- 用 `EventsKey + unByKey` 管理 click 监听，切换地图时能准确移除。

## 常见坑

### Overlay 不显示

检查两点：

1. `element` 是否真的有宽高；
2. `position` 是否在当前地图坐标范围内。

### 弹窗按钮点不到

把 `stopEvent` 设为 `true`，并确认 Overlay DOM 没有被子元素遮挡。

### 切换地图后弹窗还在

在 `destroy()` 或页面卸载时调用 `removeAllOverlay()`，同时 `unmount()` 所有 React Root。

### 多次打开弹窗导致重复渲染

每次打开都新建独立的 `container/root/overlay`，关闭时按创建顺序逐个清理，不要复用同一个 Root 渲染多个弹窗。
