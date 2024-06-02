'use client';
import { Button, Text, Textarea } from '@chakra-ui/react';
import { useDebugStore } from '../../../stores';
import { DEBUGGER_SAMPLE_PARAMS } from '../../../constants/debugFeat';
import { useEffect, useState } from 'react';

const Debugger = () => {
  const { result } = useDebugStore();

  return (
    <div
      style={{
        flex: 1,
        padding: '10px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <pre
        style={{
          backgroundColor: '#f5f5f5',
          borderRadius: '5px',
          overflow: 'auto',
        }}
      >
        <code>{JSON.stringify(result, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Debugger;
