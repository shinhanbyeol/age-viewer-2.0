const sqls = {
  nodes: `
  SELECT label, count(label)::INTEGER as cnt
  FROM (
           SELECT ag_catalog._label_name(oid, v)::text as label
           from cypher('%s', $$
               MATCH (V:_ag_label_vertex)
               RETURN id(V)
               $$) as (V agtype), (SELECT oid FROM ag_catalog.ag_graph where name = '%s') as oid
       ) b
  GROUP BY b.label;
  `,
  edges: `
  SELECT label, count(label)::INTEGER as cnt
  FROM (
           SELECT ag_catalog._label_name(oid, v)::text as label
           from cypher('%s', $$
               MATCH ()-[V]-()
               RETURN id(V)
               $$) as (V agtype), (SELECT oid FROM ag_catalog.ag_graph where name = '%s') as oid
       ) b
  GROUP BY b.label;
  `,
  properties: `select * from (SELECT null as key, null as keytype) A limit 0;`,
  labels: `SELECT oid as la_oid, name as la_name, kind as la_kind FROM ag_catalog.ag_label;`,
};

export default sqls;
