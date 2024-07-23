import sqls2_14 from './2.14';

export interface Sqls {
  nodes: string;
  edges: string;
  properties: string;
  labels: string;
  graphs: string;
}

export type SqlsNames = keyof Sqls;

const sqls = {
  '2.14': sqls2_14 as Sqls,
};

export default sqls;
