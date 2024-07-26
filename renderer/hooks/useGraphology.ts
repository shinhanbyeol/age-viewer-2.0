import { MultiDirectedGraph } from 'graphology';
import { useGraphologyStore } from '../stores/graphologyStore';
import { useStore } from 'zustand';

export type Vertex = {
  key: string;
  id: string;
  label: string;
  properties: {
    [keys: string]: any;
  };
};

export type Edge = {
  key: string;
  id: string;
  label: string;
  source: string;
  target: string;
  properties: {
    [keys: string]: any;
  };
};

export type GraphData = {
  nodes: Vertex[];
  edges: Edge[];
};

const useGraphology = () => {
  const graphology = useGraphologyStore((state) => state.graphology);

  /**
   * @description Initialize graphology instance
   * @returns {void}
   */
  function initGraphology(
    workSpaceName: string,
    graphname: string,
    serverId: number,
  ) {
    const g = new MultiDirectedGraph({
      allowSelfLoops: true,
    });
    g.setAttribute('workspace', workSpaceName);
    g.setAttribute('graph', graphname);
    g.setAttribute('serverId', serverId);
    useGraphologyStore.setState({ graphology: g });
  }

  /**
   * @description Import graphology data
   * @param {GraphData} data
   * @returns {void}
   */
  function importGraphologyData(data: GraphData) {
    if (!graphology) return;
    graphology.clear();
    data.nodes.forEach((node) => {
      graphology.mergeNode(node.key, {
        id: node.id,
        label: node.label,
        propperties: node.properties,
        x: 0,
        y: 0,
      });
    });
    data.edges.forEach((edge) => {
      graphology.mergeEdgeWithKey(edge.key, edge.source, edge.target, {
        id: edge.id,
        label: edge.label,
        properties: edge.properties,
      });
    });
    useGraphologyStore.setState({ graphology: graphology });
  }

  return {
    graphology,
    initGraphology,
    importGraphologyData,
  };
};

export default useGraphology;
