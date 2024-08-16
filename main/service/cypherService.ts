import { AGE_FLAVOR } from './types/common';

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

  _convertAgensRowToResult(resultSet: AgensGraphResult): GraphData {
    const nodes = [];
    const edges = [];
    resultSet.rows.forEach((row) => {
      for (const [key, col] of Object.entries(row)) {
        const type = col.constructor.name;
        switch (type) {
          case 'Vertex':
            const vertex = this._convertVertexForAgensGraph(
              col as AgensVertexEdge,
            );
            nodes.push(vertex);
            break;
          case 'Edge':
            const edge = this._convertEdgeForAgensGraph(col as AgensVertexEdge);
            edges.push(edge);
            break;
          case 'Path':
            const path = this._convertPathForAgensGraph(col as AgensPath);
            nodes.push(...path.nodes);
            edges.push(...path.edges);
            break;
          default:
            break;
        }
      }
    });
    return {
      nodes,
      edges,
    };
  }

  _convertAGERowToResult(resultSet) {
    return resultSet.rows.map((row) => {
      let convetedObject = {};
      for (let k in row) {
        if (row[k]) {
          let typeName = row[k].constructor.name;
          if (typeName === 'Path') {
            convetedObject[k] = this._convertPathForAGE(row[k]);
          } else if (typeName === 'Vertex') {
            convetedObject[k] = this._convertVertexForAGE(row[k]);
          } else if (typeName === 'Edge') {
            convetedObject[k] = this._convertEdgeForAGe(row[k]);
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

  _convertVertexForAgensGraph(col: AgensVertexEdge) {
    return {
      key: `${col.id.oid}.${col.id.id}`,
      id: `${col.id.oid}.${col.id.id}`,
      label: col.label,
      properties: col.props,
    };
  }

  _convertEdgeForAgensGraph(col: AgensVertexEdge) {
    return {
      key: `${col.id.oid}.${col.id.id}`,
      id: `${col.id.oid}.${col.id.id}`,
      label: col.label,
      source: `${col.start.oid}.${col.start.id}`,
      target: `${col.end.oid}.${col.end.id}`,
      properties: col.props,
    };
  }

  _convertPathForAgensGraph(col: AgensPath) {
    return {
      nodes: col.vertices.map((vertex) => {
        return {
          key: `${vertex.id.oid}.${vertex.id.id}`,
          id: `${vertex.id.oid}.${vertex.id.id}`,
          label: vertex.label,
          properties: vertex.props,
        };
      }),
      edges: col.edges.map((edge) => {
        return {
          key: `${edge.id.oid}.${edge.id.id}`,
          id: `${edge.id.oid}.${edge.id.id}`,
          label: edge.label,
          source: `${edge.start.oid}.${edge.start.id}`,
          target: `${edge.end.oid}.${edge.end.id}`,
          properties: edge.props,
        };
      }),
    };
  }

  _convertPathForAGE({ vertices, edges, start, end, len }) {
    let result = [];
    // vertex
    for (let idx in vertices) {
      result.push(this._convertVertexForAGE(vertices[idx]));
    }
    // edge
    for (let idx in edges) {
      result.push(this._convertEdgeForAGe(edges[idx]));
    }

    return result;
  }

  _convertEdgeForAGe({ label, id, start, end, props }) {
    return {
      edge: true,
      label: label,
      id: `${id.oid}.${id.id}`,
      start: `${start.oid}.${start.id}`,
      end: `${end.oid}.${end.id}`,
      properties: props,
    };
  }

  _convertVertexForAGE({ label, id, props }) {
    return {
      node: true,
      label: label,
      id: `${id.oid}.${id.id}`,
      properties: props,
    };
  }
}
