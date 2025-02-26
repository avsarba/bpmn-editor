import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useEditor } from '../core/EditorContext';
import Palette from '../components/Palette';
import PropertiesPanel from '../components/PropertiesPanel';
import Toolbar from '../components/Toolbar';
import { registerBPMNNodeTypes } from './bpmn/nodeTypes';

// Import custom node components
import TaskNode from './bpmn/nodes/TaskNode';
import EventNode from './bpmn/nodes/EventNode';
import GatewayNode from './bpmn/nodes/GatewayNode';

// Create a wrapper component that provides the ReactFlow context
function BPMNEditorContent() {
  const editorStore = useEditor();
  
  // Use ReactFlow's internal state for better performance
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  const reactFlowWrapper = useRef(null);
  
  // Register node types
  const nodeTypes = {
    task: TaskNode,
    event: EventNode,
    gateway: GatewayNode,
  };
  
  // Define palette items with BPMN standard icons
  const paletteItems = {
    'Events': [
      { 
        type: 'event', 
        label: 'Start Event', 
        icon: <div className="bpmn-icon bpmn-icon-start-event"></div>,
        data: { eventType: 'start', label: 'Start Event' }
      },
      { 
        type: 'event', 
        label: 'End Event', 
        icon: <div className="bpmn-icon bpmn-icon-end-event"></div>,
        data: { eventType: 'end', label: 'End Event' }
      },
    ],
    'Activities': [
      { 
        type: 'task', 
        label: 'Task', 
        icon: <div className="bpmn-icon bpmn-icon-task"></div>,
        data: { taskType: 'default', label: 'Task' }
      },
      { 
        type: 'task', 
        label: 'User Task', 
        icon: <div className="bpmn-icon bpmn-icon-user-task"></div>,
        data: { taskType: 'user', label: 'User Task' }
      },
      { 
        type: 'task', 
        label: 'Service Task', 
        icon: <div className="bpmn-icon bpmn-icon-service-task"></div>,
        data: { taskType: 'service', label: 'Service Task' }
      },
    ],
    'Gateways': [
      { 
        type: 'gateway', 
        label: 'Exclusive Gateway', 
        icon: <div className="bpmn-icon bpmn-icon-exclusive-gateway"></div>,
        data: { gatewayType: 'exclusive', label: 'Exclusive Gateway' }
      },
      { 
        type: 'gateway', 
        label: 'Parallel Gateway', 
        icon: <div className="bpmn-icon bpmn-icon-parallel-gateway"></div>,
        data: { gatewayType: 'parallel', label: 'Parallel Gateway' }
      },
    ],
  };
  
  // Initialize nodes and edges from store only once
  React.useEffect(() => {
    // Safely check if store nodes and edges exist and have length
    const storeNodes = editorStore.nodes || [];
    const storeEdges = editorStore.edges || [];
    
    if (storeNodes.length > 0) {
      setNodes(storeNodes);
    }
    if (storeEdges.length > 0) {
      setEdges(storeEdges);
    }
  }, []); // Empty dependency array means this runs once on mount
  
  // Update store when nodes or edges change, but use a ref to prevent infinite loops
  const isUpdatingRef = useRef(false);
  
  React.useEffect(() => {
    if (!isUpdatingRef.current && editorStore.setNodes) {
      isUpdatingRef.current = true;
      editorStore.setNodes(nodes);
      isUpdatingRef.current = false;
    }
  }, [nodes, editorStore]);
  
  React.useEffect(() => {
    if (!isUpdatingRef.current && editorStore.setEdges) {
      isUpdatingRef.current = true;
      editorStore.setEdges(edges);
      isUpdatingRef.current = false;
    }
  }, [edges, editorStore]);
  
  const onConnect = useCallback((params) => {
    const newEdge = {
      ...params,
      type: 'default',
      data: { label: 'Flow', flowType: 'sequence' }
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }, [setEdges]);
  
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      
      if (!reactFlowInstance) {
        return;
      }
      
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      
      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
      
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      
      // Find the palette item that matches the type
      let nodeData = { label: `New ${type}` };
      
      // Look through all palette categories to find the matching item
      Object.values(paletteItems).forEach(category => {
        category.forEach(item => {
          if (item.type === type && item.data) {
            // If we find a match, use its data
            nodeData = { ...nodeData, ...item.data };
          }
        });
      });
      
      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: nodeData,
      };
      
      // Update local state
      setNodes((nds) => nds.concat(newNode));
      
      // Also update the store directly to avoid sync issues
      if (editorStore.addNode) {
        editorStore.addNode(newNode);
      }
    },
    [reactFlowInstance, setNodes, editorStore, paletteItems]
  );
  
  const onNodeClick = (event, node) => {
    if (editorStore.setSelectedElement) {
      editorStore.setSelectedElement(node);
    }
  };
  
  const onEdgeClick = (event, edge) => {
    if (editorStore.setSelectedElement) {
      editorStore.setSelectedElement(edge);
    }
  };
  
  const onPaneClick = () => {
    if (editorStore.setSelectedElement) {
      editorStore.setSelectedElement(null);
    }
  };
  
  return (
    <>
      <Palette nodeTypes={paletteItems} />
      
      <div className="editor-content" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onPaneClick={onPaneClick}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
          <Toolbar />
        </ReactFlow>
      </div>
      
      <PropertiesPanel />
    </>
  );
}

// Main component that wraps the editor content with ReactFlowProvider
function BPMNEditor() {
  return (
    <ReactFlowProvider>
      <BPMNEditorContent />
    </ReactFlowProvider>
  );
}

export default BPMNEditor;
