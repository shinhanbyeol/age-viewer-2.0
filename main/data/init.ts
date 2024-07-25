const tb_servers = `
CREATE TABLE IF NOT EXISTS tb_servers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  server_type TEXT,
  version TEXT,
  name TEXT NOT NULL,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  user TEXT NOT NULL,
  password TEXT NOT NULL,
  database TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
`;

const tb_workspaces = `
CREATE TABLE IF NOT EXISTS tb_workspaces (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  server_id INTEGER NOT NULL,
  graph TEXT,
  name TEXT NOT NULL,
  sql_path TEXT,
  json_path TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
`;

const initSqls = [tb_servers, tb_workspaces];

export const initTableCount = initSqls.length + 1;
export default initSqls;
