import React from 'react';
import IpcDebugger from './Debugger';

const SidebarRenderer = ({ contents }: { contents: string | number }) => {
  switch (contents) {
    case 'home':
      return <>Sidebar: {contents}</>;
    case 'debug':
      return <IpcDebugger />;
    default:
      return <></>;
  }
};

export default SidebarRenderer;
