import { create } from 'zustand';
import { MultiDirectedGraph } from 'graphology';
import { produce } from 'immer';

interface GraphologyStore {
  graphology?: MultiDirectedGraph;
  nodescount: number;
  edgescount: number;
  layout: string;
  labels: string[];
  // this value must be update when the query is executed (very important thing)
  lastExecutedTime?: number;
  lastInitTime?: number;
}

interface GraphologyActions {
  initGraphology: (g: MultiDirectedGraph) => void;
  updateGraphology: (g: MultiDirectedGraph) => void;
  setLabels: (labels: string[]) => void;
  setNodesCount: (count: number) => void;
  setEdgesCount: (count: number) => void;
  setLastExecutedTime: (time: number) => void;
  setLastInitTime: (time: number) => void;
  setLayout: (layout: string) => void;
}

export type GraphologyStoreType = GraphologyStore & GraphologyActions;

export const defaultGraphologyState: GraphologyStore = {
  graphology: undefined,
  nodescount: 0,
  edgescount: 0,
  labels: [],
  layout: 'random',
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
  setLabels: (labels) => set({ labels }),
  setNodesCount: (count) => set({ nodescount: count }),
  setEdgesCount: (count) => set({ edgescount: count }),
  setLastExecutedTime: (time) => set({ lastExecutedTime: time }),
  setLastInitTime: (time) => set({ lastInitTime: time }),
  setLayout: (layout) => set({ layout }),
}));
