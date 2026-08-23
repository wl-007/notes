---
title: WOL SDK initMap
order: 2
group:
  title: visualization
---

# WOL SDK：initMap 初始化地图

## 这次先做什么

我们在 `tauri-demo` 里新建的 `@yt/wol` 是一个基于 OpenLayers 的轻量 SDK。它不依赖 React，也不依赖 Vue、Svelte、Angular 等任何 UI 框架。

第一步先做 `initMap`，目标很明确：给一个 DOM 容器，创建 OpenLayers 地图实例，并挂上一个底图。当前学习切片只保留两类：单张图片地图、GeoJSON 矢量地图。

代码位置：

- 新 SDK 初始化入口：`E:\workspace\web\tauri-demo\packages\wol\core\map.ts`
- 新 SDK 统一导出入口：`E:\workspace\web\tauri-demo\packages\wol\index.ts`
- HG2DMap 老项目初始化参考：`E:\workspace\web\HG2DMap\src\map.ts`

## HG2DMap 的初始化在哪里

HG2DMap 老项目的核心初始化在 `E:\workspace\web\HG2DMap\src\map.ts` 的 `Map` 类构造函数里。

它的大致流程是：

1. `constructor(map_options)` 里先创建 `new ol_map(...)` 和 `new ol_view(...)`。
2. 根据 `map_options.type` 判断地图类型。
3. 调用 `_getMapLayer(map_options)` 创建底图图层。
4. 再继续创建人员图层、轨迹图层、基站图层、区域图层、绘制图层、热力图图层、测量图层。
5. 最后把这些图层按顺序 `addLayer` 到地图上。

也就是说，HG2DMap 的初始化不是只创建一张底图，它同时把很多业务图层也初始化好了。WOL SDK 现在先只做第 1 步和第 3 步的一小部分：创建地图、创建 ImageStatic 单张图片底图或 GeoJSON 矢量底图。后续再逐个补业务能力。

## ImageStatic 是地图的什么功能

ImageStatic 可以理解为单张图片地图。

它不按 `z/x/y` 加载瓦片，而是只加载一张完整图片，然后把图片铺到一个固定范围 `extent` 里。这个能力非常适合：

- 室内楼层平面图；
- 园区总平面图；
- 厂区设备布置图；
- 没有真实经纬度、但需要在图片上叠加点位和区域的业务图。

`extent` 的格式是：

```txt
[minX, minY, maxX, maxY]
```

如果图片宽高是 `1200 x 720`，最简单的范围就是：

```ts
[0, 0, 1200, 720]
```

这样图片左下角是 `[0, 0]`，右上角是 `[1200, 720]`。后续添加人员点位、基站点位、区域多边形时，也可以使用这套图片内部坐标。

## GeoJSON 是地图的什么功能

GeoJSON 可以理解为前端直接加载的点、线、面矢量数据。

它和图片地图的区别：

- ImageStatic：加载的是一张完整图片；
- GeoJSON：加载的是结构化矢量数据，OpenLayers 会把它解析成很多 `Feature`。

GeoJSON 最常见的数据坐标系是 `EPSG:4326`，也就是经纬度。OpenLayers 渲染互联网地图时，View 默认通常是 `EPSG:3857`，所以读取 GeoJSON 时需要通过 `featureProjection` 转到当前 View 投影。

这和 HG2DMap 老项目里的 `_getGeoJsonLayer` 思路一致：先 XHR 加载 GeoJSON，再 `readFeatures(..., { featureProjection: this.getView().getProjection() })`，最后把 features 添加到 `VectorSource`。

GeoJSON 的几何结构是标准的，但 `properties` 里的字段名不是标准的。阿里云行政区数据里名称字段是 `name`，别的数据可能叫 `NAME`、`fullname`、`title`。所以 SDK 不把标注字段写死，而是通过 `geojson.label.property` 配置。

当前示例先只加载省级数据 `code=100000_full`。城市/区县数据量更大，后续需要下钻或高缩放展示时再单独接入。

## 数据源可以有哪些

这次 `initMap` 先聚焦 2 类底图数据源：

1. `image`：单张图片地图，也就是 OpenLayers 的 `ImageStatic`。
2. `geojson`：GeoJSON 矢量地图，也就是 OpenLayers 的 `VectorSource + VectorLayer`。

后续如果重新扩展其它地图来源，再单独开新的学习步骤，不放在当前初始化示例里。

## 最简单用法

HTML 里准备一个容器：

```html
<div id="map" style="width: 100%; height: 600px;"></div>
```

在任意框架或原生 JS 中调用：

```ts
import { initMap } from "@yt/wol";
import "ol/ol.css";

const { map, view, updateSize, destroy } = initMap({
  target: "map",
  minZoom: 0,
  maxZoom: 8,
  image: {
    url: "/floor-1.png",
    extent: [0, 0, 1200, 720],
  },
});
```

当前阶段建议显式传 `image` 或 `geojson`，这样学习重点集中在图片坐标和矢量数据加载上。

## 使用单张图片地图

```ts
import { initMap } from "@yt/wol";
import "ol/ol.css";

initMap({
  target: "map",
  minZoom: 0,
  maxZoom: 8,
  image: {
    url: "/floor-1.png",
    extent: [0, 0, 1200, 720],
    imageSize: [1200, 720],
  },
});
```

这里没有传 `tile`，因为 `image` 存在时，SDK 会按纯图片地图处理，不再自动创建 OSM 瓦片底图。

几个关键参数：

- `url`：图片地址；
- `extent`：图片在地图坐标系里的范围；
- `imageSize`：图片原始宽高；
- `fit`：是否初始化后自动显示完整图片，默认 `true`；
- `padding`：自动适配图片时的边距。

图片地图里如果要传 `center`，默认按图片坐标原样使用。例如：

```ts
initMap({
  target: "map",
  center: [600, 360],
  zoom: 3,
  image: {
    url: "/floor-1.png",
    extent: [0, 0, 1200, 720],
  },
});
```

## 使用 GeoJSON 矢量地图

```ts
import { initMap } from "@yt/wol";
import "ol/ol.css";

initMap({
  target: "map",
  center: [104.195, 35.861],
  zoom: 4,
  minZoom: 3,
  maxZoom: 12,
  geojson: {
    url: "https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full",
    fillColor: "rgba(34, 197, 94, 0.14)",
    strokeColor: "rgba(21, 128, 61, 0.95)",
    strokeWidth: 1.2,
    padding: [24, 24, 24, 24],
    label: {
      enabled: true,
      property: "name",
      font: "14px sans-serif",
      color: "#14532d",
      strokeColor: "rgba(255, 255, 255, 0.95)",
      strokeWidth: 4,
    },
  },
  onProgress: (progress) => {
    console.log("GeoJSON 加载进度", progress.percent);
  },
  onLoaded: () => {
    console.log("GeoJSON 加载完成");
  },
  onError: (error) => {
    console.error(error.message);
  },
});
```

几个关键参数：

- `geojson`：可以传单个配置对象，也可以传数组加载多层 GeoJSON；
- `url`：GeoJSON 地址；
- `dataProjection`：GeoJSON 原始坐标系，默认 `EPSG:4326`；
- `fit`：加载完成后是否自动适配到数据范围，默认 `true`；
- `fillColor`：面填充色；
- `strokeColor`：线/面描边色；
- `strokeWidth`：线/面描边宽度。
- `label.enabled`：是否显示标注；
- `label.property`：从 `properties` 里读取哪个字段作为标注文字，默认 `name`；
- `label.minZoom` / `label.maxZoom`：控制标注在哪些缩放级别显示。

城市级 GeoJSON 数据量更大，低缩放时拖动会更容易卡。当前示例只加载省级数据，先保证初始化地图和省名标注的基础体验。

当前 `tauri-demo` 的 `WolShowcase` 页面已经接入了这个示例，按钮名是 `GeoJSON 中国`。

## 坐标注意

图片地图使用图片内部的平面坐标，例如 `[600, 360]`。GeoJSON 通常使用经纬度 `EPSG:4326`，SDK 读取时会把数据转换到当前 View 投影。

后续如果重新接入在线瓦片，再单独补充 `EPSG:4326` 和 `EPSG:3857` 中心点转换示例。

## 返回值怎么用

`initMap` 返回 OpenLayers 原生对象和几个便捷方法：

```ts
const result = initMap({ target: "map" });

result.map.on("click", (event) => {
  console.log("点击坐标：", event.coordinate);
});

result.view.setZoom(14);
result.updateSize();
result.destroy();
```

返回 OpenLayers 原生对象的好处是：SDK 没封装到的能力，业务代码依然可以直接用 OpenLayers API 继续完成。

## 容器宽高很重要

地图容器必须有宽高，否则地图会初始化成功但看不到内容。

```html
<div id="map" style="width: 100%; height: 600px;"></div>
```

如果地图在弹窗、Tab、折叠面板里，第一次初始化时容器可能是隐藏的。等容器显示出来以后，调用：

```ts
result.updateSize();
```

这样 OpenLayers 会重新计算地图尺寸。
