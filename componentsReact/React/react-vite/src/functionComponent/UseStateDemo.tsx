import { useCallback, useEffect, useState } from "react";

import style from "./style.module.css";
interface UseStateDemoProps {
  onChange: (value: number) => void;
}

export const UseStateDemo = (props: UseStateDemoProps) => {
  const [count, setCount] = useState(0);
  const handleAdd = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const handleSub = useCallback(() => {
    setCount((c) => c - 1);
  }, []);

  //   副作用，状态发生变化以后，要引起一些其他变化
  useEffect(() => {
    props.onChange(count);
  }, [count]);

  return (
    <div>
      <div className={style.container}>{count}</div>
      <input
        type="text"
        value={count}
        onChange={(ev) => setCount(Number(ev.target.value))}
      />
      <button onClick={handleAdd}>++</button>
      <button onClick={handleSub}>-</button>
    </div>
  );
};
