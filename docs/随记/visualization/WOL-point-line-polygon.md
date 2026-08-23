---
title: WOL SDK 点线面最小核心
order: 3
group:
  title: visualization
---

# WOL SDK：点线面最小核心

## 这一步完成什么

在 `@yt/wol` 中实现了 HG2DMap 的点线面圆最小能力：

- `createPoint`：创建点要素；
- `createLine`：创建线要素；
- `createPolygon`：创建面要素；
- `createCircle`：创建圆要素；
- `addFeature/removeFeature/removeAllFeature`：向地图添加、删除、清空要素；
- `setFeatureStyle`：更新已有要素的样式。

展示页面在 `tauri-demo` 的 `WolShowcase`，图片地图上可以一键添加点、线、面、圆，删除最后一个要素，清空全部要素，并切换面样式。

## HG2DMap 源码对应关系

HG2DMap 的点线面代码集中在 `HG2DMap/src/feature.ts`：

| HG2DMap 源码 | 行号 | 对应 WOL 能力 |
| --- | --- | --- |
| `Point` | 53 | `createPoint` |
| `Line` | 190 | `createLine` |
| `Polygon` | 243 | `createPolygon` |
| `Circle` | 295 | `createCircle` |
| `getCoordinates/startFlash/stopFlash` | 448/456/510 | 后续事件、闪烁步骤再补齐 |

要素添加与删除在 `HG2DMap/src/map.ts`：

| HG2DMap 方法 | 行号 | 对应 WOL 方法 |
| --- | --- | --- |
| `addFeature` | 3070 | `initMap` 返回值上的 `addFeature` |
| `removeFeature` | 3081 | `initMap` 返回值上的 `removeFeature` |
| `removeAllFeature` | 3091 | `initMap` 返回值上的 `removeAllFeature` |

HG2DMap 在 `Map` 构造器里创建了 `vector_draw_source` 和 `vector_draw_layer`。WOL 在 `initMap` 阶段也创建了一个独立的 `featureSource/featureLayer`，动态业务要素和底图数据源分开，避免互相干扰。

## OpenLayers 核心概念

点线面圆在 OpenLayers 里由三部分协作完成：

1. `Geometry`：描述形状和坐标，例如 `Point/LineString/Polygon/Circle`；
2. `Feature`：把几何体包装成可挂业务数据的要素；
3. `Style`：控制要素如何显示，例如图标、文字、填充、描边。

WOL 的工厂函数把这三步合并成一个函数，业务侧只需要传坐标和样式。

```ts
import { createPoint } from "@yt/wol";

const point = createPoint([600, 360], {
  text: "门禁点",
  fillColor: "#22c55e",
  strokeColor: "#166534",
});
```

点要素不传 `icon` 时，SDK 使用默认圆形标记；传入 `icon` 时使用图片图标。

## 图片地图坐标

`WolShowcase` 使用的图片地图范围是：

```ts
[0, 0, 1200, 720]
```

所以示例要素的坐标都是图片内部坐标，例如 `[600, 360]` 是图片中心点，`radius: 110` 表示 110 个图片像素单位。

这和 HG2DMap 的 `type: "image"` 地图一致：先给图片定一个 `extent`，再在这个坐标范围内放点线面。

## 页面使用方式

`initMap` 返回值新增了以下能力：

```ts
const result = initMap({
  target: "map",
  image: {
    url: "/wol-floor-map.svg",
    extent: [0, 0, 1200, 720],
  },
});

result.addFeature(
  createPolygon(
    [
      [140, 420],
      [380, 330],
      [520, 480],
      [280, 560],
    ],
    {
      fillColor: "rgba(34, 197, 94, 0.25)",
      strokeColor: "#16a34a",
      text: "活动区域",
    },
  ),
);

const count = result.featureSource.getFeatures().length;
result.removeAllFeature();
```

更新已有要素样式：

```ts
const polygon = result.featureSource
  .getFeatures()
  .find((feature) => getFeatureKind(feature) === "polygon");

if (polygon) {
  result.setFeatureStyle(polygon, {
    fillColor: "rgba(244, 63, 94, 0.25)",
    strokeColor: "#e11d48",
    text: "活动区域（已切换）",
  });
}
```

`getFeatureKind` 读取的是 `wol:kind` 属性，对应 HG2DMap 用 `feature.type` 区分点线面的思路。

## 涉及文件

- WOL SDK 点线面：`E:\workspace\web\tauri-demo\packages\wol\core\feature.ts`
- WOL SDK 地图入口：`E:\workspace\web\tauri-demo\packages\wol\core\map.ts`
- 页面展示：`E:\workspace\web\tauri-demo\src\pages\WolShowcase\index.tsx`
- 目标库源码：`E:\workspace\web\HG2DMap\src\feature.ts`

## 验证结果

- `pnpm build` 通过；
- `pnpm --filter @yt/wol build` 通过；
- 图片地图上点线面圆添加、删除、清空、样式切换均已接入页面。
