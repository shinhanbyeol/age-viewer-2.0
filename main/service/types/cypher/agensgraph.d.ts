/**
 * @description AgensGraph json format
 */
export type AgensVertexEdge = {
  label: string;
  start?: {
    oid: string;
    id: string;
  };
  end?: {
    oid: string;
    id: string;
  };
  id: {
    oid: string;
    id: string;
  };
  props: any;
};

export type AgensCols = {
  [keys: string]: AgensVertexEdge;
};

export type AgensPath = {
  vertices: AgensVertexEdge[];
  edges: AgensVertexEdge[];
};

export type AgensRow = AgensCols | AgensPath;

export interface AgensGraphResult {
  fields: { name: string; dataTypeID: number }[];
  rows: AgensRow[];
}
// --end group AgensGraph json format--
