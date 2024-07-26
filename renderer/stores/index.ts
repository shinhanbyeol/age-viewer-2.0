import { useDebugStore } from './debugStore';
import { useServerOfSessionStore } from './serverofSessionStore';
import { useGraphologyStore } from './graphologyStore';

const stores = {
  useDebugStore,
  useServerOfSessionStore,
  useGraphologyStore,
};

export { useDebugStore, useServerOfSessionStore, useGraphologyStore };
export default stores;
