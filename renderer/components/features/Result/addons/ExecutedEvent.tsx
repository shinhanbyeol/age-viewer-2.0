import { useSigma } from '@react-sigma/core';
import { useEffect } from 'react';

const ExecutedEvent = ({ lastExecutedTime }) => {
  const sigma = useSigma();
  useEffect(() => {
    sigma.getCamera().setState({
      x: 0.5,
      y: 0.5,
      angle: 0,
      ratio: 1,
    });
  }, [lastExecutedTime]);
  return <></>;
};

export default ExecutedEvent;
