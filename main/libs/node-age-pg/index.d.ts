import { Client } from 'pg';
import pgTypes from 'pg-types';
declare function AGTypeParse(input: string): (any[] | Map<string, any>) | undefined;
declare function setAGETypes(client: Client, types: typeof pgTypes): Promise<void>;
export { setAGETypes, AGTypeParse };
