import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function TaskNode({ data }) {
  const taskType = data.taskType || 'default';
  
  // Define task icon based on type
  const getTaskIcon = () => {
    switch (taskType) {
      case 'user':
        return (
          <svg className="bpmn-task-icon" viewBox="0 0 16 16">
            <path d="M8 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4 10c0-1 2-2 4-2s4 1 4 2v1H4v-1z" fill="currentColor" />
          </svg>
        );
      case 'service':
        return (
          <svg className="bpmn-task-icon" viewBox="0 0 16 16">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 13A6 6 0 118 2a6 6 0 010 12zm0-9a1 1 0 100 2 1 1 0 000-2zm3.36 5.77l-2.94-1.7a1 1 0 01-.5-.87V5a1 1 0 012 0v2.32l2.24 1.3a1 1 0 11-1 1.73z" fill="currentColor" />
          </svg>
        );
      case 'script':
        return (
          <svg className="bpmn-task-icon" viewBox="0 0 16 16">
            <path d="M5 2a1 1 0 00-1 1v10a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1H5zm0 1h6v10H5V3zm1.5 2a.5.5 0 000 1h3a.5.5 0 000-1h-3zm0 2a.5.5 0 000 1h3a.5.5 0 000-1h-3zm0 2a.5.5 0 000 1h3a.5.5 0 000-1h-3z" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className={`bpmn-task ${taskType}-task`}>
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      {getTaskIcon()}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default memo(TaskNode);
