export default class CypherService {
  type;
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
    if (this.type === 'age') {
      try {
        cypherRow = this._convertAGERowToResult(targetItem);
      } catch (e) {
        console.error('error: _convertAGERowToResult message: ' + e.message);
      }
    }
    result = {
      rows: cypherRow,
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
    return resultSet.rowCount;
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
