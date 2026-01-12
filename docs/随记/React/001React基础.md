# React 基础

## 1. React 简介

React 是由 Facebook 开发并开源的一个用于构建用户界面的 JavaScript 库。它主要用于构建单页应用（SPA），其核心理念是组件化和声明式编程，即 ui = render(data)。​

### 核心特点

1. 声明式

   - React 使用声明式编程范式来描述 UI。开发者只需描述界面在某一特定状态下的样子，React 会负责在状态变化时高效地更新和渲染界面。
   - React 的声明式，通过 jsx 语法定义实现，开发者只需时刻关注 state、props 的变化，React 会自动更新渲染视图。

2. 组件化

   - React 应用由多个组件组成，每个组件对应页面中的一个部分。组件是可重用的独立代码块，使得开发和维护大型应用变得更加高效。

3. 虚拟 DOM（Virtual DOM）

   - React 使用虚拟 DOM 来优化性能。虚拟 DOM 是一个轻量级的 JavaScript 对象，作为实际 DOM 的抽象副本。当状态或数据发生变化时，React 首先更新虚拟 DOM，然后计算出最小的 DOM 变更并将其应用到实际 DOM 上，从而提高性能。
   - 在 React 中，引入了 fiber 架构用于桥接数据变更与 dom 更新。

4. 单向数据流

   - React 中的数据流是单向的。这种数据流方式使得数据管理更加清晰和可预测，有助于调试和维护。

5. JSX 语法
   - JSX 是 JavaScript 的一种语法扩展，允许在 JavaScript 代码中编写类似 HTML 的标签。JSX 使得定义组件结构更加直观和简洁。

### 核心概念

1. 组件

   - 组件是 React 应用的基础单元。可以是类组件（使用 ES6 类语法）或函数组件（使用函数语法）。

2. 状态

   - 状态是组件内部的数据，用于控制组件的行为和渲染。

3. 属性（Props）
   - 属性是从父组件传递到子组件的数据。属性是不可变的，子组件只能读取属性，而不能修改它们。

### React 主要生态系统

1. React Router

   - React Router 是一个用于在 React 应用中实现路由的库，允许开发者根据 URL 的变化渲染不同的组件。

2. Redux -> zustand

   - Redux 是一个用于管理应用状态的库，常与 React 结合使用。它通过全局状态树和单向数据流来简化状态管理。

3. Create React App -> Vite
   - Create React App 是一个官方的脚手架工具，帮助开发者快速创建和配置 React 项目。

## 2. React 项目初始化

React 项目初始化方式有很多种选择，我们可以选择已有脚手架工具，直接创建 React 项目，也可以通过自定义项目结构，然后使用构建工具实现 React 项目的构建打包流程。

### 脚手架方案

#### Vite

通过 Vite 搭建 React 工程只需要一行命令即可，命令如下：

```bash
pnpm create vite react-vite --template react-ts
```

#### create-react-app

命令示例：

```bash
npx create-react-app my-app --template typescript
```

已不推荐，官网地址：https://create-react-app.dev/

### 自搭建

#### Vite

##### 1. 创建项目目录并初始化

```bash
mkdir react-custom
cd react-custom
pnpm init
```

##### 2. 安装 Vite 相关依赖

```bash
pnpm install react react-dom
pnpm install --save-dev vite @vitejs/plugin-react
```

##### 3. 创建项目结构

```bash
react-custom/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── .gitignore
```

##### 4. 创建 Vite 配置文件

在根目录创建`vite.config.js`文件。

`vite.config.js ` :

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
});
```

##### 5. 创建 React 组件

在`src`下创建 `main.jsx`、`App.jsx`、`index.css` 文件。

`src/main.jsx` :

```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`src/App.jsx` :

```jsx
import React from "react";

export default function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
```

`src/index.css` :

```css
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f1f1f1;
}
```

##### 6. 创建 HTML 模块

在项目根目录下创建 `index.html`文件。

`index.html` :

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./src/main.jsx"></script>
  </body>
</html>
```

##### 7. 更新 `package.json` 脚本

```json
"scripts": {
	"dev": "vite",
	"build": "vite build",
	"preview": "vite preview"
},
```

##### 8. 启动开发服务器

```bash
pnpm dev
```

## 3. 认识 JSX

JSX 是 React 中最核心的一个概念，它也是区别于 Vue 最核心的一个概念（Vue 现也已支持 JSX 语法）。JSX 全称 JavaScript And XML，是一种在 JavaScript 中编写 HTML 代码片段的语法协议，不过这种协议同样回归到编译阶段，jsx 最终通过编译转为 jsx 以在运行时工作。

> 在 React 应用中编写的 jsx 会先通过编译工具转换为 React 提供的运行时方法，从而在应用执行时工作。
>
> jsx -> \_jsx -> jsxProd -> createElement

### JSX 基础示例

```jsx
const element = <h1>Hello World</h1>;
export default function App() {
  return element;
}
```

在这个例子中, `<h1>Hello World</h1>` 是 JSX, 它表示一个文本为 "Hello World" 的 "h1" 标签。

### JSX 的特点

#### 1. 标签语法

- 类似 HTML 标签，但可以在 Javascript 中使用。
- 必须闭合标签，即使是自闭合标签也需要 `/` , 例如 `<br/>` 。

#### 2. 嵌入表达式

- JSX 允许在标签内部嵌入使用 `{}` JavaScript 表达式。

```jsx
const name = "Json";
const element = <h1>Hello, {name}</h1>;
```

#### 3. JSX 是一个表达式

- JSX 编译后变成了普通的 JavaScript 对象，可以在条件语句、循环中使用，赋值给变量，作为函数的参数，返回值等。

```jsx
function greet(user) {​
	if (user) {​
		return <h1>Hello, {user}!</h1>;​
	}​
	return <h1>Hello, Stranger.</h1>;​
}
```

### JSX 的转化原理

- JSX 不能直接在浏览器中运行，需要通过编译工具（如 Babel）转换为纯 JavaScript。Babel 是一个 JavaScript 编译器，可以将 JSX 和其他新语法转换为兼容性更好的旧版本 JavaScript。

以下是 JSX 转换为 JavaScript 的过程：

#### 1. JSX 代码

```jsx
const element = <h1>Hello World</h1>;
```

#### 2. 转换后的 JavaScript 代码

```js
import { jsx as _jsx } from "react/jsx-runtime";​
var element = /*#__PURE__*/ _jsx("h1", {​
  children: "Hello, world!"​
});
```

#### 3. 运行时

```js
var element = React.createElement("h1", null, "Hello, world!");
```

## 4. React 基础语法

新版本 React 推荐使用函数式组件设计，状态相关处理推荐使用 Hooks，接下来我们通过 class component 和 function component 进行对比讲解。
React 的基础语法和概念是构建 React 应用程序的核心。以下是对 React 基础语法的详细说明，包括 `props`、`state`、条件渲染、事件处理和组件传值等。

### Function Component

目前 React 应用主流编码方式是函数式组件。

#### 1. State

函数式组件使用 `useState` Hook 来管理状态。

**示例**

```jsx
import React from "react";

export default function UserStateDemo() {
  const [date, setDate] = React.useState(new Date());
  React.useEffect(() => { 
    const timerID = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  return (
    <div>
    UserStateDemo
    <h1>时间：{date.toLocaleTimeString()}</h1>
  </div>
  )
}

```

#### 2. Props

函数式组件通过参数来接收 `props`。

**示例**

```jsx
import React from "react";

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
export default function PropsDemo() {
  return (
    <>
      <div>PropsDemo</div>
      <Welcome name="React"></Welcome>
      <Welcome name="Vue"></Welcome>
    </>
  );
}

```

#### 3. 事件处理

React 的事件处理类似于 DOM 事件处理，但有一些语法上的不同。事件命名采用小驼峰命名法，处理函数通过 `{}` 传递。

**示例**

```jsx
import React from "react";

export default function EventDemo() {
  const handleClick = () => {
    console.log("点击了按钮");
  };
  return (
    <>
      <div>EventDemo</div>
      <button onClick={handleClick}>点击</button>
    </>
  );
}

```

#### 4. 列表和Key

在 React 中渲染列表时，需要为每个列表项提供一个唯一的 key 属性，以便 React 能够有效地更新和重新渲染列表。

**示例**

```jsx
import React from 'react'

export default function ListDemo() {
  const list = [
    { id: 1, name: "张三" },
    { id: 2, name: "张三" },
    { id: 3, name: "张三" },
    { id: 4, name: "张三" },
    { id: 5, name: "张三" },
  ];
  return (
    <>
      <div>ListDemo</div>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  )
}

```

#### 5. 表单处理

- 受控组件： React 表单元素的值通常由组件的 `state` 控制，这些表单元素称为“受控组件”。
- 非受控组件：不由React 的`state` 控制。 

**示例**

```jsx
import React from "react";

export default function FormDemo() {
  const [name, setName] = React.useState("");
  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </>
  );
}

```



### Class Component

React 的老项目可能会使用 class component 进行开发，相关知识需要学习一下。

#### 1. State

`state` 是组件内部的数据状态。`state` 是可变的，可以通过调用 `this.setState` 方法来更新状态，从而触发重新渲染。

**示例**

```jsx
import { Component } from "react";

export default class StateDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <>
        <p>当前计数: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          增加
        </button>
      </>
    );
  }
}
```

#### 2. Props

`props` 是组件的属性，是从父组件传递到子组件的数据。`props` 是只读的，子组件只能读取而不能修改它们。

**示例**

```jsx
import { Component } from "react";

class Welcome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export default class PropsDemo extends Component {
  render() {
    return (
      <>
        <Welcome name="React" />
        <Welcome name="Vue" />
      </>
    );
  }
}
```

#### 3. 事件处理

React 的事件处理类似于 DOM 事件处理，但有一些语法上的不同。事件命名采用小驼峰命名法，处理函数通过 `{}` 传递。

**示例**

```jsx
import React, { Component } from "react";

export default class EventDemo extends Component {
  handleClick = () => {
    console.log("点击了");
  };
  render() {
    return <div onClick={this.handleClick}>EventDemo按钮</div>;
  }
}
```

## 5. React Hooks基础

在 React 16.8 版本之前，函数组件也称为“无状态组件”，函数组件没有自己的内部数据，也没有自己的生命周期函数。

从 16.8 开始，React 中专门为函数组件新增了 Hook 方法，这些方法就是用来解决函数组件没有状态、没有生命周期的问题。

### 1. useState

`useState` 是最常用的 Hook，用于在函数组件中添加 state。

**用法：**

```jsx
import React from "react";

export default function UserStateDemo() {
  const [date, setDate] = React.useState(new Date());
  React.useEffect(() => { 
    const timerID = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  return (
    <div>
    UserStateDemo
    <h1>时间：{date.toLocaleTimeString()}</h1>
  </div>
  )
}

```

### 2. useEffect

`useEffect` 用于在函数组件中执行副作用操作，例如数据获取、订阅或手动更改 DOM。

`useEffect` 接收两个参数，第一个为回调函数，会在指定时机执行。第二参数为数组，当数组指定的数据发送改变便执行第一个参数传递的函数。 useEffect return 一个函数，此函数会在销毁的时候执行。

```jsx
import  {useEffect } from 'react';
useEffect(() => {
    // 组件挂载完成时执行 和 组件更新时执行
})

useEffect(() => {
    // 组件挂载完成时执行
}, [])

useEffect(() => {
    // 组件挂载完成时执行
    // 数组中任意一条数据发生改变时执行
}, [数据1, 数据2])
```



```jsx
import React from "react";

export default function UserStateDemo() {
  const [date, setDate] = React.useState(new Date());
  React.useEffect(() => { 
    const timerID = setInterval(() => {
      setDate(new Date());
    }, 1000);
		// 清理副作用
    return () => clearInterval(timerID);
  }, []);

  return (
    <div>
    UserStateDemo
    <h1>时间：{date.toLocaleTimeString()}</h1>
  </div>
  )
}
```

### 3. useRef

`useRef `返回一个可变的 ref 对象，该对象的 .current 属性被初始化为传入的参数（initialValue）。

`useRef `常用于访问 DOM 元素直接或存储某个可变值，该值在组件的整个生命周期内保持不变。

```jsx
import { useEffect, useRef, useState } from "react";

// 用来获取 DOM 元素
export const UseRefDemo = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button
        onClick={() => {
          console.log(inputRef.current?.value);
        }}
      >
        提交
      </button>
    </div>
  );
};
```

### 4. useImperativeHandle

`useImperativeHandle` 是 React 中的一个 Hook，它能让你自定义由 [ref](https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs) 暴露出来的属性。

```jsx
import { useImperativeHandle } from 'react';
const Child = (props, ref) => {
    useImperativeHandle(ref, () => {
        return {
            // 返回给父组件的数据或方法 ,方法可以有形参
            showModal(params){
                
            }
        }
    })
}
```

### 5. useReducer

出自 Redux 作者，可以理解为 React 内部基于 Hooks 实现的类似 Redux 状态管理逻辑。
`useReducer` 是 `useState` 的替代方案，适用于 state 逻辑较复杂且包含多个子值，或下一个 state 依赖于之前的 state 的情况。

```JSX
import {useReducer} from 'react'

function reducer(state, action) { 
  switch (action.type) { 
    case 'add':
      return {count: state.count + 1}
    case 'minus':
      return {count: state.count - 1}
    default:
      return state
  }
}
export const UseReducerDemo = () => {
  const [state, dispatch] = useReducer(reducer, {count: 0})
  return (
    <>
      <div>useReducerDemo</div>
      <div>{state.count}</div>
      <button onClick={() => dispatch({type: 'add'})}>+</button>
      <button onClick={() => dispatch({type: 'minus'})}>-</button>
    </>
  )
}

```

### 6. useMemo

useMemo 用来缓存数据。

```jsx
import { useMemo } from 'react';

const App = () => {
    
    const result = useMemo(() => {
        return 计算的结果;
    }, [依赖的数据项])
    
}
```

### 7. useCallback

useCallback 用来缓存方法。

```jsx
const handleAdd = useCallback(() => {
  	// 就近取值
    setCount((c) => c + 1);
  }, []);

  const handleSub = useCallback(() => {
    setCount((c) => c - 1);
  }, []);
```

#### 8. React.memo

`memo` 允许你的组件在 props 没有改变的情况下跳过重新渲染。

```jsx
import { memo } from 'react';

const App = () => {
    
}

export default memo(App);
```



## 6. React 样式方案

### 1. 内联样式 (Inline Styles)

通过 `style` 属性直接在组件中定义样式。

```jsx
<h1 style={{ color: 'red', backgroundColor: '#eee' }}>你好</h1>
```

### 2. 全局样式

外部的全局样式文件，对于文件名没有特殊要求，按照常规的样式文件后缀名（例如：.css、.scss、.less）即可。
在任意一个组件中通过 import 引入后，都会作用于当前项目中所有的组件。

```jsx
import "index.css";
```

### 3. CSS 模块 (CSS Modules)

CSS 模块允许你为 CSS 类名添加局部作用域，避免样式冲突。文件名通常以 .module.css 结尾。

```css
/* style.module.css */
.container {
  color: red;
}
```

```jsx
import style from "./style.module.css";
<div className={style.container}>{count}</div>
```

### 4. Styled Components

使用 styled-components 库可以在 JavaScript 中编写实际的 CSS，提供了组件级别的样式管理。

### 5. Emotion

Emotion 是一个强大的 CSS-in-JS 库，提供了灵活的样式管理方案。

### 6. Tailwind CSS

Tailwind CSS 是一个实用工具优先的 CSS 框架，可以在 React 项目中使用。

## 补充资料

React 中文官网：https://zh-hans.react.dev/

React Hooks 套件：https://github.com/streamich/react-use

React 基础架构社区方案：https://github.com/kriasoft/react-starter-kit

