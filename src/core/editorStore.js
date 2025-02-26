import { create } from 'zustand';

const createEditorStore = () => 
  create((set, get) => ({
    // Flow state
    nodes: [],
    edges: [],
    selectedElement: null,
    
    // Editor state
    editorMode: 'default', // default, connecting, etc.
    
    // Registry for node types
    nodeTypes: {},
    
    // Registry for edge types
    edgeTypes: {},
    
    // Registry for property panels
    propertyPanels: {},
    
    // Actions
    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),
    
    addNode: (node) => set((state) => ({ 
      nodes: [...state.nodes, node] 
    })),
    
    updateNode: (id, data) => set((state) => ({
      nodes: state.nodes.map(node => 
        node.id === id ? { ...node, ...data } : node
      )
    })),
    
    removeNode: (id) => set((state) => ({
      nodes: state.nodes.filter(node => node.id !== id),
      edges: state.edges.filter(edge => 
        edge.source !== id && edge.target !== id
      )
    })),
    
    addEdge: (edge) => set((state) => ({ 
      edges: [...state.edges, edge] 
    })),
    
    updateEdge: (id, data) => set((state) => ({
      edges: state.edges.map(edge => 
        edge.id === id ? { ...edge, ...data } : edge
      )
    })),
    
    removeEdge: (id) => set((state) => ({
      edges: state.edges.filter(edge => edge.id !== id)
    })),
    
    setSelectedElement: (element) => set({ selectedElement: element }),
    
    setEditorMode: (mode) => set({ editorMode: mode }),
    
    registerNodeType: (type, config) => set((state) => ({
      nodeTypes: { ...state.nodeTypes, [type]: config }
    })),
    
    registerEdgeType: (type, config) => set((state) => ({
      edgeTypes: { ...state.edgeTypes, [type]: config }
    })),
    
    registerPropertyPanel: (type, component) => set((state) => ({
      propertyPanels: { ...state.propertyPanels, [type]: component }
    })),
    
    // Utility functions
    getNodeById: (id) => get().nodes.find(node => node.id === id),
    getEdgeById: (id) => get().edges.find(edge => edge.id === id),
    
    // Export/Import
    exportDiagram: () => {
      return {
        nodes: get().nodes,
        edges: get().edges
      };
    },
    
    importDiagram: (diagram) => {
      set({
        nodes: diagram.nodes || [],
        edges: diagram.edges || []
      });
    },
    
    // Clear diagram
    clearDiagram: () => set({ nodes: [], edges: [] })
  }));

export default createEditorStore;
