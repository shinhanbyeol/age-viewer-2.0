import { create } from 'zustand';
import { produce } from 'immer';

interface DesginerSettings {
  color: string;
  text: string;
  size: number;
}

interface WorkspaceStore {
  workspace: string;
  workspaceSqlPath?: string;
  workspaceJsonPath?: string;
  desginer: {
    [keys: string]: DesginerSettings;
  };
}

interface WorkspaceActions {
  setWorkspace: (workspace: string) => void;
  setWorkspaceSqlPath: (workspaceSqlPath: string) => void;
  setWorkspaceJsonPath: (workspaceJsonPath: string) => void;
  setDesginer: (label: string, settings: DesginerSettings) => void;
}

export type WorkspaceStoreType = WorkspaceStore & WorkspaceActions;

export const defaultWorkspaceState: WorkspaceStore = {
  workspace: '',
  desginer: {},
};

export const useWorkspaceStore = create<WorkspaceStoreType>((set) => ({
  ...defaultWorkspaceState,
  setWorkspace: (workspace) => set({ workspace }),
  setWorkspaceSqlPath: (workspaceSqlPath) => set({ workspaceSqlPath }),
  setWorkspaceJsonPath: (workspaceJsonPath) => set({ workspaceJsonPath }),
  setDesginer: (label, settings) =>
    set(
      produce((state) => {
        state.desginer[label] = settings;
      }),
    ),
}));
