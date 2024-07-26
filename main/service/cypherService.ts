import { AGE_FLAVOR } from './types';

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

type AGVerteEdgeRow = {
  [keys: string]: AgensVertexEdge;
};

type AgensPath = {
  vertices: AgensVertexEdge[];
  edges: AgensVertexEdge[];
};

type Agensrow = AGVerteEdgeRow | AgensPath;

interface AgensGraphResult {
  fields: { name: string; dataTypeID: number }[];
  rows: Agensrow[];
}
// --end group AgensGraph json format--

export default class CypherService {
  type: AGE_FLAVOR;
  constructor(type) {
    this.type = type;
  }
  createResult(resultSet) {
    let result;

    let targetItem = resultSet;
    if (Array.isArray(resultSet)) {
      targetItem = resultSet.pop();
    }

    let cypherRow = targetItem.rows;
    if (this.type === AGE_FLAVOR.AGE) {
      try {
        cypherRow = this._convertAGERowToResult(targetItem);
      } catch (e) {
        console.error('error: _convertAGERowToResult message: ' + e.message);
      }
    }
    if (this.type === AGE_FLAVOR.AGENSGRAPH) {
      try {
        cypherRow = this._convertAgensRowToResult(targetItem);
      } catch (e) {
        console.error('error: _convertAgensRowToResult message: ' + e.message);
      }
    }
    result = {
      result: cypherRow,
      columns: this._getColumns(targetItem),
      rowCount: this._getRowCount(targetItem),
      command: this._getCommand(targetItem),
    };
    return result;
  }

  _getColumns(resultSet) {
    return resultSet.fields.map((field) => field.name);
  }

  _getRowCount(resultSet) {
    return resultSet.rows.length;
  }

  _getCommand(resultSet) {
    return resultSet.command;
  }

  _convertAGERowToResult(resultSet) {
    return resultSet.rows.map((row) => {
      let convetedObject = {};
      for (let k in row) {
        if (row[k]) {
          let typeName = row[k].constructor.name;
          if (typeName === 'Path') {
            convetedObject[k] = this.convertPath(row[k]);
          } else if (typeName === 'Vertex') {
            convetedObject[k] = this.convertVertex(row[k]);
          } else if (typeName === 'Edge') {
            convetedObject[k] = this.convertEdge(row[k]);
          } else {
            convetedObject[k] = row[k];
          }
        } else {
          convetedObject[k] = null;
        }
      }
      return convetedObject;
    });
  }

  _convertAgensRowToResult(resultSet: AgensGraphResult) {
    const nodes = [];
    const edges = [];

    resultSet.rows.forEach((row) => {
      for (const [key, value] of Object.entries(row)) {
        const type = value.constructor.name;

        if (type === 'Vertex') {
          const col = value as AgensVertexEdge;
          nodes.push({
            key: `${col.id.oid}.${value.id.id}`,
            id: `${col.id.oid}.${value.id.id}`,
            label: col.label,
            properties: col.props,
          });
        } else if (type === 'Edge') {
          const col = value as AgensVertexEdge;
          edges.push({
            key: `${col.id.oid}.${col.id.id}`,
            id: `${col.id.oid}.${col.id.id}`,
            label: col.label,
            source: `${col.start.oid}.${col.start.id}`,
            target: `${col.end.oid}.${col.end.id}`,
            properties: col.props,
          });
        } else if (type === 'Path') {
          const col = value as AgensPath;
          col.vertices.forEach((vertex) => {
            nodes.push({
              key: `${vertex.id.oid}.${vertex.id.id}`,
              id: `${vertex.id.oid}.${vertex.id.id}`,
              label: vertex.label,
              properties: vertex.props,
            });
          });
          col.edges.forEach((edge) => {
            edges.push({
              key: `${edge.id.oid}.${edge.id.id}`,
              id: `${edge.id.oid}.${edge.id.id}`,
              label: edge.label,
              source: `${edge.start.oid}.${edge.start.id}`,
              target: `${edge.end.oid}.${edge.end.id}`,
              properties: edge.props,
            });
          });
        }
      }
    });

    return {
      nodes,
      edges,
    };
  }

  convertPath({ vertices, edges, start, end, len }) {
    let result = [];
    // vertex
    for (let idx in vertices) {
      result.push(this.convertVertex(vertices[idx]));
    }
    // edge
    for (let idx in edges) {
      result.push(this.convertEdge(edges[idx]));
    }

    return result;
  }

  convertEdge({ label, id, start, end, props }) {
    return {
      edge: true,
      label: label,
      id: `${id.oid}.${id.id}`,
      start: `${start.oid}.${start.id}`,
      end: `${end.oid}.${end.id}`,
      properties: props,
    };
  }

  convertVertex({ label, id, props }) {
    return {
      node: true,
      label: label,
      id: `${id.oid}.${id.id}`,
      properties: props,
    };
  }
}
