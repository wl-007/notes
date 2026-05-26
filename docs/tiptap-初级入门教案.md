# Tiptap 初级入门教案

## 教学目标

完成这份教案后，学习者应该能掌握以下内容：

1. 理解 Tiptap 是什么，以及它和传统富文本编辑器的区别。
2. 能在 React / Next.js 项目中完成一个最小可用编辑器。
3. 理解 `useEditor`、`EditorContent`、`StarterKit`、命令链的基本关系。
4. 能读懂和使用常见编辑器数据格式：`HTML`、`JSON`、纯文本。
5. 知道扩展机制是 Tiptap 的核心，并能基于扩展思维组织功能。
6. 能写一个简单的自定义节点扩展。
7. 能实现一个简单的自定义菜单，包括工具栏菜单和 slash 菜单。

---

## 一、初学者先要知道什么

如果是“初步掌握 Tiptap”，我认为最少要建立下面这几个认知。

### 1. Tiptap 不是一个现成 UI 编辑器，而是一个 Headless Editor

Tiptap 更像“编辑器能力引擎”，不是一个自带完整界面的富文本产品。

你需要自己决定：

- 编辑器长什么样
- 工具栏怎么摆
- slash 菜单怎么弹
- 节点如何渲染
- 输出什么格式

这也是它强大的原因。

### 2. 文档内容本质上是一个结构化文档树

Tiptap 底层基于 ProseMirror，内容不是一串普通字符串，而是一棵文档树。

常见元素包括：

- `doc`
- `paragraph`
- `text`
- `heading`
- `bulletList`
- `listItem`

所以你在做的不是“操作 textarea”，而是在操作“结构化内容模型”。

### 3. 功能几乎都来自扩展（Extension）

Tiptap 的能力是按扩展拼起来的。

例如：

- `StarterKit` 提供段落、标题、列表、引用、粗体、斜体等常用功能
- `Placeholder` 提供占位文案
- `Underline` 提供下划线
- `Mention` 提供提及能力
- 你自己也可以写 `Node` / `Mark` / `Extension`

结论很重要：

> 学 Tiptap，本质上就是学“如何配置扩展、调用扩展、编写扩展”。

### 4. 命令式操作是高频用法

你会经常写这样的代码：

```ts
editor.chain().focus().toggleBold().run()
editor.chain().focus().setParagraph().run()
editor.chain().focus().insertContent('hello').run()
```

这里要理解 3 件事：

- `chain()`：链式组织命令
- `focus()`：先把焦点拉回编辑器
- `run()`：真正执行

### 5. React 里最核心的是 `useEditor` 和 `EditorContent`

最小编辑器通常就是：

```tsx
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function MyEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
    immediatelyRender: false,
  })

  if (!editor) return null

  return <EditorContent editor={editor} />
}
```

在 Next.js 里，`immediatelyRender: false` 很关键，用来避免 SSR / hydration 问题。

### 6. 你必须知道编辑器的 3 种常见输出

最常见的 3 种读取方式：

```ts
editor.getHTML()
editor.getJSON()
editor.getText()
```

各自用途：

- `getHTML()`：适合直接展示、发给后端做 HTML 存储
- `getJSON()`：适合结构化存储、迁移和二次加工
- `getText()`：适合搜索、摘要、字符统计

对于初学者，我建议先理解：

- 页面上编辑的是“可视内容”
- 程序里真正重要的是“结构化数据”

---

## 二、建议的入门学习顺序

### 第 1 阶段：会搭一个最小编辑器

目标：能跑起来。

应掌握：

- 安装依赖
- `useEditor`
- `EditorContent`
- `StarterKit`
- 初始内容 `content`
- Next.js 下的 `use client` 和 `immediatelyRender: false`

建议练习：

1. 渲染一个空编辑器。
2. 设置默认内容。
3. 加一个按钮，点击后插入文本。
4. 在页面上实时展示 `getHTML()` 和 `getJSON()`。

### 第 2 阶段：会做基础工具栏

目标：能做最常见格式化操作。

应掌握：

- `toggleBold()`
- `toggleItalic()`
- `toggleHeading()`
- `toggleBulletList()`
- `isActive()`

建议练习：

1. 做一个顶部工具栏。
2. 当前选区如果是粗体，按钮高亮。
3. 选中文本后可以切换粗体、斜体、标题。

### 第 3 阶段：理解扩展机制

目标：知道为什么 Tiptap 能扩展。

应掌握：

- 什么是 `Extension`
- 什么是 `Node`
- 什么是 `Mark`
- 为什么“段落/标题/列表”本质上也是扩展

建议练习：

1. 安装一个额外扩展，例如 `Underline`。
2. 把它加到 `extensions` 数组中。
3. 增加一个按钮调用对应命令。

### 第 4 阶段：自定义节点

目标：不只是“用现成节点”，而是“自己造节点”。

应掌握：

- `Node.create()`
- `name`
- `group`
- `content`
- `addAttributes()`
- `parseHTML()`
- `renderHTML()`

建议练习：

1. 做一个 `callout` 节点。
2. 节点支持 `type="info" | "warning"` 这样的属性。
3. 可以通过按钮插入这个节点。

### 第 5 阶段：自定义菜单

目标：做出真正贴业务的编辑体验。

应掌握：

- `BubbleMenu`
- `FloatingMenu`
- slash 命令菜单
- 建议列表 / suggestion 机制
- 菜单项如何映射到 editor command

建议练习：

1. 选中文本时显示 BubbleMenu。
2. 在空段落或特定输入下显示 FloatingMenu 或 slash menu。
3. 输入 `/vue` 后出现候选项，回车插入模板。

---

## 三、Tiptap 的核心知识地图

### 1. 编辑器实例

你要知道的核心对象是 `editor`。

高频能力包括：

- `editor.chain()`
- `editor.commands`
- `editor.isActive()`
- `editor.getHTML()`
- `editor.getJSON()`
- `editor.getText()`
- `editor.on('update', ...)`
- `editor.on('selectionUpdate', ...)`

### 2. Extension / Node / Mark 的区别

可以这样粗略理解：

- `Extension`：通用扩展能力，不一定直接代表内容节点
- `Node`：块级或行内内容结构，例如段落、图片、卡片、提示块
- `Mark`：附着在文本上的标记，例如粗体、斜体、链接

如果你想插入一个“结构化卡片块”，通常应该写 `Node`。

如果你只是想给一段文字增加“语义或样式”，通常应该写 `Mark`。

### 3. 菜单只是编辑器操作的 UI 映射层

很多初学者会把“菜单”理解成 Tiptap 的主体，但其实菜单只是壳。

本质关系是：

- 编辑器能力在 `editor`
- 菜单只是调用 `editor.chain().focus()...run()`
- slash menu、bubble menu、toolbar 本质都是不同触发方式的 UI

所以做菜单时，重点不在“长什么样”，而在：

- 什么时候显示
- 显示哪些命令
- 选中后调用什么命令
- 如何和当前 selection / cursor 状态同步

---

## 四、课堂讲解示例：最小编辑器

```tsx
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function BasicEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>开始输入内容</p>',
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <div>
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        粗体
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        斜体
      </button>
      <EditorContent editor={editor} />
    </div>
  )
}
```

讲这段代码时，要让学习者明确：

- `EditorContent` 只是渲染承载容器
- 真正的状态都在 `editor`
- 按钮点击后只是调用命令
- Tiptap 的可扩展性来自 `extensions`

---

## 五、必须讲到的“扩展”知识

### 1. 为什么一定要讲扩展

因为 Tiptap 最强的地方不是“能粗体斜体”，而是：

- 你能扩展出业务块
- 你能扩展出业务命令
- 你能扩展出业务键盘行为
- 你能扩展出业务菜单

如果不理解扩展，学习者只能停留在“会用现成编辑器”，很难真正掌控它。

### 2. 扩展里最常见的能力点

一个自定义扩展里常见的能力有：

- `addOptions()`
- `addAttributes()`
- `parseHTML()`
- `renderHTML()`
- `addCommands()`
- `addKeyboardShortcuts()`
- `addInputRules()`
- `onCreate()` / `onUpdate()` / `onSelectionUpdate()`

对初学者来说，先重点讲 4 个：

- `addAttributes()`
- `parseHTML()`
- `renderHTML()`
- `addCommands()`

---

## 六、自定义节点必须怎么讲

### 1. 自定义节点的目标

自定义节点适合用来表达“业务里有独立结构”的内容，比如：

- 提示块 `Callout`
- 代码示例块
- 变量占位块
- 人员卡片
- 表单片段
- 产品卡片

### 2. 一个最小自定义节点示例

```ts
import { Node } from '@tiptap/core'

export const Callout = Node.create({
  name: 'callout',
  group: 'block',
  content: 'inline*',

  addAttributes() {
    return {
      type: {
        default: 'info',
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-callout]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-callout': '', ...HTMLAttributes }, 0]
  },
})
```

这段代码要讲清楚：

- `name`：节点名，后面很多命令都靠它识别
- `group: 'block'`：它是块级节点
- `content: 'inline*'`：它内部允许普通行内内容
- `addAttributes()`：给节点增加业务属性
- `parseHTML()`：从 HTML 恢复节点
- `renderHTML()`：节点如何输出成 HTML

### 3. 建议给初学者的自定义节点练习题

练习题 A：做一个 `callout` 节点

要求：

- 支持 `info` 和 `warning` 两种类型
- 页面上显示不同背景色
- 工具栏里有“插入提示块”按钮

练习题 B：做一个 `variableTag` 行内节点

要求：

- 展示成类似标签的 UI
- 存储 `key` 和 `label`
- 通过 slash 菜单插入

这两个练习一个偏块级结构，一个偏行内业务标签，很适合作为初级到中级的桥梁。

---

## 七、自定义菜单必须怎么讲

### 1. 初学者先理解 3 类菜单

Tiptap 里常见菜单可以分成三类：

#### A. 固定工具栏

始终显示在编辑器上方。

适合：

- 粗体
- 斜体
- 标题
- 列表
- 对齐

#### B. BubbleMenu

选中文本后出现。

适合：

- 文本格式化
- 链接编辑
- 行内标记操作

#### C. Slash Menu / Suggestion Menu

输入 `/` 后出现。

适合：

- 插入模板
- 插入业务节点
- 插入变量
- 插入块级结构

### 2. 为什么菜单是业务定制重点

真正做产品时，用户不会关心你是不是用 Tiptap。

用户关心的是：

- 能不能快速插入业务块
- 能不能快捷补全变量
- 能不能减少复杂操作路径

所以“自定义菜单”往往比“单纯工具栏”更接近真实业务价值。

### 3. BubbleMenu 示例

```tsx
import { BubbleMenu } from '@tiptap/react/menus'

<BubbleMenu editor={editor}>
  <button onClick={() => editor.chain().focus().toggleBold().run()}>
    Bold
  </button>
  <button onClick={() => editor.chain().focus().toggleItalic().run()}>
    Italic
  </button>
</BubbleMenu>
```

这里要讲清楚：

- 它本身只是一个显示层
- 真正动作还是命令调用
- 是否高亮可以依赖 `editor.isActive()`

### 4. Slash Menu 应该怎么教

建议不要一上来就讲太深的 ProseMirror 插件细节。

初级阶段只要先让学习者理解：

- 某个触发字符会唤起菜单，例如 `/`
- 菜单项是一个数组
- 菜单项最终会触发 `editor.chain().focus()...run()`
- 可以根据 query 过滤候选项
- 可以支持上下键和回车选择

一个很重要的教学观点：

> slash 菜单不是“神秘编辑器能力”，而是“输入状态 + 候选列表 + editor command”的组合。

### 5. Slash Menu 示例结构

```tsx
const items = [
  {
    title: 'Vue 模版',
    onSelect: ({ editor }) => {
      editor.chain().focus().insertContent('vue template').run()
    },
  },
]
```

如果后续进阶，可以再讲：

- suggestion 插件
- `SuggestionMenu`
- `useSlashDropdownMenu`
- 自定义 keyboard navigation

---

## 八、推荐的 90 分钟入门课程安排

### 第 1 节：15 分钟

主题：Tiptap 是什么

讲解重点：

- Headless editor
- 文档树
- 扩展机制
- 和传统 textarea / 富文本组件的区别

### 第 2 节：20 分钟

主题：搭建最小编辑器

讲解重点：

- 安装依赖
- `useEditor`
- `EditorContent`
- `StarterKit`
- `immediatelyRender: false`

实操：

- 跑起来一个编辑器
- 设置默认内容
- 增加一个“插入文本”按钮

### 第 3 节：15 分钟

主题：基础工具栏与常用命令

讲解重点：

- `chain()`
- `focus()`
- `run()`
- `toggleBold()`
- `isActive()`

实操：

- 做粗体、斜体、标题按钮

### 第 4 节：20 分钟

主题：扩展与自定义节点

讲解重点：

- `Node.create()`
- 节点属性
- HTML 解析与渲染
- 为什么业务块适合做成节点

实操：

- 做一个 `callout` 节点
- 插入并展示不同类型

### 第 5 节：20 分钟

主题：自定义菜单

讲解重点：

- Toolbar / BubbleMenu / SlashMenu 的区别
- 菜单项和命令的关系
- query 过滤
- 上下键和回车选择

实操：

- 做一个 `/vue` 菜单
- 插入 `vue template` 或 `vue2 template`

---

## 九、初学者最容易踩的坑

### 1. 把 Tiptap 当成现成 UI 组件

这是最大误区。

它更像编辑器内核，不是“开箱即用后台文本框”。

### 2. 不理解扩展，导致功能堆不动

如果只会 copy `StarterKit` 示例，很快会遇到上限。

一旦需求变成：

- 自定义卡片
- 自定义变量
- 自定义 slash 命令
- 自定义键盘规则

就会发现必须回到扩展机制。

### 3. 在 Next.js 里忽略客户端渲染问题

关键点：

- 编辑器组件加 `use client`
- `immediatelyRender: false`

### 4. 菜单只做 UI，不处理 selection / cursor 状态

真正麻烦的不是把菜单画出来，而是：

- 什么时候出现
- 什么时候隐藏
- 当前 query 是什么
- 选中后插到哪里
- 键盘怎么控制

### 5. 只会 HTML，不会 JSON

如果后期要做结构化内容、模板系统、协作编辑，`JSON` 往往比 `HTML` 更重要。

---

## 十、给初学者的学习建议

### 建议 1

先把“最小编辑器 + 工具栏”做出来，不要一开始就写复杂插件。

### 建议 2

第二步一定要做一个自定义节点。哪怕很简单，也比一直停留在 `StarterKit` 更有效。

### 建议 3

第三步一定要做一个自定义菜单，尤其是 slash menu，因为它最能体现 Tiptap 的业务价值。

### 建议 4

不要急着钻 ProseMirror 全部细节。初级阶段只要先理解：

- 文档是树
- 能力来自扩展
- 菜单只是命令入口
- 节点是结构化内容单位

这四个认知建立起来，后面再进阶会轻松很多。

---

## 十一、课后作业

### 作业 1：最小编辑器

实现一个包含以下功能的编辑器：

- 粗体
- 斜体
- 标题二级
- 输出 HTML

### 作业 2：自定义节点

实现一个 `notice` 节点：

- 块级节点
- 支持 `success` / `error` 两种类型
- 渲染为不同颜色

### 作业 3：自定义 slash 菜单

实现一个 slash 菜单：

- 输入 `/vue` 显示 `Vue 模版`
- 输入 `/react` 显示 `React 模版`
- 支持上下键和回车
- 选中后插入对应模板文本

---

## 十二、教师备注

这门入门课的重点不应该是“把所有 API 讲全”，而应该是让学习者建立正确心智模型：

- Tiptap 是可扩展编辑器内核
- 扩展是核心
- 节点是结构化内容模型
- 菜单是命令驱动的 UI

只要这 4 个点讲透，学习者后续去看官方文档时，就不会只停留在抄示例。

---

## 参考资料

以下内容参考了 Tiptap 官方文档中的相关能力说明：

- React / Next.js 安装与 `immediatelyRender: false`
- `useEditor` / `EditorContent` 基础用法
- `editor.getHTML()` / `getJSON()` / `getText()`
- `Node.create()` 自定义节点
- `BubbleMenu` / `FloatingMenu`
- `SuggestionMenu` / `useSlashDropdownMenu` / slash command 自定义菜单
