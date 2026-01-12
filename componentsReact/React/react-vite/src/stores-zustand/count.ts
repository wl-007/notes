import { create } from "zustand";

interface CountStore {
  count: number;
  unit: number;
  increment: () => void;
}

export const useCountStore = create<CountStore>((set) => ({
  count: 0,
  unit: 1,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

