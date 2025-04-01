const sqls = {
  nodes: `
  MATCH (v) RETURN DISTINCT label(v) AS label, count(v) AS cnt
  ORDER BY label;
  `,
  edges: `
  MATCH (v)-[e]-(v2) RETURN DISTINCT label(e) AS label, count(e) AS cnt
  ORDER BY label;
  `,
  properties: `select * from (SELECT null as key, null as keytype) A limit 0;`,
  labels: `SELECT oid as la_oid, labname as la_name, labkind as la_kind FROM pg_catalog.ag_label;`,
  graphs: `SELECT nspname, pg_authid.rolname as schemaowner
  FROM pg_namespace join pg_authid on pg_authid.oid = pg_namespace.nspowner
  join pg_catalog.ag_graph on pg_namespace.oid = ag_graph.nspid;`,
};

export default sqls;
