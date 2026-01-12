# React进阶

## 1. 常用的hooks

### ref

1. `ref` 是 React 提供的一种机制，用于访问和操作 DOM 元素或 React 组件的实例。它可以用于获取某个 DOM 元素的引用，从而执行一些需要直接操作 DOM 的任务，例如手动设置焦点、选择文本或触发动画。
2. 用来存储值，react 中并不是所有的数据都是状态，也有一些数据渲染时很重要但并不是状态数据

```tsx
import {useRef, useEffect} from 'react'

function RefDemo() {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
   <>
    <div>RefDemo</div>
    <input type="text" ref={inputRef} />
   </>
  )
}

export default RefDemo
```

### forwardRef【react19 弃用改用 props 传值】

`forwardRef ` 是一个用于转发 ref 到子组件的方式，它允许父组件访问子组件的 DOM 节点或组件实例。它常用于封装第三方 UI 库组件或实现高阶组件。

```tsx
// Ract 19
import React, { forwardRef, useRef, useImperativeHandle  } from "react";

const TestCommponent19 = ({ref}) => {
  return (
    <div>
      <input type="text" ref={ref} />
    </div>
  );
};

function ForwardRefDemo() {
  const testRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    console.log(testRef.current);
    testRef.current.log()
    testRef.current?.focus()
  };
  return (
    <>
      <div onClick={handleClick}>ForwardRefDemo</div>
      <TestCommponent19 ref={testRef}  />
    </>
  );
}

export default ForwardRefDemo;

```



```tsx
// Reat18
import React, { forwardRef, useRef } from "react";

const TestCommponent = forwardRef((props, ref) => {
  return (
    <div>
      <input type="text" ref={ref} />
    </div>
  );
});

function ForwardRefDemo() {
  const testRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    console.log(testRef.current);
  };
  return (
    <>
      <div onClick={handleClick}>ForwardRefDemo</div>
      <TestCommponent ref={testRef}  />
    </>
  );
}

export default ForwardRefDemo;

```

### useContext

用于在函数组件中访问上下文（context）。

```TSX
import React, {useState} from "react";

const ThemeContext = React.createContext("light");

function ThemedButton() {
  const theme = React.useContext(ThemeContext);
  return <button style={{ backgroundColor: theme }}>{theme}</button>;
}
function UseContext(props) {
  const [themeVal, setThemeVal] = useState("light");
  return (
    <ThemeContext.Provider value={themeVal}>
      <div onClick={() => setThemeVal(themeVal === "light" ? "dark" : "light")}>UseContext</div>
      {themeVal}
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

export default UseContext;

```

### useId

`useId` 是一个用于生成唯一 ID 的 Hook，通常用于无障碍特性（例如绑定`label` 和 `input`）。

```tsx
import React, { useId } from 'react'

function UseIdDemo() {
  const id = useId()
  return (
    <>
    <div>UseIdDemo</div>
    <label htmlFor={id}>name</label>
    <input type="text" id={id} />
    </>
  )
}

export default UseIdDemo
```

### useTransition

`useTransition `是一个用于处理 UI 过渡的 Hook，允许你将某些更新标记为过渡，从而避免阻塞界面。

```tsx
import React, { useState, useTransition } from 'react'

function UseTransitionDemo() {
  const [isPending, startTransition] = useTransition()
  const [tab, setTab] = useState(0);
  const handleClick = () => {
    startTransition(() => {
      setTab(c => c + 1)
    })
  }
  return (
    <div>UseTransitionDemo

      <button onClick={handleClick}>{tab}</button>
      {isPending ? <div>loading...</div>:<p>当前tab: {tab}</p>}
      
    </div>
  )
}

export default UseTransitionDemo
```



### useDeferredValue

`useDeferredValue` 的核心原理是利用 React 的并发渲染和优先级调度系统，通过维护值的多个版本来实现非阻塞的用户体验。

与 `useTransition` 相比，`useDeferredValue` 更适用于优化值的消费端，特别是在处理从父组件传递下来的 props 时。两者都是 React 并发模式中的重要工具，共同为构建流畅的用户界面提供了强大的基础。

```tsx
import React, { useDeferredValue, useState } from 'react'

function UseDeferredValueDemo() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  return (
    <div>
      UseDeferredValueDemo
        <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      当前值: {query}
      延迟值: {deferredQuery}
    </div>
  )
}

export default UseDeferredValueDemo
```

## 2. 自定义hook

自定义 Hook，实际上就是自己创建一个函数。但是 Hook 函数和普通函数的区别在于：

1. Hook 函数命名时必须以 use 开头；
2. Hook 函数可以使用其他的 Hook 方法，但是普通函数中不行；

**示例**

```tsx
import { useState } from "react";

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
}

```

## 3. HOC 高阶组件

高阶组件本质上是一个函数，它和普通的区别在于：

1. 该函数需要接收一个组件作为参数
2. 最终需要返回一个功能增强的组件

**封装权限组件**

```tsx
const withAuth = (Component) => (props) => {
    const { role } = JSON.parse(localStorage.userInfo || '{}');
    if (role.name == '超级管理员') {
        return <Component {...props} />
    }
    // return null;  // 不显示按钮
    // 显示禁用按钮
    return <Component disabled={true} {...props} />
}
export default withAuth;
```



