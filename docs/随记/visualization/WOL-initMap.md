---
title: WOL SDK initMap
order: 2
group:
  title: visualization
---

# WOL SDK：initMap 初始化地图

## 这次先做什么

我们在 `tauri-demo` 里新建的 `@yt/wol` 是一个基于 OpenLayers 的轻量 SDK。它不依赖 React，也不依赖 Vue、Svelte、Angular 等任何 UI 框架。

第一步先做 `initMap`，目标很明确：给一个 DOM 容器，创建 OpenLayers 地图实例，并挂上一个底图。底图现在支持两大类：瓦片地图和单张图片地图。

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

也就是说，HG2DMap 的初始化不是只创建一张底图，它同时把很多业务图层也初始化好了。WOL SDK 现在先只做第 1 步和第 3 步的一小部分：创建地图、创建 Tile 底图或 ImageStatic 单张图片底图。后续再逐个补业务能力。

## Tile 是地图的什么功能

Tile 可以理解为地图瓦片。

一整张世界地图或城市地图非常大，浏览器不可能一次性加载完整大图。瓦片地图会把地图按缩放级别切成很多小图片：

- `z`：缩放级别，数字越大越清晰，地图越近；
- `x`：当前缩放级别下，横向第几块瓦片；
- `y`：当前缩放级别下，纵向第几块瓦片。

常见的瓦片地址长这样：

```txt
https://tile.openstreetmap.org/{z}/{x}/{y}.png
```

OpenLayers 会根据当前视图自动计算需要加载哪些瓦片。用户拖动地图时，会加载新的 `x/y`；用户缩放地图时，会加载新的 `z`。

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

## 数据源可以有哪些

这次 `initMap` 先支持 5 类底图数据源：

1. `osm`：OpenStreetMap，默认数据源，不需要 key，适合开发调试。
2. `xyz`：通用 XYZ 瓦片服务，只要服务地址支持 `{z}/{x}/{y}` 就能接。
3. `tianditu-vector`：天地图矢量底图，需要天地图 key。
4. `tianditu-image`：天地图影像底图，需要天地图 key。
5. `image`：单张图片地图，也就是 OpenLayers 的 `ImageStatic`。

后续可以继续扩展：

- `WMTS`：标准瓦片服务，政企 GIS 系统里很常见；
- `WMS`：按范围动态出图的地图服务；
- `GeoJSON`：前端直接加载点、线、面矢量数据；
- `KML`：HG2DMap 老项目已经支持的地图数据格式；
- `VectorTile`：矢量瓦片，适合更高性能和可动态换样式的地图。

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
  center: [116.397, 39.908],
  zoom: 10,
});
```

注意：`center` 默认按经纬度传入，也就是 `EPSG:4326`。SDK 内部会转成 OpenLayers 默认的 `EPSG:3857`。

## 使用 XYZ 瓦片

```ts
import { initMap } from "@yt/wol";
import "ol/ol.css";

initMap({
  target: "map",
  center: [116.397, 39.908],
  zoom: 12,
  tile: {
    type: "xyz",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    maxZoom: 19,
  },
});
```

`xyz` 的核心就是 `url`。只要地图服务能按 `{z}/{x}/{y}` 返回图片，就可以接进来。

## 使用天地图矢量底图

```ts
import { initMap } from "@yt/wol";
import "ol/ol.css";

initMap({
  target: "map",
  center: [116.397, 39.908],
  zoom: 10,
  tile: {
    type: "tianditu-vector",
    key: "你的天地图key",
    withAnnotation: true,
  },
});
```

天地图的矢量底图和中文标注是两个图层。`withAnnotation: true` 时，SDK 会自动创建：

- `vec_w`：矢量底图；
- `cva_w`：中文标注。

## 使用天地图影像底图

```ts
import { initMap } from "@yt/wol";
import "ol/ol.css";

initMap({
  target: "map",
  center: [116.397, 39.908],
  zoom: 10,
  tile: {
    type: "tianditu-image",
    key: "你的天地图key",
    withAnnotation: true,
  },
});
```

影像底图适合看卫星图。`withAnnotation: true` 时，SDK 会自动创建：

- `img_w`：影像底图；
- `cia_w`：影像中文标注。

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

## 使用 HG2DMap 的 EPSG:3857 中心点

HG2DMap 老代码里很多中心点已经是 OpenLayers 的 Web Mercator 坐标，例如：

```ts
const center = [11584348.7765495814, 3577640.5451782243];
```

这类坐标不是经纬度，所以要告诉 `initMap` 不要再转换：

```ts
import { initMap } from "@yt/wol";
import "ol/ol.css";

initMap({
  target: "map",
  center: [11584348.7765495814, 3577640.5451782243],
  centerProjection: "EPSG:3857",
  zoom: 10,
});
```

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
