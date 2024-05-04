const initSql = `
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

export default initSql;
