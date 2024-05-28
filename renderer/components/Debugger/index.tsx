'use client';
import { Button, Input, Text } from '@chakra-ui/react';

interface DebuggerProps {
  type: string;
  data: any;
  name: string;
}

const Debugger = ({ type, data, name }: DebuggerProps) => {
  return (
    <div
      style={{
        margin: '10px',
        padding: '10px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Text fontSize={'2xl'}>Type : {type}</Text>
      <Text fontSize={'2xl'}>Name : {name}</Text>
      <Text fontSize={'2xl'}>Params : </Text>
      
      <br />
      <Button onClick={() => console.log(data)}>Click me test</Button>
      <br />

      <hr />
      <Text fontSize={`4xl`}>Debugger</Text>
      <hr />
      <br />
      <br />
      <pre
        style={{
          backgroundColor: '#f5f5f5',
          padding: '10px',
          borderRadius: '5px',
          overflow: 'auto',
        }}
      >
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Debugger;
