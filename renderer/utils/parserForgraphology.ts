import { keys } from 'lodash';
import { GraphData } from '../hooks/useGraphology';

type Agensrow = {
  [keys: string]: {
    label: string;
    type: 'vertex' | 'edge';
    id: {
      oid: string;
      id: string;
    };
    props: any;
  };
};

interface AgensGraphResult {
  columns: string[];
  commnad: string;
  rowCount: number;
  rows: Agensrow[];
}

export const parseGraphDataByAgensGraph = (
  data: AgensGraphResult,
): GraphData => {
  const nodes = [];
  const edges = [];

  data.rows.forEach((row) => {
    for (const [key, value] of Object.entries(row)) {
      if (value.type === 'vertex') {
        nodes.push({
          key: key,
          id: value.id.id,
          label: value.props.label,
          properties: value.props,
        });
      } else if (value.type === 'edge') {
        edges.push({
          key: key,
          id: value.id.id,
          label: value.props.label,
          source: value.props.source,
          target: value.props.target,
          properties: value.props,
        });
      }
    }
  });

  return {
    nodes,
    edges,
  };
};
