import { useCallback, useEffect, useState } from 'react';
import {
  createConnectionResponse,
  IPCResponse,
  ServerResponse,
} from '../../../types';

import { Accordion, ButtonSpinner } from '@chakra-ui/react';
import { useServerOfSessionStore } from '../../../stores';
import Graph from '../GraphItem';

interface props {
  server: ServerResponse;
}

const ServerPanel = ({ server }) => {
  const { serverList, addServerSession } = useServerOfSessionStore();
  const [sessionId, setSessionId] = useState(
    serverList.find((s) => s.id === server.id)?.sessionId ?? null,
  );
  const [graphPaths, setGraphPaths] = useState([]);

  const [isConnecting, setIsConnecting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const connecting = useCallback(async () => {
    setIsConnecting(true);
    await window.ipc
      .invoke('createConnnection', server)
      .then((res: IPCResponse<createConnectionResponse>) => {
        if (res?.success) {
          setSessionId(res.data.sessionId);
          addServerSession({
            id: server.id,
            type: server.serverType,
            sessionId: res.data.sessionId,
          });
        } else {
          setIsError(true);
          setErrorMessage(res.message);
        }
      })
      .catch((err) => {
        setIsError(true);
        setErrorMessage(err.message);
      });
    setIsConnecting(false);
  }, []);

  useEffect(() => {
    if (!sessionId) {
      connecting();
    } else {
      window.ipc
        .invoke('getGraphs', sessionId)
        .then((res: IPCResponse<any[]>) => {
          if (res?.success) {
            const isArray = Array.isArray(res.data);
            if (isArray) {
              setGraphPaths(res.data);
            } else {
              setIsError(true);
              setErrorMessage(res.message);
            }
          } else {
            setIsError(true);
            setErrorMessage(res.message);
          }
        });
    }
  }, [sessionId]);

  return (
    <>
      {isConnecting && <ButtonSpinner />}
      {errorMessage && isError && <p>{errorMessage}</p>}
      {/* {sessionId && <p>Session ID: {sessionId}</p>} */}
      <Accordion allowMultiple>
        {graphPaths.map((gpath, index) => (
          <Graph
            key={`graph-${index}`}
            graphPathName={gpath}
            server={server}
            sessionId={sessionId}
          />
        ))}
      </Accordion>
    </>
  );
};

export default ServerPanel;
