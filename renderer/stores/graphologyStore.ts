import { create, StoreApi } from 'zustand';
import { MultiDirectedGraph } from 'graphology';
import { produce } from 'immer';

interface GraphologyStore {
  graphology?: MultiDirectedGraph;
  nodescount: number;
  edgescount: number;
  // this value must be update when the query is executed (very important thing)
  lastExecutedTime?: number;
  lastInitTime?: number;
}

interface GraphologyActions {
  initGraphology: (g: MultiDirectedGraph) => void;
  updateGraphology: (g: MultiDirectedGraph) => void;
  setNodesCount: (count: number) => void;
  setEdgesCount: (count: number) => void;
  setLastExecutedTime: (time: number) => void;
  setLastInitTime: (time: number) => void;
}

export type GraphologyStoreType = GraphologyStore & GraphologyActions;

export const defaultGraphologyState: GraphologyStore = {
  graphology: undefined,
  nodescount: 0,
  edgescount: 0,
  lastExecutedTime: undefined,
};

export const useGraphologyStore = create<GraphologyStoreType>((set) => ({
  ...defaultGraphologyState,
  initGraphology: (g) =>
    set(
      produce((state) => {
        state.graphology = g;
      }),
    ),
  updateGraphology: (g) =>
    set(
      produce((state) => {
        state.graphology = g;
      }),
    ),
  setNodesCount: (count) => set({ nodescount: count }),
  setEdgesCount: (count) => set({ edgescount: count }),
  setLastExecutedTime: (time) => set({ lastExecutedTime: time }),
  setLastInitTime: (time) => set({ lastInitTime: time }),
}));
