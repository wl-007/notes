import React from "react";
import {
  asyncCountAtom,
  countAtom,
  doubleCountAtom,
  incrementAtom,
  ageAtom,
} from "../../stores-jotai/count";
import { useAtom, useAtomValue } from "jotai";

export const Basic = () => {
  // 好处就是，细颗粒度订阅
  const [age, setAge] = useAtom(ageAtom);
  const count = useAtomValue(countAtom);
  const double = useAtomValue(doubleCountAtom);
  const [asyncCount, update] = useAtom(asyncCountAtom);
  const [, increment] = useAtom(incrementAtom);
  return (
    <div>
      {count}---{double}---
      <div>
        异步派生：
        {asyncCount}
        <button onClick={() => update(1)}>async increment</button>
      </div>
      <button onClick={increment}>increment</button>
      <button onClick={()=>setAge(c=> c+1)}>setAge</button>
      age: {age}
    </div>
  );
};


export default Basic;