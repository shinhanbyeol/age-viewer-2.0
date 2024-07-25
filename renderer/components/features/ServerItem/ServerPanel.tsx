import { Accordion, ButtonSpinner } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { createConnectionResponse, ServerResponse } from '../../../types';
import { useServerOfSessionStore } from '../../../stores/serverofSessionStore';
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
      .then((res: createConnectionResponse) => {
        if (res.success) {
          setSessionId(res.sessionId);
          addServerSession({
            id: server.id,
            type: server.serverType,
            sessionId: res.sessionId,
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
      window.ipc.invoke('getGraphs', sessionId).then((res) => {
        setGraphPaths(res);
      });
    }
  }, [sessionId]);

  return (
    <>
      {isConnecting && <ButtonSpinner />}
      {errorMessage && isError && <p>{errorMessage}</p>}
      {/* {sessionId && <p>Session ID: {sessionId}</p>} */}
      <Accordion allowMultiple>
        {graphPaths.map((gpath) => (
          <Graph graphPathName={gpath} server={server} sessionId={sessionId} />
        ))}
      </Accordion>
    </>
  );
};

export default ServerPanel;
