---
title: WOL SDK 地图旋转
order: 9
group:
  title: visualization
---

# WOL SDK：地图旋转

## 这一步完成什么

给 `@yt/wol` 增加地图视图旋转能力，并在 `WolShowcase` 页面提供：

- 左转；
- 右转；
- 复位旋转；
- 当前旋转角度显示。

这里的旋转指的是“地图视图”旋转，不是旋转单个要素。要素旋转属于 Step 3 的编辑交互。

## HG2DMap 源码对应关系

HG2DMap 的 `_mouseRightRotation` 通过鼠标右键拖拽旋转地图：

| HG2DMap 源码 | 位置 | 对应 WOL 能力 |
| --- | --- | --- |
| `_mouseRightRotation` | `src/map.ts` 约第 439 行 | `rotateMap/resetRotation` |
| `getView().adjustRotationInternal` | `_mouseRightRotation` 内部 | `view.animate({ rotation })` |

WOL 第一步先做按钮式旋转，后续如果要支持右键拖拽旋转，可以再封装成 Interaction。

## WOL API

```ts
const result = initMap({ target: "map" });

// 顺时针旋转 15 度
result.rotateMap(Math.PI / 12);

// 逆时针旋转 15 度
result.rotateMap(-Math.PI / 12);

// 回到正北方向
result.resetRotation();

// 当前旋转弧度
const rotation = result.getRotation();
```

旋转角度单位是弧度：

```txt
90 度 = Math.PI / 2
180 度 = Math.PI
15 度 = Math.PI / 12
```

页面显示时再转换成角度：

```ts
const degrees = (rotation * 180) / Math.PI;
```

注意：`initMap` 的 `enableRotation` 默认已经是 `true`。如果显式传 `false`，
OpenLayers 会使用“始终旋转到 0 度”的约束，`rotateMap/resetRotation` 都会失效。

## 页面用法

`WolShowcase` 状态区新增 Rotation 显示，地图控制区新增：

- `左转`：`rotateMap(-Math.PI / 12)`；
- `右转`：`rotateMap(Math.PI / 12)`；
- `复位旋转`：`resetRotation()`。

旋转动画通过 `view.animate({ rotation, duration })` 执行，每次旋转 15 度，动画时长默认 180ms。

## 涉及文件

- WOL SDK 地图入口：`E:\workspace\web\tauri-demo\packages\wol\core\map.ts`
- 页面展示：`E:\workspace\web\tauri-demo\src\pages\WolShowcase\index.tsx`
- 目标库源码：`E:\workspace\web\HG2DMap\src\map.ts`

## 验证结果

- `pnpm build` 通过；
- 页面可左转、右转、复位旋转；
- 状态区会显示当前旋转角度。
