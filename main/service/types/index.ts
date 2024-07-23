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