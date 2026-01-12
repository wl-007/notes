// useRef，在 React 中有很多用途
// 1. 存储 DOM 元素
// 2. 缓存任意数据
// 3. 避免重复渲染

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

// 用来缓存数据
export const UseRef2 = () => {
  const cacheRef = useRef<number>(0);
  return (
    <div>
      <input
        type="text"
        onChange={(e) => (cacheRef.current = Number(e.target.value))}
      />
      <button
        onClick={() => {
          console.log(cacheRef.current);
        }}
      >
        提交
      </button>
    </div>
  );
};

// export default function useMountedState(): () => boolean {
//   const mountedRef = useRef<boolean>(false);
//   const get = useCallback(() => mountedRef.current, []);

//   useEffect(() => {
//     mountedRef.current = true;

//     return () => {
//       mountedRef.current = false;
//     };
//   }, []);

//   return get;
// }
// 用来重复渲染
export const UseRef3 = () => {
  const mountedRef = useRef<boolean>(false);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!mountedRef.current) {
      setCount((count) => count + 1);
    }
  }, []);

  return <div>{count}</div>;
};
