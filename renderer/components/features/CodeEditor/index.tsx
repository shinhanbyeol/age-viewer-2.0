import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { Box, Button } from '@chakra-ui/react';

// Styles
import Styles from './CodeEditor.module.scss';
import { PiPlay } from 'react-icons/pi';
import { debounce } from 'lodash';

interface CodeEditorProps {
  workspaceSqlPath: string;
}

const CodeEditor = ({ workspaceSqlPath }: CodeEditorProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const rootRef = useRef<HTMLDivElement>(null);

  const handleOnFocusAtEditor = () => {
    setExpanded(true);
  };

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    },
    [rootRef, setExpanded],
  );

  const handleSaveSql = useMemo(() => {
    return debounce((value: string) => {
      window.ipc
        .invoke('writeFile/fullPath', {
          filePath: workspaceSqlPath,
          fileData: value,
        })
        .then((res) => {});
    }, 500);
  }, [workspaceSqlPath]);

  // 포커스 관련 이벤트 등록
  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    window.ipc.invoke('readFile/fullPath', workspaceSqlPath).then((res) => {
      typeof res === 'string' ? setCode(res) : setCode('');
    });
  }, [workspaceSqlPath]);

  return (
    <div
      ref={rootRef}
      className={`${Styles.Root} ${expanded ? Styles.Expand : ''}`}
    >
      {expanded && (
        <Box
          pl={'1rem'}
          pr={'1rem'}
          pb={2}
          display={'flex'}
          justifyContent={'flex-end'}
        >
          <Button backgroundColor={'#63b3ed'} leftIcon={<PiPlay />}>
            Run Query
          </Button>
        </Box>
      )}
      <div className={`${Styles.Editor}`}>
        <CodeMirror
          value={code}
          lang="cypher"
          height="100%"
          onFocus={handleOnFocusAtEditor}
          onChange={(value) => {
            handleSaveSql(value);
          }}
        />
      </div>
      <Box></Box>
    </div>
  );
};

export default CodeEditor;
