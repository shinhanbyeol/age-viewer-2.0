/**
 * @description AgensGraph json format
 */
type AgensVertexEdge = {
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

type AgensCols = {
  [keys: string]: AgensVertexEdge;
};

type AgensPath = {
  vertices: AgensVertexEdge[];
  edges: AgensVertexEdge[];
};

type AgensRow = AgensCols | AgensPath;

interface AgensGraphResult {
  fields: { name: string; dataTypeID: number }[];
  rows: AgensRow[];
}
// --end group AgensGraph json format--
