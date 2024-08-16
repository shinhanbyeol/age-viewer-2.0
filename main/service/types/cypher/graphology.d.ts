/**
 * @description Graphology json format
 * @see https://graphology.github.io/serialization.html#import
 */
export type Vertex = {
  key: string;
  id: string;
  label: string;
  properties: {
    [keys: string]: any;
  };
};

export type Edge = {
  key: string;
  id: string;
  label: string;
  source: string;
  target: string;
  properties: {
    [keys: string]: any;
  };
};

export type GraphData = {
  nodes: Vertex[];
  edges: Edge[];
};
// --end group Graphology json format--