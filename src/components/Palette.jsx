import React from 'react';
import { useEditor } from '../core/EditorContext';

function Palette({ nodeTypes }) {
  const onDragStart = (event, nodeType, data) => {
    // Set the node type as data
    event.dataTransfer.setData('application/reactflow', nodeType);
    // We could also store additional data if needed
    if (data) {
      event.dataTransfer.setData('application/json', JSON.stringify(data));
    }
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="palette">
      <div className="palette-header">BPMN Elements</div>
      
      {Object.entries(nodeTypes).map(([category, items]) => (
        <div key={category} className="palette-group">
          <div className="palette-group-title">{category}</div>
          
          <div className="palette-items">
            {items.map((item) => (
              <div
                key={`${item.type}-${item.label}`}
                className="palette-item"
                draggable
                onDragStart={(e) => onDragStart(e, item.type, item.data)}
                title={item.label}
              >
                <div className="palette-item-icon">{item.icon}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Palette;
