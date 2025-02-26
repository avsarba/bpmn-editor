import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function EventNode({ data }) {
  const eventType = data.eventType || 'start';
  
  return (
    <div className={`bpmn-event ${eventType}-event`}>
      {eventType !== 'start' && (
        <Handle type="target" position={Position.Top} />
      )}
      
      <div className="bpmn-event-inner">
        {/* Event-specific icon could be added here */}
      </div>
      
      {eventType !== 'end' && (
        <Handle type="source" position={Position.Bottom} />
      )}
    </div>
  );
}

export default memo(EventNode);
