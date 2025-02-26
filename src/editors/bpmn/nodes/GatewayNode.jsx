import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function GatewayNode({ data }) {
  const gatewayType = data.gatewayType || 'exclusive';
  
  return (
    <div className={`bpmn-gateway ${gatewayType}-gateway`}>
      <Handle type="target" position={Position.Top} style={{ transform: 'rotate(-45deg)' }} />
      <div className="bpmn-gateway-content">
        {/* The symbol is added via CSS */}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ transform: 'rotate(-45deg)' }} />
      <Handle type="source" position={Position.Left} style={{ transform: 'rotate(-45deg)' }} />
      <Handle type="source" position={Position.Right} style={{ transform: 'rotate(-45deg)' }} />
    </div>
  );
}

export default memo(GatewayNode);
