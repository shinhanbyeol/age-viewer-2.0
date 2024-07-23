// common types set
export enum AGE_FLAVOR {
  /** Apace AGE [https://age.apache.org/] */
  AGE = 'AGE',
  /** AgensGraph [https://bitnine.net/agensgraph/] */
  AGENSGRAPH = 'AGENSGRAPH',
}

// response types of ipc

// get server list response
export interface ServerResponse {
  id: number;
  serverType?: AGE_FLAVOR;
  version?: string;
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  created_at: string;
  updated_at: string;
}

// createConnection response
export interface createConnectionResponse {
  sessionId: string | null;
  success: boolean;
  error: boolean;
  message: string;
  stack: string | null;
}
