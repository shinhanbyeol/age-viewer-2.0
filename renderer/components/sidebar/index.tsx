import React from 'react';
import IpcDebugger from './debugger/Debugger';
import HomeBar from './home/HomeBar';
import Designer from './designer/Designer';

const SidebarRenderer = ({ contents }: { contents: string | number }) => {
  return (
    <>
      <HomeBar visible={contents === 'home'} />
      <Designer visible={contents === 'designer'} />
      <IpcDebugger visible={contents === 'debug'} />
    </>
  );
};

export default SidebarRenderer;
