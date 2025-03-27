import { create } from 'zustand';
import { produce } from 'immer';

export interface DesignerSettings {
  color: string;
  text: string;
  size: number;
}

interface WorkspaceStore {
  workspace: string;
  workspaceSqlPath?: string;
  workspaceJsonPath?: string;
  designer: {
    [keys: string]: DesignerSettings;
  };
}

interface WorkspaceActions {
  setWorkspace: (workspace: string) => void;
  setWorkspaceSqlPath: (workspaceSqlPath: string) => void;
  setWorkspaceJsonPath: (workspaceJsonPath: string) => void;
  setDesigner: (label: string, settings: DesignerSettings) => void;
  initDesigner: (designer: { [keys: string]: DesignerSettings }) => void;
}

export type WorkspaceStoreType = WorkspaceStore & WorkspaceActions;

export const defaultWorkspaceState: WorkspaceStore = {
  workspace: '',
  designer: {},
};

export const useWorkspaceStore = create<WorkspaceStoreType>((set) => ({
  ...defaultWorkspaceState,
  setWorkspace: (workspace) => set({ workspace }),
  setWorkspaceSqlPath: (workspaceSqlPath) => set({ workspaceSqlPath }),
  setWorkspaceJsonPath: (workspaceJsonPath) => set({ workspaceJsonPath }),
  setDesigner: (label, settings) =>
    set(
      produce((state) => {
        state.designer[label] = settings;
      }),
    ),
  initDesigner: (designer) =>
    set(
      produce((state) => {
        state.designer = designer;
      }),
    ),
}));
