# HTML指南

## 什么是HTML5

HTML5是最新的超文本标记语言标准，它不仅包含HTML，还整合了CSS和JavaScript的许多新特性，为现代网页开发提供了强大的功能支持。

## 准备工作

- Chrome 浏览器
- vsCode 编辑器（webStorm、cursor、Trae 等工具也可以）

## 初探HTML

- 示例

```HTML
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>My test page</title>
  </head>
  <body>
    <img src="images/firefox-icon.png" alt="My test image" />
  </body>
</html>
<!doctype html>——文档类型。这是必不可少的开头。混沌初分，HTML 尚在襁褓（大约是 1991/92 年）之时，这个元素用来关联 HTML 编写规范，以供自动查错等功能所用。而在当今，它作用有限，可以说仅用于保证文档正常读取。现在知道这些就足够了。
<html></html> 元素。该元素包含整个页面的所有内容，有时候也称作根元素。它还包含 lang 属性，设置页面的主要语种。
<head></head> 元素。该元素作为想在 HTML 页面中包含但不想向用户显示的内容的容器。包括想在搜索结果中显示的关键字和页面描述、用于设置页面样式的 CSS、字符集声明等等。
<meta charset="utf-8">——该元素指明你的文档使用 UTF-8 字符编码，UTF-8 包括世界绝大多数书写语言的字符。它基本上可以处理任何文本内容。以它为编码还可以避免以后出现某些问题，没有理由再选用其他编码。
<meta name="viewport" content="width=device-width">——视口元素可以确保页面以视口宽度进行渲染，避免移动端浏览器以比视口更宽的宽度渲染内容，导致内容缩小。
<title></title> 元素。该元素设置页面的标题，显示在浏览器标签页上，也作为收藏网页的描述文字。
<body></body> 元素。该元素包含期望让用户在访问页面时看到的全部内容，包括文本、图像、视频、游戏、可播放的音轨或其他内容。
```

## HTML初始化

```HTML
<!DOCTYPE html> <!-- 声明是HTML文档类型-->
<!---lang="en"-代表当前的网页为英文-->
<!---lang="ch"-代表当前的网页为中文-->
<html lang="en">
  <head>
    <!--·定义当前网页的编码集--->
    <meta charset="UTF-8">
    <!--·专门针对ie浏览器，代码以高版本的ie浏览器来显示网页·-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!---针对移动端布局，开启理想视口·-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--·定义网页的·关键字-可以作为搜索引擎收录，有利于seo优化--->
    <meta name="keywords" content="一个关键字，第二个关键字">
    <!--·定义网页的描述·-->
    <meta name="description" content="一个网页描述">
    <!---定义网页的作者--->
    <meta name="author" content="zhangrui">
    <!---代码网页的标题，会显示在窗口栏上--->
    <title>Document</title>    
    <!-- 注意：图标要用 16*16 色的。。。(保证了兼容性，无论在哪个地方都可以显示) -->
    <!-- 标题栏： -->
    <link rel="icon" href="ico地址" type="image/x-icon">
    <!-- 收藏夹： -->
    <link rel="shortcut icon" href="ico地址" type="image/x-icon">
  </head>
  <body>
    This
  </body>
</html>
```

## HTML常用标签

### 文本展示

```HTML
 <!---标题标签- h1~h6-数字越大，字号越小，默认加粗。默认上下有间距-margin-独占一行-->
    <!--·其实所有的标签默认是没有样式，标签的样式会从浏览器默认的样式--->
    <!---好处:有利于搜索引擎收录，有利于seo优化--->
    <h1>h1标签</h1>
    <h2>h2标签</h2>
    <h3>h3标签</h3>
    <h4>h4标签</h4>
    <h5>h5标签</h5>
    <h6>h6标签</h6>
    <!---段落标签·p-->
    <!--注意:p标签不能相互嵌套· 嵌套会自动补全成一对-->
    <P>
        存放一些简单的文本或者 <strong>提示</strong> 提示性信息
    </P>
    <!---span标签:存放一些简单的文本或者提示性信息·可以同行显示-->
    <span>span1</span>
    <span>span2</span>
    <!---label标签:有特殊用法,可以配合表单元素一起使用,来控制表单元素·.可以同行显示·-->
    <!-- for=""·.其中的for是标签上属性,引号里面属性值-,属性值可以用双引号或单引号包裹·-->
    <label for="">label</label>
    <!---换行-br·-单标签--><br>
    <br><br>I
    <!--分割线hr-单标签-->
    <hr>

    <!---加粗标签·b/strong-推荐使用strong同行显示·-->
    <b>粗体</b>
    <strong>粗体</strong>
    <!---斜体i/ em一同行显示,推荐使用i标签·-->
    <i>斜体</i>
    <em>斜体</em>
        <abbr>元素
        解释缩写词。使用title属性可提供全称，只在第一次出现时使用就ok。
        The <abbr title="情操高大上的高质量人类">老六</abbr> was ...
加粗  <b></b>   <strong></strong>(语义更强烈)     "strong"-->强壮
倾斜   <i></i>   <em></em>(语义更强烈)             "emphasize"-->强调
删除线   <s></s>   <del></del>(语义更强烈)           "delete"-->删除
下划线  <u></u> <ins></ins>(语义更强烈)           "inserted"-->插入
    
```

### 内容输入

```HTML
<input type="" >  输入标签   type属性表示输入类型 密码框、数字框等
<input type="text" >  文本域
<input type="password" >  密码框
<input type="radio" >  单选框
<input type="radio" name="sex" value="male">男<br>
<input type="radio" name="sex" value="female">女

<input type="checkbox" >  复选框
<input type="checkbox" checked name="vehicle" value="Bike">我喜欢自行车<br>
<input type="checkbox" name="vehicle" value="Car">我喜欢小汽车
```

### 表格标签

```HTML
                <table border="1px" align="">
                  <caption>nowcoder</caption> <!--caption 才是标题 th 是强调 -->
                  <tr>
                          <td></td>
                          <td></td>
                          <td></td>                  
                  </tr>
                  <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                  </tr>
                </table>
标签：
  thead 元素用于对 HTML 表格中的表头内容进行分组
  tbody 元素用于对 HTML 表格中的主体内容进行分组
  tfoot 元素用于组合 HTML 表格中的页脚（脚注或表注）内容

属性：
  align: 指定表格相对于周围标签的对齐方式,left right center属性
  cellspacing: 设定单元格之间的间距
  cellpadding: 设定单元边沿与单元内容之间的间距
  bgcolor: 背景颜色

  colspan 属性规定单元格可横跨的列数。
  rowspan 属性规定单元格可横跨的行数。
```

### 图像标签

```HTML
<img src="" alt="" title="">
alt 属性用来为图像定义一串预备的可替换的文本。
title 代表标题
```

### 链接标签

```HTML
<a herf="url" target="_blank">
      arget属性有五个特殊值。
        1.target="_self"
        内容在当前页面显示。
        2.target="_blank"
        内容在新页面显示。
        3.target=“three”
        内容在对应窗口显示
        4.target="_top"
        在当前窗体打开链接，并替换当前的整个窗体(框架页)，清除所有包含的框架
        5.target="_parent"
        在父窗体中打开链接，在窗口与顶级框架中，等同于_self


图标链接：
<p>创建图片链接:
<a href="http://www.runoob.com/html/html-tutorial.html">
<img  border="10" src="smiley.gif" alt="HTML 教程" width="32" height="32"></a></p>
```

### 列表

```HTML
<ol></ol> 有序列表
<ul></ul> 无序列表
<li></li> 列表项
<dl></dl> 自定义列表
<dt></dt> 定义列表项
<dd></dd> 定义列表描述

ul type 属性 设置表头样式
none 没有、disc 实心圆、circle空心圆、square 实心方、decimal 数字

ol type 属性 1,A,a,Ⅰ  设置显示标头 start 控制标签起始值   reversed 倒序
```

### 音频标签 audio

-  用于页面引入音频文件 

```HTML
写法一：
<audio  src="连接音频文件的文件路径" controls></audio>
写法二：
好处：以后可以写多个source，一首歌曲有多种文件格式，不同的浏览器兼容不同的文件格式
<audio controls>
    <source src="连接mp3格式的音频文件" type="audio/mp3">
    <source src="链接ogg格式的音频文件" type="audio/ogg">
</audio>
```

-  属性： 
  - src：链接音频文件的文件路径
  - controls：是控制器，控制音频的播放等操作
  - autoplay：自动播放
  - loop：循环播放
  - muted：静音播放

### 视频标签 video

-  引入页面种视频文件 
-  语法： 

```HTML
写法一：
<video src="链接视频文件的文件路径" controls></video>
写法二：
<video controls>
        <source src="链接视频文件文件格式1 的文件路径">
            <source src="链接视频文件文件格式2的文件路径">
</video>
```

-  属性： 
  - src：链接视频文件的文件路径
  - controls：是控制器，控制视频的播放等操作
  - autoplay：自动播放
  - loop：循环播放
  - muted：静音播放

### 其他标签

#### div标签

- 可以看作是一个布局容器，在这个容器里面添加或组织网页的结构
- 没有任何样式，可以通过css来自己设置
- 独占一行

#### marquee

-  跑马灯，里面的内容从右边进入，滚动到左侧消失，无序循环播放 
-  语法： 

```HTML
<marquee behavior="" direction=""> 666 </marquee>
```

#### 框架标签 iframe

-  可以在网页中嵌套其他网页，可以是在线服务器的网页，也可以是本地服务器的网页 
-  语法： 

```HTML
<iframe src="需要嵌套的网页的文件路径" frameborder="0" width="1000px" height="500px"></iframe>
```

#### 删除线标签 del

-  语法： 

```HTML
<del>998</del>
```

#### 带边框的标签

-  语法： 

```HTML
<fieldset>
    <!-- 设置边框上的标题 -->
    <legend>登录</legend>
    <form action="">
        用户名: <input type="text">
        密码: <input type="password">
    </form>
</fieldset>
```

## 行和块分类

### 行内标签（行内元素）

- 一般用于组织文本内容
- 特点： 
  - 共享一行
  - 不支持宽高，宽高由内容决定
- 标签：span、label、i、a等等

### 块级标签（块级元素）

- 一般用于组织布局
- 特点： 
  - 独占一行，不能和其他标签在一行显示
  - 支持宽高
- 标签：div、p、h、table、tr、ul、ol、li，等等，没有被标签包裹的文字也是而独占一行。

### 行内块级标签（行内块级元素）

- 特点： 
  - 元素可以同行显示
  - 支持宽高
- 标签：td、img。input、button、select等等

### 相互转化

- 通过display属性进行相互转化
- 取值： 
  - `display:inline;`转为行内元素
  - `display:inline-block;`转为行内块级元素
  - `display:block;`转为块级元素
  - `diaplay:none;`隐藏元素，元素会从页面在消失，页面重绘

**语义化标签:** 语义化标签能够通过标签名很好的合理正确的表达标签内容的意思。**语义化标签的好处**易于用户阅读，样式丢失的时候，可以让页面呈现清晰的代码结构有利于SEO优化，搜索引擎根据标签来确定上下文的各个标签的关键字关系以及权重方便其他的设备进行解析，比如盲人阅读器有利于开发和维护，语义化标签具有可读性，代码更好维护。

**语义化标签的使用**

| 标签名字 | 标签描述                                     |
| -------- | -------------------------------------------- |
| header   | 定义整个文档头部                             |
| footer   | 定义整个文档的尾部                           |
| main     | 网页中主体部分，内容区域，页面上有且仅有一个 |
| nav      | 这个标签用于定义导航                         |
| aside    | 定于网站中的侧边栏                           |
| article  | 定义网页中一块独立的区域，一般放内容         |
| section  | 定义网页中的一个模块，理解为平时div          |
| thead    | 表格的头部                                   |
| tbody    | 表格的内容                                   |
| tfoot    | 表格的尾部                                   |
| time     | 定义一个时间、日期                           |
| audio    | 音频标签                                     |
| video    | 视频标签                                     |
| source   | 资源标签，定义多媒体资源                     |
| canvas   | 定义图形，绘制图形或者形状                   |

**标签的选择：**最外层的标签尽量使用HTML5的语义化标签，比如header、main、footer等标题尽量使用标题标签，主要是为了seo优化对于网页的内容的框架，重复出现的使用section，大体内容区域article标签具体内容该使用什么标签就使用什么标签，比如图片就使用图片标签等等。