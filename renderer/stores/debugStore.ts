import { create } from 'zustand';

interface DebuggerState {
  tester: string | null;
  result: any;
}

interface DebuggerActions {
  setTester: (tester: string) => void;
  setResult: (result: any) => void;
}

export type DebuggerStore = DebuggerState & DebuggerActions;

export const defaultDebuggerState: DebuggerState = {
  tester: null,
  result: null,
};

export const useDebugStore = create<DebuggerStore>((set) => ({
  ...defaultDebuggerState,
  setTester: (tester: string) => set({ tester }),
  setResult: (result: any) => set({ result }),
}));
