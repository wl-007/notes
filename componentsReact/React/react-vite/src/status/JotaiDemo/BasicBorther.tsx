import React from "react";
import { ageAtom } from "../../stores-jotai/count";
import { useAtomValue } from "jotai";

export const BasicBrother = () => {
  // 好处就是，细颗粒度订阅
  const age = useAtomValue(ageAtom);
  return (
    <div>
      我是basic brother组件，age:
      {age}
    </div>
  );
};

export default BasicBrother;