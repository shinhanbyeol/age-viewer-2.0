enum AGE_FLAVOR {
  AGE = 'AGE',
  BLUE = 'BLUE',
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
