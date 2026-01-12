## 快速上手GOJS

**GoJS**是一个用于实现交互式图表的JavaScript库。

### 每个 GoJS 图形实例都需要一个 HTML 容器 并明确指定其大小：`div`

```html
<!-- 图形的容器 div 需要明确指定大小，否则无法显示，本例子中我们还给该 DIV 添加了一个背景颜色，可以很方便的查看其大小。 -->
<div id="myDiagramDiv"
  style="width:400px; height:150px; background-color: #DAE4E4;"></div>
```

### 在 JS 代码中，需要将 的 作为参数来创建图形。`id`

```js
var $ = go.GraphObject.make;
var diagram =
    $(go.Diagram, "myDiagramDiv",
        {
            "undoManager.isEnabled": false // enable Ctrl-Z to undo and Ctrl-Y to redo
        });
```

### 栗子

```js
var $ = go.GraphObject.make;
var diagram =
    $(go.Diagram, "myDiagramDiv",
        {
            "undoManager.isEnabled": false, // 启用Ctrl-Z撤销和Ctrl-Y重做
            layout: $(go.TreeLayout, // 指定一个图表。排列树的布局
                { angle: 90, layerSpacing: 35 }), // angle 获取或设置树生长的默认方向。 layerSpacing 获取或设置父节点与其子节点之间的距离。
        });
// 节点模板
diagram.nodeTemplate =
    $(go.Node, "Vertical",
        $(go.Shape,
            {
                // figure: "RoundedRectangle",//形状
                figure: "Circle",
                // fill: "white",
                width: 40,
            },  // default Shape.fill value
            new go.Binding("fill", "color")),  // binding to get fill from nodedata.color
        $(go.TextBlock,
            // { margin:0 },
            new go.Binding("text", "key"))  // binding to get TextBlock.text from nodedata.key
    );
//连线模板
diagram.linkTemplate =
    $(go.Link,
        { routing: go.Link.Orthogonal, corner: 500},// corner拐角圆度 ，routing获取或设置链接的路径是否尝试避开其他节点。该值必须是 Normal, Orthogonal, or AvoidsNodes.。
        $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape
var nodeDataArray = [
    { key: "Alpha", color: "lightblue" },  // note extra property for each node data: color
    { key: "Beta", color: "pink" },
    { key: "Beta2", color: "pink" },
];
var linkDataArray = [
    { from: "Alpha", to: "Beta" },
    { from: "Alpha", to: "Beta2" }
];
diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
```



## 图形和模型



## 布局



## 连线模板

