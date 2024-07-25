export enum AGE_FLAVOR {
  /** Apace AGE [https://age.apache.org/] */
  AGE = 'AGE',
  /** AgensGraph [https://bitnine.net/agensgraph/] */
  AGENSGRAPH = 'AGENSGRAPH',
}
// underscore prefix meaning sqlite return type
export interface _Server {
  id: string;
  name: string;
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  server_type: AGE_FLAVOR;
  version: string;
}

export interface Server {
  id: string;
  name: string;
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  serverType: AGE_FLAVOR;
  version: string;
}

export interface _Workspace {
  id: string;
  server_id: string;
  graph: string;
  name: string;
  sql_path: string;
  json_path: string;
  created_at: string;
  updated_at: string;
}

export interface Workspace {
  id: string;
  serverId: string;
  graph: string;
  name: string;
  sqlPath: string;
  jsonPath: string;
  createdAt: string;
  updatedAt: string;
}
