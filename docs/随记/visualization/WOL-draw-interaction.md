---
title: WOL SDK 鼠标绘制交互
order: 4
group:
  title: visualization
---

# WOL SDK：鼠标绘制点线面圆

## 这一步完成什么

在 `@yt/wol` 中实现了“先点工具按钮，再用鼠标在地图上绘制”的能力：

- 点：单击一次放置点；
- 线：点击添加顶点，双击完成；
- 面：点击添加顶点，双击闭合；
- 圆：按住起点拖动，松开后按半径成圆。

绘制完成的要素自动进入 Step 1 创建的 `featureSource/featureLayer`，并补上 `wol:kind` 类型和最终样式，业务侧不需要手动 `addFeature`。

## HG2DMap 源码对应关系

HG2DMap 的绘制能力集中在 `HG2DMap/src/draw.ts`：

| HG2DMap 源码 | 行号 | 对应 WOL 能力 |
| --- | --- | --- |
| `Line` | 23 | `createDrawInteraction("line", source)` |
| `Rectangle` | 39 | 后续用 `createBox()` 扩展 |
| `Circle` | 54 | `createDrawInteraction("circle", source)` |
| `RegularPolygon` | 68 | 后续用 `createRegularPolygon()` 扩展 |
| `Polygon` | 83 | `createDrawInteraction("polygon", source)` |
| `isSelfIntersection` | 161 | 后续编辑交互步骤再实现 |

HG2DMap 直接用 OpenLayers 的 `ol/interaction/Draw`，WOL 也复用了同一底层能力，只是把模式映射、样式应用和事件回调封装成更小的 API。

## OpenLayers Draw 的核心技术点

### 1. Interaction 需要挂到 Map 上

`Draw` 是 OpenLayers 的 Interaction，不是图层：

```ts
import Draw from "ol/interaction/Draw";

const draw = new Draw({
  source,
  type: "LineString",
});

map.addInteraction(draw);
map.removeInteraction(draw);
```

所以 `initMap` 返回值里需要暴露 `enableDraw/disableDraw`，由 SDK 内部管理 Interaction 的添加和移除。

### 2. source 是绘制结果的落点

`Draw` 配置了 `source` 后，`drawend` 时 OpenLayers 会把绘制完成的 Feature 自动加入 source。

WOL 直接复用 Step 1 的 `featureSource`，所以鼠标画出来的要素和 `createPoint/createLine/createPolygon/createCircle` 创建的要素在同一个图层里。

### 3. type 决定鼠标手势

`Draw` 通过 `type` 决定生成哪种几何体：

| type | 鼠标行为 |
| --- | --- |
| `Point` | 单击一次直接完成 |
| `LineString` | 逐点点击，双击或 Esc 结束 |
| `Polygon` | 逐点点击，双击闭合 |
| `Circle` | 按住拖动，松开完成 |

### 4. drawstart/drawend 是页面联动入口

```ts
draw.on("drawstart", (event) => {
  // event.feature 是正在绘制的 sketch 要素
});

draw.on("drawend", (event) => {
  // event.feature 是已经落入 source 的最终要素
});
```

WOL 在 `drawend` 里做了三件事：

1. 写入 `wol:kind`，让绘制结果和预设要素使用同一套类型体系；
2. 写入 `data` 里的业务数据；
3. 调用 `setFeatureStyle` 应用最终样式。

### 5. 同一时间只能有一个绘制工具

如果页面同时挂多个 Draw，鼠标事件会冲突。所以 `enableDraw` 每次先移除上一个 Draw Interaction，再创建新的；`disableDraw` 只移除交互，不删除已经画好的要素。

## WOL API

```ts
const result = initMap({
  target: "map",
  image: {
    url: "/wol-floor-map.svg",
    extent: [0, 0, 1200, 720],
  },
});

result.enableDraw("polygon", {
  style: {
    fillColor: "rgba(56, 189, 248, 0.22)",
    strokeColor: "#0ea5e9",
    strokeWidth: 2,
  },
  onDrawEnd: ({ feature, mode }) => {
    console.log(mode, feature.get("wol:kind"));
  },
});

result.disableDraw();
```

支持的模式：

```ts
type WOLDrawMode = "point" | "line" | "polygon" | "circle";
```

## 页面用法

`WolShowcase` 新增“鼠标绘制”区域：

- 点击“绘制点/线/面/圆”进入对应模式；
- 页面右上角显示当前绘制模式；
- 绘制完成后要素数量自动刷新；
- 点击“结束绘制”恢复普通地图拖拽；
- 切换地图或销毁地图时自动清理 Draw Interaction。

## 涉及文件

- WOL SDK 绘制交互：`E:\workspace\web\tauri-demo\packages\wol\core\draw.ts`
- WOL SDK 地图入口：`E:\workspace\web\tauri-demo\packages\wol\core\map.ts`
- 页面展示：`E:\workspace\web\tauri-demo\src\pages\WolShowcase\index.tsx`
- 目标库源码：`E:\workspace\web\HG2DMap\src\draw.ts`

## 验证结果

- `pnpm build` 通过；
- `pnpm --filter @yt/wol build` 通过；
- 点、线、面、圆四种鼠标绘制已接入页面。
