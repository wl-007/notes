import React from "react";
import { useCountStore } from "../../stores-zustand/count";

export const BasicBrother = () => {
  // 好处就是，细颗粒度订阅
  const {unit, count} = useCountStore();
  return (
    <div>
      我是basic brother组件，unit:
      {unit}
      count:
      {count}
    </div>
  );
};

export default BasicBrother;