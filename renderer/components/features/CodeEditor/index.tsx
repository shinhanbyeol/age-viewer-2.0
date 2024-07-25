import React, { useCallback, useEffect, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { Box, Button } from '@chakra-ui/react';

// Styles
import Styles from './CodeEditor.module.scss';
import { PiPlay } from 'react-icons/pi';

const CodeEditor = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleOnFocusAtEditor = () => {
    setExpanded(true);
  };

  const handleOnBlurAtEditor = () => {
    // setExpanded(false);
  };

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    },
    [rootRef, setExpanded],
  );

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div ref={rootRef} className={`${Styles.Root} ${expanded ? Styles.Expand : ''}`}>
      {expanded && (
        <Box
          pl={'1rem'}
          pr={'1rem'}
          pb={2}
          display={'flex'}
          justifyContent={'flex-end'}
        >
          <Button leftIcon={<PiPlay />}>Run Query</Button>
        </Box>
      )}
      <div className={`${Styles.Editor}`}>
        <CodeMirror
          lang="cypher"
          height="100%"
          onFocus={handleOnFocusAtEditor}
        />
      </div>
      <Box></Box>
    </div>
  );
};

export default CodeEditor;
