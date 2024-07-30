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
import _, { debounce } from 'lodash';
import useGraphology from '../../../hooks/useGraphology';
import { ExecuteQueryResponseBy } from '../../../types';
import { useGraphologyStore } from '../../../stores';

interface CodeEditorProps {
  workspaceSqlPath: string;
  graph: string;
  sessionId: string;
}

const CodeEditor = ({
  workspaceSqlPath,
  sessionId,
  graph,
}: CodeEditorProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const rootRef = useRef<HTMLDivElement>(null);
  const { importGraphologyData } = useGraphology();
  const { setEdgesCount, setNodesCount, setLastExecutedTime } =
    useGraphologyStore();

  const handleOnFocusAtEditor = () => {
    setExpanded(true);
  };

  /**
   * @description Close the editor when clicking outside
   */
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    },
    [rootRef, setExpanded],
  );

  /**
   * @description Save SQL file
   * @param value
   */
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

  /**
   * @description Run Query
   * @param value
   */
  const handleRunQuery = useMemo(() => {
    return debounce((value: string) => {
      window.ipc
        .invoke('excuteQuery', {
          sessionId: sessionId,
          graph: graph,
          query: value,
        })
        .then((res: ExecuteQueryResponseBy) => {
          if (res) {
            importGraphologyData(res.result);
            setNodesCount(res.result.nodes.length);
            setEdgesCount(res.result.edges.length);
            setLastExecutedTime(Date.now());
          }
        });
    }, 500);
  }, [
    sessionId,
    graph,
    importGraphologyData,
    setNodesCount,
    setEdgesCount,
    setLastExecutedTime,
  ]);

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

  useEffect(() => {
    if (expanded) {
      window.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setExpanded(false);
        }
      });
      window.addEventListener('keydown', (e: KeyboardEvent) => {
        // ctrl + enter or cmd + enter
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          handleRunQuery(code);
        }
        // press f5
        if (e.key === 'F5') {
          handleRunQuery(code);
        }
      });
      window.removeEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          setExpanded(true);
        }
      });
    } else {
      window.removeEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setExpanded(false);
        }
      });
      window.removeEventListener('keydown', (e: KeyboardEvent) => {
        // ctrl + enter or cmd + enter
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          handleRunQuery(code);
        }
        // press f5
        if (e.key === 'F5') {
          handleRunQuery(code);
        }
      });
      window.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          setExpanded(true);
        }
      });
    }
  }, [expanded]);

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
          <Button
            backgroundColor={'#63b3ed'}
            leftIcon={<PiPlay />}
            onClick={() => {
              handleRunQuery(code);
            }}
          >
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
            setCode(value);
            handleSaveSql(value);
          }}
        />
      </div>
      <Box></Box>
    </div>
  );
};

export default CodeEditor;
