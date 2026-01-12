import { atom } from "jotai";

// count 状态原子 atom
export const countAtom = atom(0);

// 状态原子操作
export const incrementAtom = atom(null, (get, set) => {
  set(countAtom, get(countAtom) + 1);
});

// 状态派生
export const doubleCountAtom = atom((get) => get(countAtom) * 2);

// 异步 atom
export const asyncCountAtom = atom(0, (get, set, arg: number) => {
  setTimeout(() => {
    set(asyncCountAtom, get(asyncCountAtom) + arg);
  }, 1000);
});

/**
 * vue 中的 computed
 * react，useMemo
 */

// export const countAtom = atom(0, (get, set, arg: number) => {
//   set(countAtom, get(countAtom) + arg);
// });

/**
 * jotai 管理复杂状态
 */
export const nameAtom = atom("jotai");
export const ageAtom = atom(18);
export const infoAtom = atom((get) => {
  return {
    name: get(nameAtom),
    age: get(ageAtom),
  };
});
export const personAtom = atom((get) => {
  return get(infoAtom);
});

/**
 * zustand 管理复杂状态
 */
import { create } from "zustand";
export const personStore = create((set) => ({
  name: "zustand",
  age: 18,
  info: {
    get name() {
      return set((state) => state.name);
    },
    get age() {
      return set((state) => state.age);
    },
  },
}));
