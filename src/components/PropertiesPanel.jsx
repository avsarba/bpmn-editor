import React from 'react';
import { useEditor } from '../core/EditorContext';

function PropertiesPanel() {
  const editorStore = useEditor();
  const selectedElement = editorStore.selectedElement;
  
  if (!selectedElement) {
    return (
      <div className="properties-panel">
        <div className="properties-panel-header">Properties</div>
        <div style={{ padding: '10px', color: '#666' }}>
          Select an element to view its properties
        </div>
      </div>
    );
  }
  
  const handlePropertyChange = (property, value) => {
    if (!selectedElement) return;
    
    const newData = {
      ...selectedElement.data,
      [property]: value
    };
    
    if (selectedElement.source) {
      // It's an edge
      editorStore.updateEdge?.(selectedElement.id, { data: newData });
    } else {
      // It's a node
      editorStore.updateNode?.(selectedElement.id, { data: newData });
    }
  };
  
  return (
    <div className="properties-panel">
      <div className="properties-panel-header">Properties</div>
      
      <div className="properties-content">
        <div className="property-group">
          <div className="property-group-title">General Properties</div>
          
          <div className="property-row">
            <label className="property-label">ID</label>
            <input 
              className="property-input" 
              value={selectedElement.id} 
              disabled 
            />
          </div>
          
          <div className="property-row">
            <label className="property-label">Type</label>
            <input 
              className="property-input" 
              value={selectedElement.type} 
              disabled 
            />
          </div>
          
          {selectedElement.data?.label !== undefined && (
            <div className="property-row">
              <label className="property-label">Name</label>
              <input 
                className="property-input" 
                value={selectedElement.data.label || ''} 
                onChange={(e) => handlePropertyChange('label', e.target.value)} 
              />
            </div>
          )}
        </div>
        
        {selectedElement.type === 'task' && (
          <div className="property-group">
            <div className="property-group-title">Task Properties</div>
            
            <div className="property-row">
              <label className="property-label">Task Type</label>
              <select 
                className="property-input"
                value={selectedElement.data?.taskType || 'default'}
                onChange={(e) => handlePropertyChange('taskType', e.target.value)}
              >
                <option value="default">Default</option>
                <option value="user">User Task</option>
                <option value="service">Service Task</option>
                <option value="script">Script Task</option>
              </select>
            </div>
          </div>
        )}
        
        {selectedElement.type === 'event' && (
          <div className="property-group">
            <div className="property-group-title">Event Properties</div>
            
            <div className="property-row">
              <label className="property-label">Event Type</label>
              <select 
                className="property-input"
                value={selectedElement.data?.eventType || 'start'}
                onChange={(e) => handlePropertyChange('eventType', e.target.value)}
              >
                <option value="start">Start Event</option>
                <option value="end">End Event</option>
                <option value="intermediate">Intermediate Event</option>
              </select>
            </div>
          </div>
        )}
        
        {selectedElement.type === 'gateway' && (
          <div className="property-group">
            <div className="property-group-title">Gateway Properties</div>
            
            <div className="property-row">
              <label className="property-label">Gateway Type</label>
              <select 
                className="property-input"
                value={selectedElement.data?.gatewayType || 'exclusive'}
                onChange={(e) => handlePropertyChange('gatewayType', e.target.value)}
              >
                <option value="exclusive">Exclusive Gateway</option>
                <option value="parallel">Parallel Gateway</option>
                <option value="inclusive">Inclusive Gateway</option>
              </select>
            </div>
          </div>
        )}
        
        {selectedElement.source && (
          <div className="property-group">
            <div className="property-group-title">Flow Properties</div>
            
            <div className="property-row">
              <label className="property-label">Flow Type</label>
              <select 
                className="property-input"
                value={selectedElement.data?.flowType || 'sequence'}
                onChange={(e) => handlePropertyChange('flowType', e.target.value)}
              >
                <option value="sequence">Sequence Flow</option>
                <option value="default">Default Flow</option>
                <option value="conditional">Conditional Flow</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertiesPanel;
