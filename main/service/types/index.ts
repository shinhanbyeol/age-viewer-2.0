export enum AGE_FLAVOR {
  /** Apace AGE [https://age.apache.org/] */
  AGE = 'AGE',
  /** AgensGraph [https://bitnine.net/agensgraph/] */
  AGENSGRAPH = 'AGENSGRAPH',
}
export interface Server_AGE {
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
