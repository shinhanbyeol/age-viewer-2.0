import { useEffect, useState } from 'react';
import { Select, Button, Text, Textarea } from '@chakra-ui/react';
import { useDebugStore } from '../../stores';
import {
  DEBUGGERLIST,
  DEBUGGER_SAMPLE_PARAMS,
} from '../../constants/debugFeat';

const IpcDebugger = () => {
  const { tester, setTester, setResult } = useDebugStore();
  const [param, setParam] = useState<any>(null);

  const handleExecuteTest = () => {
    console.log('🚀' + tester + ': request', param);
    try {
      window.ipc.invoke(tester, param).then((res) => {
        console.log('🚀' + tester + ': response', res);
        setResult(res);
      });
    } catch (e) {
      setResult(e.message);
    }
  };

  const handleOnChangeParams = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setParam(JSON.parse(e.target.value));
  };

  useEffect(() => {
    setParam(DEBUGGER_SAMPLE_PARAMS[tester] ?? '');
  }, [tester]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTester(e.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: '10px',
        padding: '10px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Text fontSize={'4xl'}>AGE-Viewer-2.0 IPC Debgger</Text>
      <Select onChange={handleSelectChange} value={tester}>
        {DEBUGGERLIST.map((item) => (
          <option>{item}</option>
        ))}
      </Select>
      <Text fontSize={'2xl'}>Name : {tester}</Text>
      <Text fontSize={'2xl'}>Params : </Text>
      <Textarea
        style={{
          height: '18.75rem',
        }}
        value={param ? JSON.stringify(param, null, 2) : ''}
        defaultValue={param ? JSON.stringify(param, null, 2) : ''}
        onChange={handleOnChangeParams}
      />
      <br />
      <br />
      <Button onClick={handleExecuteTest}>Click me test</Button>
    </div>
  );
};

export default IpcDebugger;
