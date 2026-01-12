import React from "react";
import { useCountStore } from "../../stores-zustand/count";

export const Basic = () => {
  // 好处就是，细颗粒度订阅
  const count = useCountStore((state) => state.count);
  const increment = useCountStore((state) => state.increment);
  return (
    <div>
      {count}
      <button onClick={increment}>increment</button>
    </div>
  );
};

export default Basic;