import { useEffect, useState } from 'react';
import { Select, Button, Text, Textarea } from '@chakra-ui/react';
import { useDebugStore } from '../../../stores';
import {
  DEBUGGERLIST,
  DEBUGGER_SAMPLE_PARAMS,
  DEBUGGER_DESCRIPTION,
  DEBUGGER_PARAM_TYPE,
} from '../../../constants/debugFeat';

const IpcDebugger = () => {
  const { tester, setTester, setResult } = useDebugStore();
  const [param, setParam] = useState<any>(null);
  const [parmField, setParamField] = useState<string>(null);

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
    setParamField(e.target.value);
    // setParam(JSON.parse(e.target.value));
  };

  useEffect(() => {
    try {
      setParam(JSON.parse(parmField));
    } catch (e) {
      console.error(e);
    }
  }, [parmField]);

  useEffect(() => {
    setParam(DEBUGGER_SAMPLE_PARAMS[tester] ?? '');
    setParamField(
      JSON.stringify(DEBUGGER_SAMPLE_PARAMS[tester] ?? '', null, 2),
    );
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
        backgroundColor: '#f5f5f5',
        padding: '1rem',
      }}
    >
      <Text fontSize={'4xl'}>AGE-Viewer-2.0 IPC Debugger</Text>
      <Select onChange={handleSelectChange} value={tester}>
        {DEBUGGERLIST.map((item) => (
          <option>{item}</option>
        ))}
      </Select>
      <Text fontSize={'2xl'} marginTop={'3rem'}>
        Feature & description:
      </Text>
      <Text fontSize={'1xl'} marginLeft={'1rem'}>
        {DEBUGGER_DESCRIPTION[tester]}
      </Text>
      <Text fontSize={'2xl'} marginTop={'3rem'}>
        Params:
      </Text>
      <Text fontSize={'1xl'} marginLeft={'1rem'} marginBottom={'1rem'}>
        Param type: {DEBUGGER_PARAM_TYPE[tester]}
      </Text>
      <Textarea
        style={{
          height: '18.75rem',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
        }}
        value={parmField}
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
