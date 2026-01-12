# CSS指南

## 什么是css

**层叠样式表**（Cascading Style Sheets，缩写为 **CSS**）是一种[样式表](https://developer.mozilla.org/zh-CN/docs/Web/API/StyleSheet)语言，用来描述 [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 或 [XML](https://developer.mozilla.org/zh-CN/docs/Web/XML/Guides/XML_introduction)（包括如 [SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG)、[MathML](https://developer.mozilla.org/zh-CN/docs/Web/MathML) 或 [XHTML](https://developer.mozilla.org/zh-CN/docs/Glossary/XHTML) 之类的 XML 分支语言）文档的呈现方式。CSS 描述了在屏幕、纸质、音频等其他媒体上的元素应该如何被渲染的问题。

# CSS基础

## 样式的来源

注意：所有的html标签默认是没有样式

### 浏览器默认的样式

- 所有的html标签默认没有样式，但是a、h标签等默认是浏览器添加的样式

### 浏览器用户自定义的样式

- 用户可以在浏览器中更改标签默认的样式

### 内联样式

-  在标签上添加style属性，在属性值中书写css样式代码 
-  语法： 

```CSS
<p style="css属性1：css属性值1; css属性2：css属性值2；">

</p>
```

-  好处： 哪里需要样式写在哪儿 
-  缺点： 多个元素有相同的样式时，需要重复书写 

### 内部样式

-  在head标签中添加style标签，再通过选择器来书写css样式代码 
-  语法： 

```CSS
<head>
<style>
选择器{
  css属性1：css属性值1；
  css属性2：css属性值2；
}
</style>
</head>
```

-  好处 
  - 结构和样式分离
  - 结构清晰，利于后期代码维护
  - 可以批量设置选中的标签样式
-  缺点： 
  - 结构和样式未完全分离，目前还在一个文件中

### 外部样式

-  先创建一个后缀名为 .css文件，再里面通过选择器书写css样式代码，再在head标签中通过link标签引入css样式文件 
-  语法： 

```CSS
<head>
<link rel="stylesheet" href="连接css样式文件">
</head>
```

-  好处： 
  - 样式和结构代码完全分离
  - 以后维护代码，可以一处处处改
  - 以后我们可以将外部css文件进行压缩，减少文件体积
-  注意：优先级（权重大小）：内联权重最大，相同选择器，内部和外部采用就近原则，离标签越近的优先作用 

## 选择器

相同选择器，后面的样式会盖住前面的样式

### 标签选择器

-  通过标签名找到指定的标签，没有指定范围，找到页面中所有的满足条件的标签 
-  语法： 

```CSS
标签名{
    css属性1：css属性值1；
    css属性2：css属性值2;
}
```

### 类选择器

-  又称为class选择器，通过标签上的class名找到满足条件的标签，多个标签可以共享一个class名，提取公共样式 
-  语法： 

```CSS
.class名{
    css属性1：css属性值1；
    css属性2：css属性值2;
}
```

-  注意： 
  -  标签上可以作用多个class名，中间使用空格隔开 
  -  如果选择器多个组合在一起，中间没有空格，代表并且的意思 

```CSS
找到页面中class名中即有op又有oa的标签
.op.oa{
    css样式代码
}
```

### id选择器

-  id是标签上定义的属性，id唯一，找到页面中唯一的一个标签，精准定位。 
-  通过标签上的id名找到满足条件的标签 
-  id命名规则： 
  - 以数字、字母、-和_构成
  - 不能以数字开头
  - 不能包含特殊符号
-  语法： 

```CSS
#id名{
    css样式代码
}
```

-  注意：id是唯一，以后通过js会操作标签上id名，id选择器慎用。 

###  伪类选择器 

-  根据用户鼠标的行为来改变标签的样式 
-  分类 
  - `a:link`:超链接专属，页面一打开超链接就有的样式，旧属性
  - `a:visited`:超链接专属,超链接被访问之后的样式，
  - `:hover`:鼠标悬停到标签上时标签使用的样式
  - `:active`:鼠标点击标签不释放时使用的样式
  - `:focus`:当标签获取鼠标焦点时使用的样式。比如点击输入框

### 伪元素选择器

```JavaScript
:before  伪元素被插入到与选择器匹配的元素内容之前或之后
:after

.icon-qrCode .show-qrCode-box::before{
    content: "";
    border: 5px solid transparent;
    border-bottom-color: #c02222;
    display: block;
    position: absolute;
    top: 16px;
    left: 10px;
}
```

![img](https://pv8byfah6sh.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTAwMmQyZGE2ZDdiZmRhYTQ3ZGJhZTQxZGVlY2RmZGNfazBZYTgwWmNyQjdEUFJHOHlpYWs5bk96UzR6c3BLV3hfVG9rZW46QzVpU2JiOWM2b3FDdXZ4aGc5TGNxWml5bjZvXzE3NTc0MDEyNTM6MTc1NzQwNDg1M19WNA)

注意：

before和after里面必须搭配conten使用

content：可以是文本，也可以是图片

before和after是行内标签，无法作用宽高设置，需要转换为块级或者行内块设置

before和after渲染的是标签中的子元素

没有 :nth-first-child()

```JavaScript
所有元素中选择
:first-child   第一个子元素
:last-child    最后一个子元素
:nth-child()   选中第n个元素
:nth-last-child()

关于:nth-child()的特殊值
        n   第n个   n的范围0到正无穷（全选）
        even或2n    选中偶数位的元素
        odd或2n+1   选中奇数位得到元素

下面都是在相同元素中选择
:first-of-type  第一个子元素
:last-of-type   最后一个子元素
:nth-of-type()    选中第n个元素
```

实例

```JavaScript
:nth-child和:nth-of-type都是找对应元素父元素内子元素
比如
th:nth-child(1){
  width: 50px;
}
 th:nth-of-type(1){
     width: 50px;
}
都是作用在th上的样式
亦可
tr :nth-child(1){
  width: 50px;
}
tr :nth-of-type(1){
     width: 50px;
}

偶数行表格的下划线样式更改，这个样式是作用在{}左边的第一个选择器
tr:nth-of-type(2n) td{
      border-bottom: 2px dashed red;
  }
```

### 超链接

-  给a标签添加样式 
-  语法： 

```CSS
/* 向未被访问过的超链接添加样式 */
a:link {
   css代码样式代码
}

/* 向访问过的超链接添加样式 */
a:visited {
    css代码样式代码
}


/* 鼠标移入超链接时添加到样式 */
/* :hover 必须放在:link和:visited之后 */
a:hover {
    css代码样式代码
}

/* 鼠标点击不放时添加的样式 */
/* :active必须放在:hover之后 */
a:active {
   css代码样式代码
}
```

-  注意：`:hover`必须放在`:link`和`:visited`之后，`:active`必须放在`:hover`之后，顺序：L-V-H-A 

```CSS
a:link{
    css属性名1: 属性值1;
}
a:visited{
    css属性名1: 属性值1;
}
非伪类选择器:hover{
    css属性名1: 属性值1;
}
非伪类选择器:active{
    css属性名1: 属性值1;
}
非伪类选择器:focus{
    css属性名1: 属性值1;
}
```

### 组合选择器

### 后代选择器 

- 中间使用空格隔开
- 找到某个标签里面的所有的后代，会找到儿子、孙子等等

```CSS
找到class名为box的标签里面的所有后代p标签
.box  p{
    
}
```

### 子元素选择器

- 中间使用>隔开，只找儿子不找孙子

```CSS
找到class名为box的标签里面的所有子代p标签
.box >p{
    
}
```

### 兄弟选择器

- 中间使用+隔开，找后第一个兄弟元素

```CSS
找到class名为box的标签的所有兄弟p标签
.box +p{
    
}
```

### 后续兄弟选择器

- 中间使用~隔开，找后所有兄弟元素

```CSS
找到class名为box的标签后方的兄弟p标签
.box ~p{
    
}
```

### 并集选择器

```JavaScript
逗号隔开
p,.calss{
  
}
```

### 交集选择器，同时包含触发

```JavaScript
中间不含任何字符
p标签且calss1以及class2的才触发
p.calss1.class2{
  
}
```

### 属性选择器

- E[attr=value]

```JavaScript
选择所有p标签class属性值为color-blue的元素
p[class='color-blue']{
    font-size: 30px;
}
```

- E[attr^=value]

```JavaScript
选择所有p标签class以co字符串开头的元素
p[class^='co']{
    font-size: 30px;
}
```

- E[attr$=value]

```JavaScript
选择所有p标签class以co字符串结束的元素
p[class$='co']{
    font-size: 30px;
}
```

- E[attr~=value]

```JavaScript
选择所有p标签class有color属性值的元素,空格隔开
p[class^='color']{
    font-size: 30px;
}
比如 <p class="color blue"></p>
```

- E[attr|=value]

```JavaScript
选择所有p标签class以co字符串属性值，以 - 隔开的
p[class$='co']{
    font-size: 30px;
}
比如 <p class="co-blue"></p>
```

- E[attr*=value]

```JavaScript
选择所有p标签class以co字符串属性值模糊匹配
p[class*='co']{
    font-size: 30px;
}
比如 <p class="bluecoclor"></p>
```

### 优先级

- 相同选择器，内联样式权重最大，内部样式和外部样式采用就近原则
- 相同的选择器同时作用在一个标签上，后面的样式会盖住前面的样式
- 选择器权重（优先级）：id选择器>类选择器>标签选择器

## 背景样式

-  `background-color`:设置背景颜色 
  - 单词
  - \#十六进制
  - rgb(0~255,(,)0~255,0~255,0~1) 第四个参数位透明度 0表示完全透明 亦可用 opacity
-  `background-image`：设置背景图片 

```CSS
background-image:url(连接背景图片的文件路径);
```

- 背景图片默认从盒子左上角开始铺设，如果铺不满，默认重复铺设
- 注意：如果背景颜色和背景图片同时存在，图片盖住背景颜色
-  `background-repeat`:设置背景图片是否平铺 
  - `repeat`:默认值，x轴和y轴都平铺
  - `repeat-x`:x轴方向上进行平铺
  - `repeat-y`：y轴方向上进行平铺
  - `no-repeat`:不平铺
  - 应用：可以实现1px渐变背景平铺，减少图片的体积，从而优化网页
-  `background-position`:设置背景图片的显示位置 
  - x轴   y轴：  这个是坐标，定位起点，想象坐标轴
    - 单词：left  right   center   top 上  bottom 下  两两搭配使用
    - 固定像素：默认左上角 0px 0px
    - 百分比：50%  50% 相当于center center
-  `background-size`:设置背景图片的大小，css3提出 
  - `contain`:一边铺满，另一边不管
  - `cover`:两边都铺满，超出部分隐藏
  - `x轴 y轴`：宽度  高度   
    - 同时设置两个值，背景图片可能变形，只设置一个值，代表图片的宽度
    - %号 为父盒子长宽 50% 50% 表示父盒子的一半长宽
-  `background-attachment`:设置背景图片是否固定（css3） 
  - `scroll`:默认值，图片会随着滚动条滚动
  - `fixed`:背景图片固定在页面上
-  `backgroud`:复合属性 

```CSS
 background: pink url(img/img-3.jpg) no-repeat 50% 50% /100px 100px fixed;
```

- /前面代表图片显示位置，/后面是背景图片的大小

## 文本样式

- `color`:设置文本的颜色
- `text-align`：设置文本的对齐方式 
  - left：左对齐
  - center：居中
  - right：右对齐
  - 注意：可以控制标签中文本在水平方向的对齐方式，对行级标签同样有效
- `line-height`:设置文本的行高 
  - 像素
  - 百分比和数字：是参考字体的大小，相当于字体的倍数
  - 注意： 
    - 一行里面的文本在垂直方向上居中
    - 针对**单行文本**水平垂直居中，可以设置text-align:center;  line-height等于盒子的高度
- `text-decoration`:设置文本修饰 
  - `none`:无
  - `underline`:下划线
  - `line-through`:中划线，删除线
  - `overline`:上划线
- `letter-spacing`:设置字符间距，一个中文就是一个字符，一个英文字母就是一个字符
- `word-spacing`:设置字间距，以文本中空格来区分，一般对英文使用。
- `text-indent`:设置首行缩进
- `text-transform`:设置英文字母的大小写 
  - none：无
  - capitalize：首字母大写
  - uppercase:全大写
  - lowercase: 全小写

## 字体样式

### font-family

-  设置字体的类型，每种系统默认指代的字体不一致。 
-  语法： 

```CSS
font-family:"宋体"；
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
```

-  注意： 
  - 如果设置多种字体，中间使用逗号隔开，先从系统中找第一种字体，如果有则使用，如果没有则找第二种字体，依次类推，最终找到最后一种字体serif，serif代表通用字体
  - 如果字体名为中文或者多个单词，需要使用引号包裹，可以是单引号，可以是双引号
  - 多种字体的风格一般类似

### font-size

-  设置字体的大小 ，字号 
-  语法： 

```CSS
font-size:大小；
```

- 数字越大，字号越大

### font-weight

- 设置字体的加粗效果
- 取值： 
  - 100~900：数字越大，加粗效果越好，不能带单位
  - normal：正常
  - lighter：更细
  - bold：加粗
  - bolder：更粗

### font-style

- 设置字体的风格
- 取值： 
  - narmal：正常
  - italic：斜体
  - oblique：倾斜

### 字体引用技术

-  将字体文件引入到代码，方便代码渲染时以字体文件的字体渲染，目的就是为了不同的系统都能正常显示 
-  语法： 

```CSS
@font-face{
    font-family：字体名称；
    src:url(字体文件格式1的文件路径) format()，url(字体文件格式2的文件路径);
}
```

-  注意： 
  - 需要将字体文件一起放在项目中
  - 为了不同浏览器的都能正常渲染，可以引入多种字体格式的文件，之间使用逗号隔开。

### 字体图标

- 字体是以图标的形式显示，设计师在设计字体的时候，字体形状就是图标
- 字体的相关样式都可以作用在字体图标
- fontawesone 官网：https://fontawesome.dashgame.com/
- 页面中引入字体图标的css文件，通过不同的class名作用不同的图标或者样式

## 列表样式

- 可以更改列表项标志的样式
- `list-style-type`：设置列表项标志类型 
  - `none`:无
- `list-style-position`：设置列表项标志的显示位置 
  - `outside`:将标志放在li标签内容区域以外
  - `inside`:将标志放在li标签内容区域里面
- `list-style-image`:将图片作为列表项标志，不常用，无法通过css控制图片的大小，只能更改图片文件本身大小，不如在li里面包含一个img标签
- `list-style`：复合属性 list-style-type|list-style-image|list-style-position 
  - `none`:无

## 表格样式

- 更改表格的样式
- `border-spacing`:设置单元格之间的间距
- `border-collapse`:设置表格的边框合并为一 

## link和@import  

这两种方式都可以引入css文件，本质上linl为整个网页服务，@import是css服务

### link

-  语法： 

```HTML
 <link rel="stylesheet" href="css文件路径">
```

### @import  

-  语法： 

```HTML
<style>
    /* 通过css语法引入css文件 */
    @import url(css文件路径);
</style>
```

### 区别

1.  link是一种标签，@import是一种语法 
2.  link不仅仅可以引入css文件，还可以引入其他文件格式，@import只能引入css文件 
3.  加载时间：link是随着页面的加载而加载，@import等页面加载完成之后再加载 
4.  兼容问题：link的兼容比@import好 
5.  link可以被js控制，@import不能被js控制 

# 进阶

## 浮动

### 块级元素同行显示

1. display：inline-block； 中间存在5px的间距，存在兼容问题
2. 浮动

### 浮动

-  可以让元素同行显示，排列不下自动换行 
-  语法： 

```CSS
float:left | right |none;
```

- left :左浮动
- right：右浮动
- none：不浮动，默认值
-  特点： 
  - 浮动元素可以同行显示，排列不下会自动换行，不存在兼容问题
  - 浮动元素会脱离文档流，在标准文档流之上
  - 原来的空间不存在，后续标准文档流元素会使用此空间
  - 行内元素设置浮动后，支持宽高
  - 浮动元素不会影响前面标准文档流元素的排列，但是会影响后面标准文档流元素的排列。并且浮动元素显示在标准文档流的上方
-  注意： 
  - 只有设置了浮动的元素，才可以同行显示
  - 多个元素同时浮动，第一个浮动元素找父盒子的边界，后面的浮动元素找前面浮动元素的边界
  - 块级元素设置浮动后，如果不设置width，默认是auto，宽度是由内容决定

### 标准文档流

- 概念：在页面布局过程中，元素按照从左到右，从上到下，块级元素独占一行，行级元素共享一行的排列规范

### 脱离文档流

- 概念：在页面布局过程中，元素不再遵循标准文档流，按照自己的排列规范来排列

### 浮动对非浮动的影响

-  非浮动元素会占用浮动元素原来的位置 
-  非浮动元素里面的文本会被浮动元素挤出来 
  -  实现图文混排 

```HTML
<style>
    img{
        float: left;
        width: 60px;
    }
</style>

<img src="img/img-8.jpg" alt="">
<p>
    特点： 浮动元素可以同行显示，排列不下会自动换行，不存在兼容问题 浮动元素会脱离文档流，在标准文档流之上原来的空间不存在行内元素设置浮动后，支持宽高注意：只有设置了浮动的元素，才可以同行显示多个元素同时浮动，第一个浮动元素找父盒子的边界，后面的浮动元素找前面浮动元素的边界块级元素设置浮动后，如果不设置width，默认是auto，宽度是由内容决定
</p>
```

-  子元素浮动，父元素高度塌陷 

### 清除浮动

-  通过clear属性来清除浮动，清除浮动元素对非浮动元素的影响 ，写在受影响的元素身上
-  语法： 

```CSS
clear：left | right |both；
```

- left：清除左浮动的影响
- right：清除右浮动的影响
- both：清除左浮动和右浮动的影响

### 清除浮动的方法

1.  给受影响的元素添加 clear属性 
2.  使用` `进浮动元素和非浮动元素隔开 
3.  使用空白的div添加clear样式将浮动元素和非浮动元素隔开 

```HTML
<div style="clear:both;"> </div>
```

1.  给父元素添加伪元素选择器来清除浮动（推荐使用） 

```CSS
.clearfix::after{
    content: "";
    clear: both;
    display: block;
}
```

注意：overflow：hidden可以解决子元素浮动，父元素高度塌陷的问题，是取消浮动的影响，借助BFC容器的特点，这个容器里面的浮动元素会参与父盒子的高度计算。

## 定位

### 如何让盒子移动到指定的位置

1.  margin赋值，破坏文档流进行移动 
   1.  标准文档流：在页面布局过程中，元素从上到下，从左到右，块级元素独占一行，行级元素共享一行的排列规范 
   2.  破坏文档流：在页面布局过程中，元素在移动过程中不遵循标准文档流的规范，移动完成之后仍然在标准文档流中 
   3.  脱离文档流：在页面布局过程中，元素不再遵循标准文档流的规范，有自己的排列规范 

应用场景：头部内容和banner重叠部分 

1.  定位：让元素移动到指定的位置 

### 静态定位

-  概念：默认每个标签都是静态定位  

```CSS
position: static;
```

### 相对定位

-  概念：元素参考原来的的位置，按照指定的方向进行移动 

```CSS
position:relative;
```

- top:元素距离参考位置的上边缘的间距
- bottom:元素距离参考位置下边缘的间距
- left:元素距离参考位置左边缘的间距
- right:元素距离参考位置右边缘的间距
-  特点： 
  - 设置相对定位的元素会破坏文档流进行移动
  - 只设置相对定位，元素不会有变化，一旦设置偏移量，破坏文档流参考元素原来的位置进行移动
  - 原来的空间还占用，后面的盒子仍然以标准流的方式对待它
-  注意： 
  - 子元素设置相对定位，父元素进行移动时，子元素跟着移动，原因在于子元素原来的位置进行了移动，相对定位的元素是参考元素原来的位置进行移动，所以跟着移动
  - 一般配合绝对定位一起使用

### 绝对定位

-  元素会脱离文档流，按照指定的位置进行移动 
-  语法： 

```CSS
position:absolute;
```

- top:元素距离参考位置的上边缘的间距
- bottom:元素距离参考位置下边缘的间距
- left:元素距离参考位置左边缘的间距
- right:元素距离参考位置右边缘的间距
-  特点： 
  - 设置绝对定位的元素会脱离文档流
  - 只设置绝对定位，元素是在当前位置脱离文档流，一旦设置了偏移量，如果设置了定位父级，参考最近的定位父级进行移动， 如果父级都没有定位，则以浏览器文档为准移动位置，static 静态定位不算定位
  - 原来的空间不再占用
-  注意： 
  - 行内元素设置绝对定位后，元素支持宽高
- 重点
  - 定位口诀 —— 子绝父相

绝对定位，要和带有定位的父级搭配使用，那么父级要用什么定位呢？

子绝父相 —— 子级是绝对定位，父级要用相对定位。

分析：

方向箭头叠加在其他图片上方，应该使用绝对定位，因为绝对定位完全脱标，完全不占位置。

父级盒子应该使用相对定位，因为相对定位不脱标，后续盒子仍然以标准流的方式对待它。

如果父级盒子也使用绝对定位，会完全脱标，那么下方的广告盒子会上移，这显然不是我们想要的。

结论：父级要占有位置，子级要任意摆放，这就是子绝父相的由来。

### 定位父级

- 结构父级：子元素在html代码中结构上的父标签
- 定位父级：设置的绝对定位的元素进行移动时的参考位置，默认按照整个文档进行移动，一旦父元素设置相对定位、绝对定位、固定定位后，参考最近的定位父级进行移动
- 注意： 
  - 定位父级可以使用相对定位、绝对定位、固定定位，一般使用相对定位（子绝父相）
  - 如果设置了多个定位父级，参考最近的定位父级进行移动

### 固定定位

-  元素会脱离文档流，按照指定的位置进行移动，会固定在页面上，不会随着滚动条滚动 

```CSS
position:fixed;
```

- top:元素距离参考位置的上边缘的间距
- bottom:元素距离参考位置下边缘的间距
- left:元素距离参考位置左边缘的间距
- right:元素距离参考位置右边缘的间距
-  特点： 
  - 固定定位的元素会脱离文档流，在标准文档流之上
  - 会固定在页面上，不会随着滚动条滚动
  - 只设置固定定位，当前位置脱离固定在页面上，如果设置了偏移量，参考整个文档进行移动，固定在页面上
  - 原来的空间不再占用
-  应用场景：头部导航固定、小广告、登录弹出框等等 

### 粘性定位  sticky

- 以浏览器的可视窗口为参照点移动元素（固定定位特点）
- 粘性定位占有原先的位置（相对定位特点）
- 必须添加 top 、left、right、bottom 其中一个才有效
- 有吸附效果

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .wrap {
            height: 1000px;
            width: 100%;
            background-color: skyblue;
            margin-top: 1000px;
        }

        .box1 {
            width: 80%;
            height: 100px;
            background-color: teal;
            margin: 0 auto;
        }

        .box2 {
            width: 200px;
            height: 600px;
            background-color: pink;

            top: 0;

            margin: 0 auto;
        }

        .sticky {
            position: sticky;
            bottom: 100px;
        }
    </style>
</head>

<body>
    <div class="wrap">
        <div class="box1"></div>
        <div class="box2 "></div>
        <div class="box1 sticky"></div>
    </div>

</body>

</html>
```

### 定位层级

-  概念：设置的元素定位层级，只针对相对定位、绝对定位，固定定位有效。

```CSS
z-index: 数字；
```

- auto：默认值，相当于0，标准文档流里面的元素相当于0
- 数字：设置堆叠顺序
-  注意： 
  - 数字越大，定位层级越高，数字相同时，按照代码结构后面定位的元素显示在前面定位元素的上方

### 补充

相对定位、绝对定位，固定定位定位层级相同时下方盒子会盖住上方盒子，右方盒子会盖住左方盒子。

## 盒模型

### 标准盒模型

- width和height属性表示conten的长宽

![img](https://pv8byfah6sh.feishu.cn/space/api/box/stream/download/asynccode/?code=NjZiNzJiNzU1OTIzY2Q4ZDIxMzMxZDNhMjcwMmY1MTdfbjlEYk5OcHRET1JJUFhUM2xNV3NBUDdCdURibGxBeFFfVG9rZW46V0JlY2JlQzdFb212enV4SWtZaWNDc0g2bkRyXzE3NTc0MDEyNTQ6MTc1NzQwNDg1NF9WNA)

上面就是一个标准盒模型：

1.  content:代表内容区域，存放内容，文本或者里面图片等等 
2.  padding：内边距，盒子内部的空间，内容与边框之间的间距，相当于快递中的泡沫 
3.  border：盒子的边框，四周边框可以分别设置。 
4.  margin：代表外边距，盒子和盒子之间的间距（父子关系，兄弟关系） 

### 边框border

-  给盒子添加边框 
-  语法: 

```CSS
设置单独一条边框的样式
border-方位-width: 宽度;
border-方位-style: 类型；
border-方位-color: 颜色；

复合属性：
设置一条边框的样式
border-方位: 宽度   类型   颜色;

同时设置四条边框的 样式
border:  宽度   类型   颜色；
```

 

- 类型：solid 实线   dashed 虚线   dotted 点线  double双边线
-  注意： 
  - 边框必须设置知识两个值：宽度和类型，默认显示是黑色
  - 边框可以撑大盒子
  - 边框渲染原理：只设置一条边框时，显示为矩形，如果设置相邻的边，相接部分是沿着对角线均分
  - 通过边框可以绘制三角形，设置三边透明，一边不透明 
    - transparent：设置透明的颜色
    - 步骤： 
      - 设置一个width：0px的盒子
      - 分别设置三边透明，一边不透明

### 内边距padding

-  设置盒子中内容到边框的距离 
-  语法： 

```CSS
分别设置每个方向的内边距
padding-top：大小；
padding-left
padding-right
padding-bottom

复合属性
padding
设置一个值：上下左右
设置两个值：上下   左右
设置三个值：上   左右   下
设置四个值：上    右   下   左
```

-  注意：padding会撑大盒子，背景颜色会铺设padding区域 
-  应用场景：可以作为导航左右间距 

### 外边距margin

-  盒子与盒子之间距离，外边距 
-  语法： 

```CSS
分别设置每个方向的内边距
margin-top：大小；
margin-left
margin-right
margin-bottom

复合属性
margin
设置一个值：上下左右
设置两个值：上下   左右
设置三个值：上   左右   下
设置四个值：上    右   下   左
```

#### margin重叠性

- 盒子和盒子之间是兄弟关系，margin在垂直方向会发生重叠，以其中最大的值为准
- 注意：margin在水平方向是叠加的

#### margin-top传递性

- 盒子和盒子之间是父子关系，子元素设置margin-top会传递给父元素
- 原因：子元素设置margin-top后找不到父元素的边界，就传递给了父元素
- 解决方案： 
  - 给父元素设置border：1px solid transparent；会更改盒子的大小
  - 给父元素设置padding，也会改变盒子的大小
  - 给父元素设置overflow：hidden；借助BFC容器的特点，容器里面的元素如何排列不会影响容器外面的元素。

### 标准盒子的大小的计算

css中设置的width和height分别代表内容区域（content）的大小

标准盒子真正的大小的计算：

- 宽度= content(width)+ padding  *2（左右）+ border*  2(左右)
- 高度=content（height）+ padding  *2(上下) + border*  2（上下）

标准盒子所占空间的大小计算：

- 宽度= content(width)+ padding  *2（左右）+ border*  2(左右) + margin * 2（左右）
- 高度=content（height）+ padding  *2(上下) + border*  2（上下）+ margin * 2（上下）

### 怪异盒模型(IE盒模型)

-  使用 box-sizing:border-box;来转化
- width和height属性包含 content、padding、border
- 一般用于解决固定布局之后调整padding、border后的界面变形

![img](https://pv8byfah6sh.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjcxNDcyODU2NGU1OGY2YzdiMTBiMzM3ZWE1MTljMGNfbnZaWWpLNnF6OUtkNDExSUFGTGs4WHpnME15N1kwcllfVG9rZW46RDZXUGJTSDdwb0tTOTR4dEVlR2NOOHhBblBnXzE3NTc0MDEyNTQ6MTc1NzQwNDg1NF9WNA)

## 雪碧图的使用

#### 步骤

1. 将盒子宽高设置成要显示的图片的大小
2. 使用background-image将雪碧图作为背景图片引入盒子
3. 使用background-position调整背景图片显示位置
   1. 水平方向向右是x轴正轴,垂直向下是y轴正轴

```CSS
.sprite-icons
{ display: inline-block; background: url('png.png') no-repeat; overflow: hidden; text-indent: -9999px; text-align: left; }
 
.sprite-logo { background-position: -5px -0px; width: 265px; height: 65px; }
.sprite-test { background-position: -5px -70px; width: 30px; height: 30px; }
```

## 弹性盒子

#### 弹性盒模型

- 概念：当页面需要适应不同屏幕尺寸的设备时，亦展现恰当的行为来适应屏幕的布局模式
- 目的：更加有效的对容器中的子元素进行排列、对齐和分配空白空间
- 特点
  - 弹性盒子影响的是子元素，孙子辈及其之后的不会受影响。

#### 弹性盒模型结构

![img](https://pv8byfah6sh.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2ZhNWUxNmZmOTIwNTdhMzVkOTM0ZjI1Y2RmMTNiYzhfbXBiVTRmSURNdGhGNncwcngwdGlWUGRsNVVyMmFtME9fVG9rZW46UXlkdWIzTXZUb3dPclN4VW9qWmNpTm1YbmFoXzE3NTc0MDEyNTQ6MTc1NzQwNDg1NF9WNA)

- 弹性容器：弹性布局的整体布局，任何元素都可以设置属性成为弹性布局。
- 弹性项目：弹性容器里的布局模块，主要针对块级元素进行布局。
- 主轴：弹性项目排版的方向，默认为水平轴，可更改。
- 侧轴：与主轴向垂直相对的方向，默认为竖向，主侧轴类似与xy垂直坐标轴。
- 富裕空间：布局完剩余的空白空间，模块可进行排版的空间。
- 弹性空间：不属于自身，放大或缩小的空间

#### 弹性容器

1. 弹性容器的实现

```Plain
display:flex ; //块级
display:inline-flex ;  //行级
```

- 与浮动的区别，浮动元素一行排不下默认换行，弹性容器一行排不下默认压缩大小。
- 弹性盒子模式的父盒子自适应，没有高度塌陷的现象。

1. 弹性容器常用样式

弹性容器属性

属性描述[flex-warp](https://www.runoob.com/cssref/css3-pr-flex-wrap.html)弹性项目是否换行。nowrap\wrap[flex-direction](https://www.runoob.com/cssref/css3-pr-flex-direction.html)弹性项目显示的方向，主轴方向。row\column\row-reverse\column-reverse[justify-content](https://www.runoob.com/cssref/css3-pr-justify-content.html)设置弹性盒子元素在主轴方向上的对齐方式。flex-start\slex-end\center\space-between\space-around\space-evenly[align-content](https://www.runoob.com/cssref/css3-pr-align-content.html)修改flex-warp的行为，设置模块在侧轴方向上的行对齐方式。[align-items](https://www.runoob.com/cssref/css3-pr-align-items.html)设置弹性盒子元素在侧轴方向上的对齐方式。默认值 stretch

- align-items 与align-content的区别
  - 只有在容器设置高度的时候align-content才有效，类似justify-content，一般很少固定容器高度，所以使用较少。

弹性项目属性

[algin-self](https://www.runoob.com/cssref/css3-pr-align-self.html)与align-items类似，但是作用在一个模块上[flex-grow](https://www.runoob.com/cssref/css3-pr-flex-grow.html)伸张空间，参数为数字 1,3[flex-shrink](https://www.runoob.com/cssref/css3-pr-flex-shrink.html)压缩空间， 输入压缩因子[order](https://www.runoob.com/cssref/css3-pr-order.html)设置弹性盒对象元素的顺序，数值越大显示越靠后[flex-basis](https://www.runoob.com/cssref/css3-pr-flex-basis.html)设置弹性项目的宽度[flex](https://www.runoob.com/cssref/css3-pr-flex.html)flex 属性是 flex-grow、flex-shrink 和 flex-basis 属性的简写属性flex: 0 1 200px;

### css继承

#### 可以继承的样式

字体样式、文本样式、列表样式、鼠标样式(cursor)，等显示样式

#### 不可以继承的样式

高度、宽度，边框、margin、padding，等布局样式

#### 手动继承 inherit

样式: inherit

## 圆角

```JavaScript
复合属性：
border-radius:20px 20px 20px 20px/ 20px 20px 20px 20px;

带方位为具体指定的角
```

注意：

此属性设置的是边框圆角，当半径不大于边框宽度的时候不会影响到内容区域

## 阴影

```HTML
/* 盒子阴影效果 */
box-shadow: 10px 10px 10px 10px rgb(255,25,255);
/*inset：表示阴影显示在盒子内容*/
box-shadow: 0 0 0 0 red inset;
/* x轴偏移量 y轴偏移量 模糊程度 颜色 */
text-shadow: 5px 5px 3px red;
/* 多个阴影用逗号分开 */
box-shadow: 10px 10px 10px 10px rgb(255,25,255),10px 10px 10px 10px rgb(255,25,255);
```

第一个参数：x轴的偏移量，默认0px正好在盒子下面

第二个参数：y轴的偏移量，默认0px正好在盒子下面

第三个参数：虚化效果，值越大，阴影虚化效果越好

第四个参数：阴影的大小，值越大，阴影越大

第五个参数：颜色 这个颜色可以用各种写法

四个参数也可以，代表阴影大小不用设置

## 背景渐变

#### 基础写法

```HTML
background-image: linear-gradient(pink,green,tomato);
background-image: repeating-linear-gradient();
```

颜色可以设置多个，但是至少要两个。

#### 线性渐变色标

色标只要包含了颜色和位置。

可以控制每一个颜色到底占多少位置。动态控制颜色渐变效果

```HTML
background-image: linear-gradient(pink 0%,tomato 100%);
```

如果两个色标中间没有过渡区间，颜色默认没有过渡效果

```HTML
 background-image: linear-gradient(pink 30%,tomato 30%);
```

#### 线性渐变线方向

默认的颜色在页面上渲染出来，从上到下的方式来渲染

```HTML
background-image: linear-gradient(45deg,pink 0%,tomato 100%);
background: linear-gradient(to top right,pink 10%,yellow 60%,blue )
```

可以设置角度，单位为deg，也可以是设置官方一些组合（to left top，to right bottom）

如果你用的deg角度，默认不要增加to

页面上没有写任何角度默认是180deg

#### 径向渐变（扩展）

按照从指定的圆心开始，往外使用圆或椭圆的方式渐变

```Plain
background-image: radial-gradient(circle at center center,red,yellow,green);
还可以设置半径
20px 30px 或者 20% 30% 都行 以及四个大小声明
closest-side （指定径向渐变的半径长度为从圆心到离圆心最近的边）
closest-corner （指定径向渐变的半径长度为从圆心到离圆心最近的角）
farthest-side （指定径向渐变的半径长度为从圆心到离圆心最远的边）
farthest-corner （指定径向渐变的半径长度为从圆心到离圆心最远的角）
```

第一个值：circle（圆）、ellipse(椭圆)

第二个值：圆心位置，at必须加上 （center left right bottom top）。自己定义px像素

第三个值：颜色，颜色也可以设置大小。

## 过渡效果

### 概念

- 有时候需要浏览器解析变化效果慢一点，指定一个时间让浏览器慢慢来执行，将这个过程称为过渡。
- transition提供了一种在更改css属性时控制动画速度的方法，可以让这个属性在指定时间内完成效果。

### 语法

- transition-property ：需要过渡的属性
- transition-duration ：过渡时间

```HTML
transition-property:CSS属性名,css属性名2,css属性名3；  
transition-duration：2s，1s;
```

-  transition-timing-function:设置运动速率

```HTML
默认值为ease：代表加速运动 ；linear:匀速运动

 transition-timing-function:linear;

 贝塞尔曲线：自定义
https://cubic-bezier.com/
cubic-bezier(.28,1.66,.95,-0.36)
```

- transition-delay ：设置动画延迟时间，过了延迟时间整个过渡才会开始

```HTML
transition-delay: 2s;
```

- transition 复合属性

```HTML
transition: property duration linear
```

## 2D动画

### 概念

CSS2D动画也是平面动画，主要的动画控制在x轴和y轴。

主要动画包含

1. 平移（位移）：提供平移动画，按照你指定的方向进行移动，配合过渡效果
2. 旋转：指定页面上元素，按照x轴或者y轴进行旋转，甚至z轴渲染
3. 缩放：指定盒子在标准大小基础上，放大和缩小的功能。按照比例来缩放
4. 斜切：一个盒子沿着x轴或者y轴进行拉伸变化，（正常盒子变成平行四边形）
5. 动画基点：动画运行过程中参考中线点。
6. 矩阵：了解

### 特点

- 2D动画不会影响其他元素的布局，改变margin来实现移动会影响

所有的2D动画都要用到一个共css代码

```HTML
transform:动画类型
```

2D转换一般要配合transition过渡一起使用。

```CSS
transition：transform
```

### 位移 translate

-  可以让盒子沿着x轴或y轴进行移动，不会影响其他盒子 

```CSS
沿着x轴和y轴进行移动
transform:translate( x轴移动量，y轴移动量 );
沿着x轴进行位移
transform:translate(x轴移动量);
transform:translateX(x轴移动量)；
沿着y轴进行位移
transform:translateY(y轴移动量)；
```

-  注意： 
  - 盒子是以原来的位置为起点，进行移动

### 旋转 rotate

-  可以让盒子进行旋转  

```CSS
围绕着盒子的中心点进行旋转，正值是顺时针方向，负值逆时针方向旋转
transform:rotate(角度)；
围绕着x轴进行旋转
transform:rotateX(角度);
围绕着y轴进行旋转
transform:rotateY(角度)；
```

-  注意：盒子没有厚度，如何围绕x轴或者y轴旋转90deg，盒子与视线平行，看不见盒子，从页面中消失 

### 缩放 scale

-  可以让盒子进行放大和缩小 

```CSS
同时控制盒子的宽度和高度进行缩放
transform:scale(宽度的倍数，高度的倍数);
将盒子等比例缩放
transform:scale(倍数);
```

-  注意： 
  - 倍数为0，盒子消失
  - 倍数为1，参考盒子原来的大小
  - 倍数为0~1，盒子缩小
  - 倍数大于1，盒子放大
  - 盒子缩小和放大都是参考盒子的中心点进行缩放

### 倾斜 skew

-  可以让盒子沿着x轴或y轴进行倾斜转换 

```CSS
沿着x轴进行倾斜
transform:skew(角度);
transform:skewX(角度);
沿着y轴进行倾斜
transform:skewY(角度);
```

- skewX：沿着x轴倾斜，角度越大，越接近x轴，当角度为90deg时，会和x轴平行，消失不见
- skewX：沿着y轴倾斜，角度越大，越接近y轴，当角度为90deg时，会和y轴平行，消失不见

### 动画运动参考的基点 origin

一般情况下，我们运行基点都在盒子正中间，

```CSS
transform-origin: 0px 0px;  左上角
transform-origin: left top
transform-origin: left
transform-origin: 5% 5%
```

### 组合变化

```CSS
transform:rotate(180deg) translateX(100px);
```

## Animation动画

### 完成自动播放的动画

1. 编写JavaScript脚本完成自动播放的动画
2. 可以使用flash计算完成动画设计
3. 可以使用某些动画标签，比如marquee
4. h5提供了canvas技术（绘图技术），来完成动画的设计
5. CSS3提供了一种animation动画可以完成自动播放持续播放的动画

### 动画的概念

- 动画：快速切换连续的图片而达到的流畅的画面效果。
- 帧数：一秒钟切换图片的数据，数量越多，画面越流畅。60hz（每秒钟切换60张图片）
- 关键帧：每一页的关键的画面

### 关键帧

- 概念：指盒子状态要发生改变的帧，就是设置需要播放的动画的步骤。一个完整的动画会被拆分为多个步骤，每一个步骤就是一个关键帧。
- 例子：盒子向右移动500px 有2个关键帧 开始状态和结束状态
- 例子：盒子变圆后向右移动500px 有3个关键帧 开始状态——变圆——右移500px 
- css动画中，定义关键帧

### 动画的基本使用

- 先定义关键帧，再通过animation调用关键帧
- 步骤：
  - 利用@keyframes属性来定义所有关键帧，给动画设置一个名称
  - 给要使用的盒子添加animation的相关属性，指定动画的名称和执行时长

### 定义关键帧

- 利用@keyframes属性来定义关键帧，这个属性属于css代码，不需要写在任何选择器中。
- 语法：

```Plain
定义关键帧
@keyframes 动画名称{
    from{
        开始状态
    }
    to{
        结束状态
    }
}
还可以使用百分比定义关键帧，百分比代表整个动画在某个百分比时，是什么状态
0%{
    
}
20%{
    
}
50%{
    
}
100%{
    
}

使用关键帧
div{
    /* 设置动画的名称*/
    animation-name:动画名称;
    /*设置动画的执行时长*/
    animation-duration:执行时长;
}
```

- 关键帧在设置过程中，可以使用百分比，from相当于0%，to相当于100%
- 每一帧的时间跟两帧之间的百分比有关系，跨度越大，分配的时间越多，跨度越小，分配的时间越少。
- 计算公式：关键帧的执行时间= 两帧之间的差 * 总动画的时间

### 动画属性

- animation动画属性可以控制动画的速率、次数等等操作
- 属性：
  - anination-name:设置动画的名称，需要配合执行时长一起使用
  - animation-duration: 设置动画的执行时长，默认值为0s；
  - animation-timing-function: 设置动画的执行速率，原理是通过贝塞尔曲线来实现的
    - ease：默认值，以低速开始，然后变快，在结束前变慢\
    - linear：匀速
    - ease-in：以低速开始
    - ease-out:以低速结束
    - ease-in-out：以低速开始和结束
    - cubic-bezier(x1,y1,x2,y2)：贝塞尔曲线
  - animation-delay:设置动画的延迟时间，默认为0s
  - animation-iteration-count：设置动画的执行次数，默认动画只能执行一次
    - n: 数学，代表次数
    - infinite：无限次
  - animation-direction：设置动画的执行方向
    - normal：默认，正常播放
    - reverse：反向播放动画
    - alternate：奇数次正向播放动画，偶数次反向播放动画
    - alternate-reverse：奇数次反向播放动画，偶数次正向播放动画
  - animation-fill-mode：设置第一帧或最后一帧是否作用在元素上
    - forwards：设置最后一帧作用在元素上，保持结束状态
    - backwards：设置第一帧作用在元素上，保持开始状态
    - both：将第一帧和最后一帧都作用在元素上
  - animation-play-state：控制动画是否播放
    - running:默认值，播放
    - paused：暂停
  - animation：复合属性

```Plain
animation: name duration timing-function delay iteration-count direction fill-mode;
animation: 动画名称  执行时长  执行速率   延迟时长  执行次数  执行方向 是否保持开始或结束状态;
```

# 扩展

## bootstrap

## 简介

- bootstrap是一个响应式布局的框架，可以通过对应的html结构代码和css代码进行有序排列，可以快速的构建的响应式的页面。
- 框架指的是其他开发人员或者公司为了简化某一领域的开发流程，而设计出来的有序的代码，简称第三方开发工具。
- bootstrap的官网：https://www.bootcss.com/
- bootstrap内置了很多组件和js插件，直接使用进行页面布局，无需自己编写，只需要添加不同的class名即可。
- Bootstrap4的5种栅格：
  - 特小（col-）(<576px)
  - 小（col-sm-）(≥576px)
  - 中（col-md-）(≥768px)
  - 大（col-lg-） (≥992px)
  - 特大（col-xl-）（≥1200px）

补充：sm、md、lg其实就是类似媒体查询

### 基本使用

先去官网下载，再引入本地的bootstrap的文件

```Plain
<!-- 引入本地的bootstrap 的css文件 -->
<link rel="stylesheet" href="css/bootstrap.min.css">
<!-- 先引入jquery的js文件 -->
<script src="js/JQuery2.1.4.js"></script>
<!-- 引入bootstrap的js文件 -->
<script src="js/bootstrap.bundle.min.js"></script>
```

注意：先引入jquery文件，再引入bootstrap的js文件