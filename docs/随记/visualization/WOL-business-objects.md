---
title: WOL SDK 业务对象封装
order: 5
group:
  title: visualization
---

# WOL SDK：定位卡、基站、区域、轨迹

## 这一步完成什么

在 `@yt/wol` 中实现了四类业务对象的最小封装：

- 定位卡：添加、移动、改图标、改文字、删除；
- 基站：添加、删除；
- 区域：添加、改色、改文字、删除；
- 轨迹：添加、追加点、清除。

业务对象不是新的图形体系，而是带业务 id 的普通 OpenLayers Feature，继续复用 Step 1 的 `featureSource/featureLayer` 和样式体系。

## HG2DMap 源码对应关系

| HG2DMap 方法 | 行号 | 对应 WOL 方法 |
| --- | --- | --- |
| `addCardInfo` | 1750 | `addCard` |
| `setCardCoordinate` | 1881 | `setCardCoordinate` |
| `setCardIcon` | 1952 | `setCardIcon` |
| `setCardText` | 2016 | `setCardText` |
| `removeOneCard` | 2089 | `removeCard` |
| `addTrack` | 2203 | `addTrack` |
| `removeOneTrack` | 2248 | `clearTrack` |
| `clearOneTrack` | 2300 | `clearTrack` |
| `addBaseStation` | 2604 | `addBaseStation` |
| `removeOneBaseStation` | 2643 | `removeBaseStation` |
| `addZone` | 2694 | `addZone` |
| `setZoneColor` | 2851 | `setZoneColor` |
| `setZoneText` | 2870 | `setZoneText` |
| `removeOneZone` | 2972 | `removeZone` |

## 核心思路：业务对象就是 Feature

HG2DMap 的定位卡、基站、区域、轨迹本质上都是 Feature：

- 定位卡/基站：`Point` Feature + 图标/文字；
- 区域：`Polygon` Feature + 填充/描边/文字；
- 轨迹：`LineString` Feature + 描边。

所以 WOL 不需要另建一套对象模型，只需要在创建 Feature 时挂两个业务属性：

```ts
feature.set("wol:businessType", "card");
feature.set("wol:id", 1);
```

后续点击、选择、筛选时，通过 `getBusinessType/getBusinessId` 就能找到对应业务对象。

## WOL API

```ts
const result = initMap({
  target: "map",
  image: {
    url: "/wol-floor-map.svg",
    extent: [0, 0, 1200, 720],
  },
});

result.addCard("card-1", [320, 260], {
  text: "定位卡 01",
  fillColor: "#f59e0b",
});

result.setCardCoordinate("card-1", [930, 540]);
result.setCardText("card-1", "已移动");

result.addBaseStation("station-1", [120, 600], {
  text: "基站 01",
  fillColor: "#8b5cf6",
});

result.addZone(
  "zone-1",
  [
    [180, 470],
    [360, 390],
    [520, 540],
    [300, 650],
  ],
  {
    text: "仓库 A",
    fillColor: "rgba(34, 197, 94, 0.25)",
  },
);

result.setZoneColor("zone-1", "rgba(244, 63, 94, 0.25)");
result.setZoneText("zone-1", "仓库 A（已切换）");

result.addTrack("track-1", {
  startPoint: [120, 320],
  strokeColor: "#ef4444",
});
result.appendTrackPoint("track-1", [420, 250]);
result.clearTrack("track-1");
```

## id 注册表

`initMap` 内部为四类业务对象各维护一个 Map：

- 相同 id 重复添加时，先删除旧 Feature 再添加新 Feature；
- 更新方法通过 id 找到 Feature，不要求业务侧保存 Feature 引用；
- `removeAllFeature` 和 `destroy` 会同时清空注册表，避免 id 指向已移除的旧要素。

## 页面用法

`WolShowcase` 新增“业务对象”区域，只在图片地图模式启用：

- 定位卡可以添加、移动、改文字、删除；
- 基站可以添加、删除；
- 区域可以添加、切换样式、删除；
- 轨迹可以添加、追加点、清除。

## 涉及文件

- WOL SDK 业务对象：`E:\workspace\web\tauri-demo\packages\wol\core\business.ts`
- WOL SDK 地图入口：`E:\workspace\web\tauri-demo\packages\wol\core\map.ts`
- 页面展示：`E:\workspace\web\tauri-demo\src\pages\WolShowcase\index.tsx`
- 目标库源码：`E:\workspace\web\HG2DMap\src\map.ts`

## 验证结果

- `pnpm build` 通过；
- `pnpm --filter @yt/wol build` 通过；
- 四类业务对象的添加、更新、删除已接入页面。

## 定位卡/基站图标与轨迹可见性

定位卡和基站本质上是“点要素 + 图片图标”。HG2DMap 的 `addCardInfo/addBaseStation` 会接收 `icon` 图片地址，再用 `ol/style/Icon` 显示。

WOL 的 `addCard/addBaseStation` 也支持 `icon` 参数，但示例页面之前没有传，所以显示成了默认圆点。现在示例使用自己生成的测试图标：

```ts
result.addCard("card-1", [320, 260], {
  text: "定位卡 01",
  icon: "/hg-icons/location.png",
  iconScale: 0.55,
});

result.addBaseStation("station-1", [120, 600], {
  text: "基站 01",
  icon: "/hg-icons/baseStation.png",
  iconScale: 0.55,
});
```

轨迹是 `LineString`，OpenLayers 的单点折线不会显示。HG2DMap 的 `_addNewTrackLine` 虽然也用单点创建轨迹，但会同时添加起点图标，并且下一次坐标更新后折线才可见。

WOL 现在给轨迹创建参数增加了 `points`：

```ts
result.addTrack("track-1", {
  startPoint: [120, 320],
  points: [
    [420, 250],
    [760, 420],
    [1020, 300],
  ],
  strokeColor: "#ef4444",
});
```

创建时会把 `points` 拼到起点后面，形成至少两个坐标点的折线，所以添加轨迹后立即可见；后续仍可用 `appendTrackPoint` 继续追加点。
