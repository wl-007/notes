---
title: WOL SDK 编辑交互
order: 6
group:
  title: visualization
---

# WOL SDK：选择、修改、拖拽、缩放、旋转

## 这一步完成什么

在 `@yt/wol` 中实现了编辑交互的最小集合：

- `select`：点击选中要素；
- `modify`：拖动顶点修改线/面；
- `translate`：整体拖拽要素；
- `scale`：围绕几何中心缩放；
- `rotate`：围绕几何中心旋转。

选择、修改顶点、拖拽使用 OpenLayers 原生 Interaction；缩放和旋转是 WOL 自己的最小 Pointer 变换交互，没有引入 `ol-ext`。

## HG2DMap 源码对应关系

| HG2DMap 源码 | 行号 | 对应 WOL 能力 |
| --- | --- | --- |
| `draw.ts Select` | 97 | `enableEdit("select")` |
| `draw.ts Modify` | 111 | `enableEdit("modify")` |
| `draw.ts Translate` | 128 | `enableEdit("translate")` |
| `draw.ts DragRotate` | 146 | `enableEdit("rotate")` |
| `interaction/select.ts` | 全部 | 原生 Select 封装 |
| `interaction/modify.ts` | 全部 | 原生 Modify 封装 |
| `interaction/translate.ts` | 全部 | 原生 Translate 封装 |
| `interaction/transform.ts` | 全部 | 自定义 Scale/Rotate |
| `map.ts getSelectedFeatures` | 1643 | `getSelectedFeatures()` |
| `map.ts setModifyInteractionActive` | 1654 | `enableEdit("modify")` |
| `map.ts setTranslateInteractionActive` | 1660 | `enableEdit("translate")` |
| `map.ts setScaleInteractionActive` | 1667 | `enableEdit("scale")` |
| `map.ts setRotateInteractionActive` | 1672 | `enableEdit("rotate")` |

## 核心思路：一个已选集合，多个编辑工具

HG2DMap 和 WOL 都遵循同一个模式：

1. 用一个 `Collection<Feature>` 保存当前选中的要素；
2. `Select` Interaction 负责把点击到的 Feature 放进集合；
3. `Modify/Translate/Transform` 只操作这个集合里的要素。

WOL 的 `enableEdit(mode)` 每次会重新创建一组 Interaction：

```ts
const result = initMap({ target: "map" });

result.enableEdit("modify");
result.enableEdit("scale");
result.disableEdit();

const selected = result.getSelectedFeatures();
```

同一时间只保留一个编辑模式，重复调用 `enableEdit` 会先移除旧交互。

## 为什么缩放/旋转不用 ol-ext

HG2DMap 的 `transform.ts` 使用 `ol-ext/interaction/Transform` 实现缩放和旋转。

WOL 第一步选择自己实现最小版本：

- 拖拽开始前克隆选中几何体；
- 拖拽时围绕几何中心计算角度/缩放比例；
- 逐顶点重算线/面坐标，圆只缩放半径；
- 拖拽结束后清空快照。

这样不引入额外依赖，也更容易理解几何变换的本质。

## 页面用法

`WolShowcase` 新增“编辑交互”区域：

- 点击“选择/修改顶点/拖拽/缩放/旋转”进入对应模式；
- 右侧显示当前编辑模式；
- 点击“结束编辑”恢复普通地图拖拽；
- 开启绘制时会自动关闭编辑，开启编辑时页面会先关闭绘制。

## 涉及文件

- WOL SDK 编辑交互：`E:\workspace\web\tauri-demo\packages\wol\core\edit.ts`
- WOL SDK 地图入口：`E:\workspace\web\tauri-demo\packages\wol\core\map.ts`
- 页面展示：`E:\workspace\web\tauri-demo\src\pages\WolShowcase\index.tsx`
- 目标库源码：`E:\workspace\web\HG2DMap\src\interaction\`

## 验证结果

- `pnpm build` 通过；
- `pnpm --filter @yt/wol build` 通过；
- 选择、修改顶点、拖拽、缩放、旋转已接入页面。

## 编辑流程线性拆解

编辑交互可以理解成一条固定的数据流：

```txt
点击按钮
  → enableEdit(mode)
  → createEditInteractions 创建“编辑池”
  → Select 命中检测，把 Feature 加入编辑池
  → Translate/Modify/Transform 消费编辑池
  → 结束编辑，清空编辑池
```

下面以“拖拽”为例，把每一步对应到代码。

### 1. 用户点击“拖拽”按钮

页面调用：

```ts
result.enableEdit("translate");
```

这一步在 `packages/wol/core/map.ts` 的 `enableEdit` 中完成（约第 1082 行）。

### 2. SDK 创建“编辑池”

`createEditInteractions` 首先创建一个 `Collection<Feature>`，它就是编辑池：

```ts
const selectedFeatures = new Collection<Feature>();
```

然后创建两类 Interaction：

```ts
const select = new Select({
  features: selectedFeatures,
  layers: [layer],
  style: null,
});

const translate = new Translate({
  features: selectedFeatures,
});
```

对应的代码在 `packages/wol/core/edit.ts` 的 `createEditInteractions`（约第 186 行）。

### 3. Select 收集要素

用户点击地图上的某个 Feature 时，`Select` 内部会执行“命中检测”：

```ts
map.forEachFeatureAtPixel(pixel, (candidate) => {
  return candidate;
});
```

命中后，OpenLayers 会调用 `selectedFeatures.add(feature)`，把 Feature 放进编辑池。

所以“选中”不是业务代码手动记录变量，而是：

```txt
点击坐标 → forEachFeatureAtPixel 找到 Feature → Collection.add 加入编辑池
```

### 4. Translate 消费编辑池

`Translate` 会监听编辑池里的 Feature。用户按下鼠标时，它记住开始坐标：

```txt
pointerdown → 记录 startCoordinate → 开始拖拽
```

拖拽过程中：

```txt
pointermove → 计算当前坐标和开始坐标的位移 (dx, dy)
          → 对编辑池里的每个 Feature 执行 geometry.translate(dx, dy)
          → 地图自动重绘
```

松开鼠标时：

```txt
pointerup → 触发 translateend → 本次拖拽结束
```

### 5. Modify 的流程类似

`Modify` 也是先依赖 `Select` 把 Feature 加入编辑池，然后做两件事：

1. 监听编辑池变化，为线/面生成“顶点段数据”；
2. 用户拖拽顶点时，根据鼠标位移更新对应顶点坐标。

```txt
Select 加入编辑池 → Modify 建立顶点段 → 拖拽顶点 → 更新坐标
```

### 6. Scale/Rotate 多了一步快照

WOL 自己的 `WOLTransformInteraction` 在拖拽前会保存几何快照：

```ts
this.snapshots.set(feature, geometry.clone());
```

之后每次拖拽都基于快照重新计算，而不是在已经变形的几何上继续叠加：

```txt
pointerdown → 保存几何快照 + 计算中心/角度/距离
pointermove → 用快照坐标重新计算旋转/缩放
pointerup   → 清空快照
```

这样做可以保证每次拖拽都从“原始形状”开始变换，不会因为多次拖拽累积误差。

## 一句话总结

编辑交互的线性关系是：

```txt
按钮 → enableEdit → 创建编辑池(Collection) → Select 用命中检测收集 Feature
→ Translate/Modify/Transform 读取编辑池并更新 Geometry → 结束清理
```

对应的三个关键 API：

- `forEachFeatureAtPixel`：找到鼠标点到的 Feature；
- `Collection.add`：把 Feature 放入编辑池；
- `geometry.translate / setCoordinates / setRadius`：真正修改几何数据。

## 页面怎么操作

`WolShowcase` 的“编辑交互”区域会显示当前模式和已选数量，下面按顺序说明每个模式。

### 选择

1. 点击“选择”按钮；
2. 点击地图上的要素；
3. 选中后要素会出现蓝色高亮，右侧“已选 N 个”会更新；
4. 点击空白区域可以取消选择。

### 修改顶点

1. 点击“修改顶点”按钮；
2. 点击要修改的线或面，先把它选中；
3. 线/面上会出现可拖拽的顶点手柄；
4. 按住某个顶点拖动，几何体会实时变化；
5. 松开鼠标完成本次修改。

### 拖拽

1. 点击“拖拽”按钮；
2. 点击要移动的要素，把它选中；
3. 鼠标放到选中要素上会变成小手；
4. 按住要素拖动到新位置；
5. 松开鼠标完成移动。

### 缩放

1. 点击“缩放”按钮；
2. 不需要先单独选中，直接按住要素拖动；
3. 向远离几何中心的方向拖动是放大；
4. 向靠近几何中心的方向拖动是缩小；
5. 松开鼠标完成缩放。

### 旋转

1. 点击“旋转”按钮；
2. 不需要先单独选中，直接按住要素拖动；
3. 围绕几何中心改变鼠标角度，要素会跟着旋转；
4. 松开鼠标完成旋转。

缩放和旋转支持“按下即用”，是因为 `WOLTransformInteraction` 在 `pointerdown` 时会先用 `forEachFeatureAtPixel` 找到要素并加入编辑池，再立即开始变换。
