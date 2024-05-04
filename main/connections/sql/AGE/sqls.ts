import sqls1_5_0 from './1.5.0';

export interface Sqls {
  nodes: string;
  edges: string;
  properties: string;
  labels: string;
}

export type SqlsNames = keyof Sqls;

const sqls = {
  '1.5.0': sqls1_5_0 as Sqls,
};

export default sqls;
