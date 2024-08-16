import React from 'react';
import IpcDebugger from './debugger/Debugger';
import HomeBar from './home/HomeBar';

const SidebarRenderer = ({ contents }: { contents: string | number }) => {
  // switch (contents) {
  //   case 'home':
  //     return <HomeBar />;
  //   case 'debug':
  //     return <IpcDebugger />;
  //   default:
  //     return <></>;
  // }

  return (
    <>
      <HomeBar visible={contents === 'home'} />
      <IpcDebugger visible={contents === 'debug'} />
    </>
  );
};

export default SidebarRenderer;
